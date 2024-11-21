import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';

import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

const App = () => {
  return (
    <div className="main-container">
      <DataProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/post" element={<NewPost />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" Component={Missing} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
};

export default App;
