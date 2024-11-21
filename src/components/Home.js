import React from 'react';
import Feed from './Feed';

const Home = ({ posts, isLoading, error }) => {
  return (
    <main className="home">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts && posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p>No posts to display.</p>
      )}
    </main>
  );
};

export default Home;
