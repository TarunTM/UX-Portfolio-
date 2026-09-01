import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Landing from './pages/Landing';
import CaseStudy from './pages/CaseStudy';
import AntigravityBadge from './components/AntigravityBadge';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/work/:id" element={<CaseStudy />} />
      </Routes>
      <AntigravityBadge />
      <Analytics />
    </Router>
  );
}

export default App;
