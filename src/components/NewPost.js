import React, { useEffect, useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';
import DataContext from '../context/DataContext';

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const inputRef = useRef();
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  function handleSubmitNewPost(e) {
    const newPost = {
      id: ((posts.length ? posts.reduce((max, { id }) => (+id > max ? +id : max), -1): 0) + 1)+'',
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

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <main className="new-post">
      <form
        className="new-post-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitNewPost(e);
        }}>
        <h2>New post</h2>
        <label htmlFor="post-title">Title:</label>
        <input
          ref={inputRef}
          id="post-title"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}></input>

        <label htmlFor="post-body">Type your thoughts: </label>
        <textarea
          id="post-body"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}></textarea>
        <button type="sumbit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
