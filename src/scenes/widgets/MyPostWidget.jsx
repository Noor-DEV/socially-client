import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImg from "../../components/UserImg";
import { getToken, getUser, setPosts } from "../../store/index";

const MyPostWidget = ({ picture_path }) => {
  const dispatch = useDispatch();
  const [isImg, setIsImg] = useState(false);
  const [img, setImg] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector(getUser);
  const token = useSelector(getToken);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("user_id", _id);
    formData.append("description", post);
    if (isImg) {
      formData.append("picture", img);
    }
    fetch("https://socially-backend.onrender.com/posts", {
      credentials: "include",
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "----success-post-created--------");
        dispatch(setPosts({ posts: data.posts }));
      })
      .catch((err) => {
        console.log(err, "-------err---no--post-created-------");
      });
    setImg(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImg image={picture_path} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            p: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImg && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImg(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  width="100%"
                >
                  <input {...getInputProps()} />
                  {!img ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{img.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {img && (
                  <IconButton
                    onClick={() => setImg(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImg(!isImg)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: medium,
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        <FlexBetween gap="0.25rem">
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.dark,
              borderRadius: "3rem",
              ml: "0.3rem",
              "&:hover": {
                cursor: "pointer",
                color: "#fff",
                backgroundColor: palette.primary.main,
              },
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};
export default MyPostWidget;
