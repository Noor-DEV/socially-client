import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Help,
  Notifications,
  Menu,
  Close,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { changeMode, getUser, setLogout, getIsAuth } from "../../store/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
  const user = useSelector(getUser);
  const isAuth = useSelector(getIsAuth);

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  let fullName;
  if (user && user.first_name) {
    fullName = `${user.first_name} ${user.last_name}`;
  } else {
    fullName = null;
  }
  const LOG_OUT_BOTH_WAYS = async () => {
    fetch("https://socially-backend.onrender.com/auth/logout", {
      credentials: "include",
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/auth");
        dispatch(setLogout());
        localStorage.clear();
      })
      .catch((err) => {
        navigate("/auth");
        dispatch(setLogout());
        localStorage.clear();
      });
    navigate("/auth");
  };
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt} width="100vw">
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem,2.5rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Socially
        </Typography>
        {isNonMobileScreen && isAuth && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search...." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* DESKTOP NAV */}
      {isNonMobileScreen ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(changeMode())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ fontSize: "25px", color: dark }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          {isAuth && (
            <>
              <Message sx={{ fontSize: "25px", cursor: "pointer" }} />
              <Notifications sx={{ fontSize: "25px", cursor: "pointer" }} />
              <Help sx={{ fontSize: "25px", cursor: "pointer" }} />
              <FormControl value={fullName} variant="standard">
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    p: ".25rem 1rem",
                    broderRadius: ".25rem",
                    "& .MuiSvgIcon-root": {
                      pr: ".25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    <Typography>Log Out</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </FlexBetween>
      ) : (
        <>
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>

          {/* // MOBILE_NAV */}
          {isMobileMenuToggled && !isNonMobileScreen && (
            <Box
              position="fixed"
              right="0"
              bottom="0"
              height="100%"
              maxWidth="500px"
              minWidth="300px"
              backgroundColor={background}
              zIndex="10"
            >
              {/* CLOSE_ICON */}
              <Box display="flex" justifyContent="flex-end" p="1rem">
                <IconButton
                  onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                  <Close />
                </IconButton>
              </Box>
              {/* MENU_ITEMS */}
              <FlexBetween
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="3rem"
                height="80%"
              >
                <IconButton
                  onClick={() => dispatch(changeMode())}
                  sx={{ fontSize: "25rem" }}
                >
                  {theme.palette.mode === "dark" ? (
                    <LightMode sx={{ fontSize: "25px", color: dark }} />
                  ) : (
                    <DarkMode sx={{ fontSize: "25px" }} />
                  )}
                </IconButton>
                <Message sx={{ fontSize: "25px", cursor: "pointer" }} />
                <Notifications sx={{ fontSize: "25px", cursor: "pointer" }} />
                <Help sx={{ fontSize: "25px", cursor: "pointer" }} />
                <FormControl value={fullName} variant="standard">
                  <Select
                    value={fullName}
                    sx={{
                      backgroundColor: neutralLight,
                      width: "200px",
                      p: ".25rem 1rem",
                      broderRadius: ".25rem",
                      "& .MuiSvgIcon-root": {
                        pr: ".25rem",
                        width: "3rem",
                      },
                      "& .MuiSelect-select:focus": {
                        backgroundColor: neutralLight,
                      },
                    }}
                    input={<InputBase />}
                  >
                    <MenuItem>
                      <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => LOG_OUT_BOTH_WAYS()}>
                      <Typography>Log Out</Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </FlexBetween>
            </Box>
          )}
        </>
      )}
    </FlexBetween>
  );
};
export default Navbar;
