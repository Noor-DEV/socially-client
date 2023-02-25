import React from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { getFriends, getToken, getUser, setFriends } from "../store";
import FlexBetween from "./FlexBetween";
import UserImg from "./UserImg";
import { useNavigate } from "react-router-dom";

const Friend = ({
  friendId: friend_id,
  name,
  subtitle,
  user_picture_path,
  updateFriends = null,
}) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id: userId } = useSelector(getUser);
  const token = useSelector(getToken);
  const friends = useSelector(getFriends);

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = Boolean(friends.find((friend) => friend._id === friend_id));

  const patchFriend = async () => {
    const PATCH_URL = `https://socially-backend.onrender.com/users/${userId}/${friend_id}`;
    const response = await fetch(PATCH_URL, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    dispatch(setFriends({ friends: data.friends_data.friends }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImg image={user_picture_path} size="55px" />
        <Box
          onClick={() => {
            if (friend_id === userId) {
              navigate("/my-profile");
              navigate(0);
            } else {
              navigate(`/profile/${friend_id}`);
              navigate(0);
            }
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friend_id !== userId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
