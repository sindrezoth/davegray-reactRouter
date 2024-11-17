import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from './api/posts';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');

        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.error(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.error(err);
        }
      }
    };

    fetchPosts();
  }, []);

  function handleSubmitNewPost(e) {
    const newPost = {
      id: posts.reduce((max, { id }) => (id > max ? id : max), 0) + 1,
      title: postTitle,
      body: postBody,
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
    };

    (async () => {
      try {
        const response = await api.post('/posts', newPost);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    })();

    setPosts((prev) => [...prev, newPost]);

    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  function handleEdit(id) {
    const currentPost = posts.find((post) => post.id === id);

    console.log(id);
    const newPost = {
      id: id,
      body: editBody,
      title: editTitle,
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
    };

    api
      .put(`/posts/${id}`, newPost)
      .then((res) => {
        setPosts((prev) => [...prev].map(post => post.id === id ? newPost : post));
        console.log(res);
        navigate(`/post/${id}`);
      })
      .catch((err) => {
        console.error(err);
      });
    //-------------------
    // (async () => {
    //   try {
    //     const response = await

    //     console.log(response);

    //   } catch (err) {
    //     console.error(err);
    //   }
    // })();
  }

  function handleDelete(id) {
    setPosts((prev) => prev.filter((post) => post.id !== id));

    (async () => {
      try {
        const response = await api.delete(`/posts/${id}`);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    })();
    navigate('/');
  }

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase()),
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const title = 'ReactJS Blog';
  return (
    <div className="main-container">
      <Header title={title} search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={<Home posts={searchResults} />} />
        <Route
          exact
          path="/post"
          element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmitNewPost={handleSubmitNewPost}
            />
          }
        />
        <Route
          exact
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
            />
          }
        />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" Component={Missing} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
