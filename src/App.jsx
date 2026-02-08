import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GameDetails from './components/GameDetails';
import GameLibrary from './components/GameLibrary';
import AddGame from './components/AddGame';
import EditGame from './components/EditGame';
import Sidebar from './components/Sidebar';
import Platforms from './components/Platforms';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<GameLibrary />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/add-game" element={<AddGame />} />
            <Route path="/game/:id/edit" element={<EditGame />} />
            <Route path="/platforms" element={<Platforms />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
