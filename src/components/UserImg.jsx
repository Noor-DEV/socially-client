import React from "react";
import { Box } from "@mui/material";
// import { styled } from "@mui/system";

const UserImg = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        referrerPolicy="no-referrer"
        height={size}
        alt="user"
        src={`${image}`}
      />
    </Box>
  );
};

export default UserImg;
