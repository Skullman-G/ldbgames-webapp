import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <Link to="/" className="link-button">Library</Link>
      <Link to="/add-game" className="link-button">Add Game</Link>
    </div>
  );
}

export default Sidebar;