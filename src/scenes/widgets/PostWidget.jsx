import { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getToken, setPost } from "../../store";
const PostWidget = ({
  _id: post_id,
  user_id: post_user_id,
  first_name,
  last_name,
  description,
  location,
  picture_path,
  user_picture_path,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);

  const name = `${first_name} ${last_name}`;

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const { _id: loggedInUserId } = useSelector(getUser);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.values(likes).filter((like) => like === true).length;
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const PATCH_LIKE_URL = `https://socially-backend.onrender.com/posts/${post_id}/like`;
    fetch(PATCH_LIKE_URL, {
      credentials: "include",
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: loggedInUserId }),
    })
      .then((res) => res.json())
      .then(({ updatedPost }) => {
        dispatch(setPost({ post: updatedPost }));
      });
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={post_user_id}
        name={name}
        subtitle={location}
        user_picture_path={user_picture_path}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picture_path && (
        <img
          width="100%"
          height="auto"
          referrerPolicy="no-referrer"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${picture_path}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length} </Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, index) => (
            <Box key={`${name}-${index}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
