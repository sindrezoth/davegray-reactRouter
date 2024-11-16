import React, { useEffect, useRef } from 'react';

const NewPost = ({ postTitle, setPostTitle, postBody, setPostBody, handleSubmitNewPost }) => {
  const inputRef = useRef();

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
