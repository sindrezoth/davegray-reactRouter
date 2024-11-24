import { useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import {useStoreState, useStoreActions } from 'easy-peasy';
import { format } from 'date-fns';

const NewPost = () => {
  const posts = useStoreState(state => state.posts);
  const postTitle = useStoreState(state => state.postTitle);
  const postBody = useStoreState(state => state.postBody);
  const setPostTitle = useStoreActions(actions => actions.setPostTitle);
  const setPostBody = useStoreActions(actions => actions.setPostBody);
  const navigate = useNavigate();

  const savePost = useStoreActions(actions => actions.savePost);

  const inputRef = useRef();

  function handleSubmitNewPost(e) {
    e.preventDefault();
    const newPost = {
      id: ''+(posts.reduce((max, { id }) => (+id > max ? +id : max), 0) + 1),
      title: postTitle,
      body: postBody,
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
    };

    savePost(newPost);
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
