import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
const viteLogo = `${import.meta.env.BASE_URL}vite.svg`;
import './App.css';

// Import your components
import Home from './components/Home';
import About from './components/About';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home count={count} setCount={setCount} />} />
      </Routes>
    </Router>
  );
}

export default App;