import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';

import useWindowSize from './hooks/useWindowSize';
import useFetch from './hooks/useFetch';

import { useStoreActions, useStoreState } from 'easy-peasy';

const App = () => {
  const { data, isLoading, error } = useFetch('http://localhost:3500/posts');

  const posts = useStoreState((state) => state.posts);
  const setPosts = useStoreActions((actions) => actions.setPosts);

  const search = useStoreState((state) => state.search);

  const searchResults = useStoreState((state) => state.searchResults);
  const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

  const windowSize = useWindowSize();

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  useEffect(() => {
    const filteredResults =
      posts &&
      posts.filter(
        (post) =>
          post.body.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase()),
      );

    setSearchResults(filteredResults?.reverse());
  }, [posts, search]);

  return (
    <div className="main-container">
      <Header title="ReactJS Blog" screenWidth={windowSize.width} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home isLoading={isLoading} error={error} posts={searchResults} />}
        />
        <Route exact path="/post" element={<NewPost />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" Component={Missing} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
