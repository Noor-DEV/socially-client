import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import { getUser } from "../../store";

const MyProfile = () => {
  const [activeUser, setActiveUser] = useState();
  const user = useSelector(getUser);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    setActiveUser(user);
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
          <MyPostWidget picture_path={activeUser.picture_path} />
          <Box m="2rem 0" />
          <PostsWidget user_id={activeUser._id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};
export default MyProfile;
