import React, { useState } from 'react';

import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Some random Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias modi porro vero excepturi aut, delectus impedit optio ut molestiae ducimus doloremque dolorum ex? Delectus, doloribus expedita sed natus voluptatibus similique.',
    },{
      id: 1,
      title: 'Some random Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias modi porro vero excepturi aut, delectus impedit optio ut molestiae ducimus doloremque dolorum ex? Delectus, doloribus expedita sed natus voluptatibus similique.',
    },{
      id: 2,
      title: 'Another random Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias modi porro vero excepturi aut, delectus impedit optio ut molestiae ducimus doloremque dolorum ex? Delectus, doloribus expedita sed natus voluptatibus similique.',
    },{
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
    setPosts(prev=>
      ([...prev, {
          title: postTitle,
          body: postBody,
          datetime: new Date().toLocaleDateString()
        }])
    );

    setPostTitle('');
    setPostBody('');
  }

  function handleDelete(id) {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    navigate('/');
  }

  const title = 'ReactJS Blog';
  return (
    <div className='main-container'>
      <Header title={title} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={<Home posts={posts} />} />
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
