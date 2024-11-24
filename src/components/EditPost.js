import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
  const posts = useStoreState((state) => state.posts);
  const editPost = useStoreActions((actions) => actions.editPost);

  const editBody = useStoreState((state) => state.editBody);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const editTitle = useStoreState((state) => state.editTitle);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);

  const inputRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (posts) {
      const post = posts.find((post) => +post.id === +id);
      setEditTitle(post?.title);
      setEditBody(post?.body);
    }
    inputRef.current.focus();
  }, [posts]);

  function handleEdit(id) {
    editPost(id);
    navigate(`/post/${id}`);
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
