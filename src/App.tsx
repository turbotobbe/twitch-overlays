import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Home from './components/Home';
import About from './components/About';
import Layout from './components/Layout';
import NotFound from './components/NotFound';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home count={count} setCount={setCount} />} />
          <Route path="*" element={<NotFound />} /> {/* Add this line */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;