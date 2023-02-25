import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../navbar/Navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import { useParams } from "react-router-dom";
import { getToken, getUser, setPosts } from "../../store";

const ProfilePage = () => {
  const [activeUser, setActiveUser] = useState();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const fetchUser = async () => {
    fetch(`https://socially-backend.onrender.com/users/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setActiveUser(data.user);
      });
  };
  const fetchUserPosts = async () => {
    fetch(`https://socially-backend.onrender.com/users/${userId}/posts`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "........userPosts......");
        dispatch(setPosts({ posts: data.posts }));
      });
  };
  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []); //eslint-disable-line
  if (!activeUser) {
    return null;
  }
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={activeUser._id}
            picture_path={activeUser.picture_path}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={activeUser._id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picture_path={user.picture_path} />
          <Box m="2rem 0" />
          <PostsWidget user_id={activeUser._id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};
export default ProfilePage;
