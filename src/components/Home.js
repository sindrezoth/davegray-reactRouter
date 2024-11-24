import React from 'react';
import Feed from './Feed';
import { useStoreState } from 'easy-peasy';

const Home = ({ posts, isLoading, error }) => {
  const searchResults = useStoreState((state) => state.searchResults);

  return (
    <main className="home">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : searchResults ? (
        <Feed posts={searchResults} />
      ) : (
        <p>No posts to display.</p>
      )}
    </main>
  );
};

export default Home;
