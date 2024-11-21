import { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { data, isLoading, error } = useFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data]);

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
    <DataContext.Provider
      value={{
        search, setSearch,
        posts, setPosts,
        isLoading, error,
        searchResults,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
