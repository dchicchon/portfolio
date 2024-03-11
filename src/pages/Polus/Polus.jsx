import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

// create more routes here?
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
    </Routes>
  );
};

export default App;
