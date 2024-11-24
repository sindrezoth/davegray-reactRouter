import { createStore, action, thunk, computed } from 'easy-peasy';
import api from './api/posts';
import { format } from 'date-fns';

export default createStore({
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  search: '',
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResults: '',
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),
  postTitle: '',
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),

  postBody: '',
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  //

  editTitle: '',
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),

  editBody: '',
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),
  postCount: computed((state) => state.posts && state.posts.length),
  getPostById: computed((state) => (id) => state.posts?.find((post) => ''+post.id === id)),
  savePost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState();
    // const newPost = {
    //   id: posts.reduce((max, { id }) => (+id > max ? +id : max), 0) + 1,
    //   title: postTitle,
    //   body: postBody,
    //   datetime: format(new Date(), 'MMMM dd, yyyy pp'),
    // };

    try {
      const response = await api.post('/posts', newPost);
      actions.setPosts([...posts, newPost]);
      actions.setPostTitle('');
      actions.setPostBody('');
    } catch (err) {
      console.error(err);
    }
  }),
  deletePost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState();

    try {
      const response = await api.delete(`/posts/${id}`);
      actions.setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
    }
  }),
  editPost: thunk(async (actions, id, helpers) => {
    const { posts, editBody, editTitle } = helpers.getState();

    const newPost = {
      id: ''+id,
      body: editBody,
      title: editTitle,
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
    };

    api
      .put(`/posts/${id}`, newPost)
      .then((res) => {
        actions.setPosts([...posts].map((post) => (post.id === id ? newPost : post)));
      })
      .catch((err) => {
        console.error(err);
      });
  }),
});
