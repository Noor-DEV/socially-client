import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const AuthOptions = () => {
  // const dispatch = useDispatch();
  // const POP_UP_STATE = useSelector(getPopUpState);
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const handleGoogleOauth = async () => {
    console.log("REDIRECT2GOOGLESSO....................");
    const googleLoginURL = "https://socially-backend.onrender.com/login/google";
    let timer;
    const newWindow = window.open(googleLoginURL);
    // "width=400,height=400,left=" + left + ",top=" + top + ""
    timer = setInterval(() => {
      if (newWindow.closed) {
        return clearInterval(timer);
      }
      console.log(newWindow);
    }, 500);
  };

  return (
    <Box height="100vh">
      <Navbar />

      <Box
        display="flex"
        flexDirection="column"
        width="100vw"
        height="80%"
        justifyContent="center"
        alignItems="center"
        // backgroundColor="gold"
      >
        <Box
          // backgroundColor="rebeccapurple"
          height="35%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          //
        >
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{ p: "0.7rem", textAlign: "center" }}
          >
            You need to be authenticated in order to use this website, You can
            do so by choosing on of the below options.
          </Typography>
        </Box>
        <Box
          // backgroundColor="crimson"
          display="flex"
          flexDirection="column"
          width="100vw"
          height="35%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box mb="2rem" width="300px">
            <Button
              sx={{ width: "100%", p: ".75rem", borderRadius: "4rem" }}
              mb="2rem"
              variant="outlined"
              onClick={handleGoogleOauth}
            >
              <Google /> <span style={{ marginLeft: ".5rem" }}>Google</span>
            </Button>
          </Box>
          <Box mb="2rem" width="300px">
            <Button
              sx={{ width: "100%", p: ".75rem", borderRadius: "4rem" }}
              variant="outlined"
              onClick={() => navigate("/auth/manual")}
            >
              Email and Password
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthOptions;
