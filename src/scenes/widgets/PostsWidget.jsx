import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getToken, setPosts } from "../../store";
import PostWidget from "./PostWidget";

const PostsWidget = ({ user_id, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const token = useSelector(getToken);

  const getFeedPosts = async () => {
    const response = await fetch(
      "https://socially-backend.onrender.com/posts",
      {
        credentials: "include",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data.posts }));
  };
  const getUserPosts = async () => {
    const response = await fetch(
      `https://socially-backend.onrender.com/users/${user_id}/posts`,
      {
        credentials: "include",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data.posts }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getFeedPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!posts || posts.length < 1) {
    return <p>No Posts To Display!!!</p>;
  }
  return (
    <div>
      {posts.map((post) => (
        <PostWidget key={post._id} {...post} />
      ))}
    </div>
  );
};

export default PostsWidget;
