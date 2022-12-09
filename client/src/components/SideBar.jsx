import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import UserCard from "./UserCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/queries";

const SideBar = ({ setLoggedIn }) => {
  // const [users, setUsers] = useState();
  const { loading, data, error } = useQuery(GET_ALL_USERS);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6">Loading Chats...</Typography>
        </Box>
      </Box>
    );

  // if (data) {
  //   console.log(data);
  // }

  if (error) {
    console.log(error.message);
  }

  return (
    <Box
      backgroundColor="#f7f7f7"
      height="100vh"
      maxWidth="250px"
      padding="10px"
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Chat</Typography>
        <LogoutIcon
          className="logoutButton"
          onClick={() => {
            localStorage.removeItem("jwt");
            setLoggedIn(false);
          }}
        />
      </Stack>
      <Divider />
      {data?.users?.map((item) => {
        return <UserCard item={item} key={item.id} />;
      })}
    </Box>
  );
};

export default SideBar;
