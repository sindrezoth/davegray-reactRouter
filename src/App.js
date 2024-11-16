import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 4,
      title: 'Some random Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias modi porro vero excepturi aut, delectus impedit optio ut molestiae ducimus doloremque dolorum ex? Delectus, doloribus expedita sed natus voluptatibus similique.',
    },
    {
      id: 1,
      title: 'Some random Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias modi porro vero excepturi aut, delectus impedit optio ut molestiae ducimus doloremque dolorum ex? Delectus, doloribus expedita sed natus voluptatibus similique.',
    },
    {
      id: 2,
      title: 'Another random Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias modi porro vero excepturi aut, delectus impedit optio ut molestiae ducimus doloremque dolorum ex? Delectus, doloribus expedita sed natus voluptatibus similique.',
    },
    {
      id: 3,
      title: 'One morendom Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias modi porro vero excepturi aut, delectus impedit optio ut molestiae ducimus doloremque dolorum ex? Delectus, doloribus expedita sed natus voluptatibus similique.',
    },
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  function handleSubmitNewPost(e) {
    setPosts((prev) => [
      ...prev,
      {
        id: prev.reduce((max, { id }) => (id > max ? id : max), 0) + 1,
        title: postTitle,
        body: postBody,
        datetime: format(new Date(), 'MMMM dd, yyyy pp'),
      },
    ]);

    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  function handleDelete(id) {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    navigate('/');
  }

  useEffect(() => {
    const filteredResults = posts
    .filter(post => (post.body.toLowerCase()).includes(search.toLowerCase()) ||
    (post.title.toLowerCase()).includes(search.toLowerCase()));

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
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" Component={Missing} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
