import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EditPost = ({ posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle }) => {
  const inputRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  

  const post = posts.find(post => post.id===id);
  console.log(post);
  useEffect(() => {
    setEditTitle(post.title);
    setEditBody(post.body);
  },[])

  return <main className="new-post">
  <form
    className="new-post-form"
    onSubmit={(e) => {
      e.preventDefault();
      handleEdit(post.id);
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
};

export default EditPost;
