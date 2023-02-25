import { Box, useMediaQuery } from "@mui/material";

import Navbar from "../navbar/Navbar";
import UserWidget from "../widgets/UserWidget";
import { useSelector } from "react-redux";
import { getUser } from "../../store/index";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertisementWidget from "../widgets/AdvertisementWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { _id = null, picture_path } = useSelector(getUser);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {_id && <UserWidget userId={_id} picture_path={picture_path} />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picture_path={picture_path} />
          <PostsWidget user_id={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertisementWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default HomePage;
