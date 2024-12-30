import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactNode } from 'react';
import Header from './utilities/Header';
import Footer from './utilities/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Login from './components/account/Login';
import Signup from './components/account/Signup';

// Layout component
function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/account/login" element={<Layout><Login /></Layout>}></Route>
        <Route path="/account/signup" element={<Layout><Signup /></Layout>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
