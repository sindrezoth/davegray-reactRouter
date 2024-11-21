import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import api from '../api/posts';

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => '' + post.id === id.toString());
  const navigate = useNavigate();

  function handleDelete(id) {
    setPosts((prev) => prev.filter((post) => post.id !== id));

    (async () => {
      try {
        const response = await api.delete(`/posts/${id}`);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    })();
    navigate('/');
  }

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
