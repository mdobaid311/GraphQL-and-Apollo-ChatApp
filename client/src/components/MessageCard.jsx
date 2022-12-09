import { Box, Typography } from "@mui/material";
import React from "react";
import moment from "moment";

const MessageCard = ({ text, date, direction }) => {
  return (
    <Box display="flex" justifyContent={direction}>
      <Box>
        <Typography
          variant="subtitle2"
          backgroundColor="white"
          padding="5px"
          sx={{ backgroundColor: direction === "end" ? "#ecfaf9" : "white" }}
        >
          {text}
        </Typography>
        <Typography variant="caption">{moment(date).format("LT")}</Typography>
      </Box>
    </Box>
  );
};

export default MessageCard;
