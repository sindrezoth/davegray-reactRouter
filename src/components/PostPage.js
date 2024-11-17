import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => '' + post.id === id.toString());
  const navigate = useNavigate();

  return (
    <main className="post-page">
      <article>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="datetime">{post.datetime}</p>
            <p>{post.body}</p>
            <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
