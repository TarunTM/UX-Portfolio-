import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CaseStudy from './pages/CaseStudy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/work/:id" element={<CaseStudy />} />
      </Routes>
    </Router>
  );
}

export default App;
