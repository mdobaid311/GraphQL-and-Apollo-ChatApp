import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ item: { firstName, lastName, id } }) => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ p: 1 }}
      className="usercard"
      onClick={() => navigate(`/${id}/${firstName} ${lastName}`)}
    >
      <Avatar
        src={`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`}
        sx={{ width: "32px", height: "32px" }}
      />
      <Typography>
        {firstName} {lastName}
      </Typography>
    </Stack>
  );
};

export default UserCard;
