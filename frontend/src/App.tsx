import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactNode } from 'react';
import Header from './utilities/Header';
import Footer from './utilities/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
