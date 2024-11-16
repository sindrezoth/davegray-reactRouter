import React from 'react';

const NewPost = ({ postTitle, setPostTitle, postBody, setPostBody, handleSubmitNewPost }) => {
  return (
    <main className='new-post'>
      <form className="new-post-form" onSubmit={e=>{e.preventDefault();handleSubmitNewPost(e)}}>
      <h2>New post</h2>
        <label htmlFor="post-title">Title:</label>
        <input
          id="post-title"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}></input>

        <label htmlFor="post-body">Title:</label>
        <textarea
          id="post-body"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}></textarea>
          <button type='sumbit'>Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
