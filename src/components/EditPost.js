import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';
import DataContext from '../context/DataContext';

const EditPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const inputRef = useRef();
  const { id } = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();

    const post = posts.find((post) => post.id === id);
    setEditTitle(post.title);
    setEditBody(post.body);
  }, [id, posts]);

  function handleEdit(id) {
    const newPost = {
      id: id,

      body: editBody,
      title: editTitle,
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
    };

    api
      .put(`/posts/${id}`, newPost)
      .then((res) => {
        setPosts((prev) => [...prev].map((post) => (post.id === id ? newPost : post)));
        console.log(res);
        navigate(`/post/${id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="new-post">
      <form
        className="new-post-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit(id);
        }}>
        <h2>Edit post</h2>
        <label htmlFor="post-title">Title:</label>
        <input
          ref={inputRef}
          id="post-title"
          type="text"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}></input>

        <label htmlFor="post-body">Type your thoughts: </label>
        <textarea
          id="post-body"
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}></textarea>
        <button type="sumbit">Submit</button>
      </form>
    </main>
  );
};

export default EditPost;
