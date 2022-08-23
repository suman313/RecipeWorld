import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import useStyles from "./Style";
const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.post);
  if (posts.length === 0 && !isLoading) return "No posts...";
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.containerWrap}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={4} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Posts;
