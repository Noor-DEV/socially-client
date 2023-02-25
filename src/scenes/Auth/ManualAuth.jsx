import React from "react";
import { Typography, useTheme, Box, useMediaQuery } from "@mui/material";
import Form from "./Form";

const ManualAuth = () => {
  const theme = useTheme();

  // COLORS------------
  // const neutralLight = theme.palette.neutral.light;
  // const dark = theme.palette.neutral.dark;
  // const background = theme.palette.background.default;
  // const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  // COLORS------------

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box width="100%" backgroundColor={alt} p="1rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          AntiSocials
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem "
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome To AntiSocioMedia, the Social Media for SocioPaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};
export default ManualAuth;
