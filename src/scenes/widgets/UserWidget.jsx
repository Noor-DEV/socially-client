import { useState, useEffect } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import UserImg from "../../components/UserImg";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../store";

const UserWidget = ({ userId, picture_path }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(
      `https://socially-backend.onrender.com/users/${userId}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setUser(data.user);
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!user) {
    return null;
  }
  const {
    first_name,
    last_name,
    location,
    occupation,
    viewed_profile,
    impressions,
    friends,
  } = user;
  return (
    <WidgetWrapper>
      {/* FIRST_ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => {
          navigate("/my-profile");
        }}
      >
        <FlexBetween gap="1rem">
          <UserImg image={picture_path} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {`${first_name} ${last_name}`}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/* SECOND-ROW */}
      <Box p="1rem 0">
        {location && (
          <Box display="flex" alignItems="center" mb="0.5rem" gap="1rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
        )}
        {occupation && (
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        )}
      </Box>
      <Divider />
      {/* THIRD-ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewed_profile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      {/* FOURTH-ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        {/* TWITTER */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        {/* LINKED-IN */}
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedIn />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
