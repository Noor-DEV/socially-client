import { useEffect } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { getFriends, getToken, setFriends } from "../../store";
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector(getToken);
  const friends = useSelector(getFriends);

  useEffect(() => {
    fetch(`https://socially-backend.onrender.com/users/${userId}/friends`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setFriends({ friends: data.friends }));
      });
  }, [userId, token, dispatch]);
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length ? (
          friends.map((friend) => {
            return (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.first_name} ${friend.last_name}`}
                subtitle={friend.occupation}
                user_picture_path={friend.picture_path}
              />
            );
          })
        ) : (
          <p>No friends to display!</p>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
