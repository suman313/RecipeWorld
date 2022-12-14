import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@mui/material";
import Form from "../Forms/Form";
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import { searchPostByQuery } from "../../actions/post";
import Pagination from "../Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import styled from "@emotion/styled";

const StyledAppbar = styled(AppBar)({
  borderRadius: 4,
  marginBottom: "1rem",
  display: "flex",
  padding: "16px",
});

//For search field
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  // useEffect(() => {}, [dispatch]);
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTag] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(searchPostByQuery({ search: search, tags: tags.join(",") }));
      navigate(`/posts/search?searchQuery=${search}&tags=${tags.join(",")}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    //search posts
  };

  const handleAdd = (tag) => setTag([...tags, tag]);

  const handleDelete = (tagToDelete) => {
    const freshTags = tags.filter((tag) => tag !== tagToDelete);
    setTag(freshTags);
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-around"
          alignItems="stretch"
          spacing={2}
          sx={{
            flexDirection: {
              sm: "row",
            },
          }}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledAppbar position="static" color="inherit">
              <TextField
                sx={{ marginBottom: 1 }}
                name="search"
                label="Search Recipes"
                value={search}
                variant="outlined"
                fullWidth
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="search tags"
              />
              <Button
                onClick={searchPost}
                variant="contained"
                color="primary"
                sx={{ marginTop: 1 }}
              >
                Search
              </Button>
            </StyledAppbar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} sx={{ mt: 2, p: 1 }}>
                <Pagination page={page} variant="outlined" color="primary" />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
