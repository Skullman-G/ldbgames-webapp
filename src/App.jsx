import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GameDetails from './components/GameDetails';
import GameLibrary from './components/GameLibrary';

function App() {
  return (
    <Router>
      <div className="page-filler">
        <Routes>
          <Route path="/" element={<GameLibrary />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
