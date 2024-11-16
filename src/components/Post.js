import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
        <p>{post.datetime}</p>
      </Link>
      <p>{post.body?.length <= 25 ? post.body : post.body.slice(0, 22) + '...'}</p>
    </article>
  );
};

export default Post;
