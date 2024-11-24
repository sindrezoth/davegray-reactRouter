import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
  const { id } = useParams();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deletePost(id);
    navigate('/');
  };

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
