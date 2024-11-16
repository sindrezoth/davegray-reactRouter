import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => '' + post.id === id);

  return (
    <main className='post-page'>
      <article>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className='datetime'>{post.datetime}</p>
            <p>{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
