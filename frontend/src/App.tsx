import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactNode } from 'react';
import Header from './utilities/Header';
import Footer from './utilities/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Login from './components/account/Login';
import Signup from './components/account/Signup';
import CreateProduct from './components/products/CreateProduct';
import Products from './components/products/Products';
import Product from './components/products/Product';
import Profile from './components/account/Profile';
import UpdateProfile from './components/account/UpdateProfile';

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
        <Route path="/products" element={<Layout><Products /></Layout>}></Route>
        <Route path="/products/create" element={<Layout><CreateProduct /></Layout>}></Route>
        <Route path="/products/:id" element={<Layout><Product /></Layout>}></Route>
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/profile/update" element={<Layout><UpdateProfile /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
