import pc from "@prisma/client";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const prisma = new pc.PrismaClient();

const MESSAGE_ADDED = "MESSAGE_ADDED";

const resolvers = {
  Query: {
    users: async (_, args, { userId }) => {
      console.log(userId);
      if (!userId) {
        throw new ForbiddenError(
          "You are not authorized to access this information"
        );
      }
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          id: {
            not: userId,
          },
        },
      });
      return users;
    },
    messagesByUser: async (_, { recieverId }, { userId }) => {
      if (!userId) {
        throw new ForbiddenError(
          "You are not authorized to access this information"
        );
      }
      const messages = await prisma.message.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          OR: [
            {
              senderId: userId,
              recieverId: recieverId,
            },
            {
              senderId: recieverId,
              recieverId: userId,
            },
          ],
        },
      });
      return messages;
    },
  },

  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: userNew.email,
        },
      });
      if (user)
        throw new AuthenticationError("User already exists with that email");
      const hashedPassword = await bcrypt.hash(userNew.password, 10);

      const newUser = await prisma.user.create({
        data: {
          ...userNew,
          password: hashedPassword,
        },
      });
      return newUser;
    },

    signinUser: async (_, { userSignin }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: userSignin.email,
        },
      });

      if (!user)
        throw new AuthenticationError("User doesn't exist with that email");

      const doMatch = await bcrypt.compare(userSignin.password, user.password);

      if (!doMatch)
        throw new AuthenticationError("Email or Password is invalid");
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET
      );
      return {
        token,
      };
    },
    createMessage: async (_, { recieverId, text }, { userId }) => {
      if (!userId) {
        throw new ForbiddenError(
          "You are not authorized to access this information"
        );
      }
      const message = await prisma.message.create({
        data: {
          text,
          recieverId,
          senderId: userId,
        },
      });
      pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
      return message;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_ADDED),
    },
  },
};

export default resolvers;
