import React, { useContext } from 'react';
import Feed from './Feed';
import DataContext from '../context/DataContext';

const Home = () => {
  const { posts, isLoading, error, searchResults } = useContext(DataContext);

  return (
    <main className="home">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts && posts.length ? (
        <Feed posts={searchResults || posts} />
      ) : (
        <p>No posts to display.</p>
      )}
    </main>
  );
};

export default Home;
