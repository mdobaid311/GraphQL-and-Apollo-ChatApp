import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_MSG } from "../graphql/queries";
import MessageCard from "./MessageCard";
import { SEND_MSG } from "../graphql/mutations";
import { MSG_SUB } from "../graphql/subscriptions";

const ChatScreen = () => {
  const [text, setText] = useState("");
  const { id, name } = useParams();
  const [messages, setMessages] = useState([]);
  const { data, loading, error } = useQuery(GET_MSG, {
    variables: {
      recieverId: +id,
    },
    onCompleted(data) {
      setMessages(data.messagesByUser);
    },
  });

  const [sendMessage] = useMutation(SEND_MSG, {
    // onCompleted(data) {
    //   setMessages([...messages, data.createMessage]);
    // },
  });

  const { data: subData } = useSubscription(MSG_SUB, {
    onSubscriptionData({ subscriptionData: { data } }) {
      setMessages((prevMessages) => [...prevMessages, data.messageAdded]);
      setText("");
    },
  });

  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 0 }}>
        <Toolbar>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
            sx={{ width: "32px", height: "32px", mr: 2 }}
          />
          <Typography variant="h6" color="black">
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        backgroundColor="#f5f5f5"
        height="80vh"
        padding="10px"
        overflow="scroll"
        sx={{ overflowX: "hidden" }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Box textAlign="center">
              <CircularProgress />
              <Typography variant="h6">Authenticating...</Typography>
            </Box>
          </Box>
        ) : (
          messages?.map((msg) => {
            return (
              <MessageCard
                key={msg?.createdAt}
                text={msg?.text}
                date={msg?.createdAt}
                direction={msg?.recieverId == +id ? "end" : "start"}
              />
            );
          })
        )}
      </Box>
      <Stack direction="row">
        <TextField
          placeholder="Enter a message"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendIcon
          fontSize="large"
          onClick={() => {
            sendMessage({
              variables: {
                recieverId: +id,
                text: text,
              },
            });
          }}
        />
      </Stack>
    </Box>
  );
};

export default ChatScreen;
