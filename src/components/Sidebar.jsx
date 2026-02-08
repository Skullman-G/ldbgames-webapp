import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">LDB-Games</h2>

      <hr className="form-separator" />

      <nav className="sidebar-nav">
        <NavLink to="/" end className="sidebar-link">
          Library
        </NavLink>

        <NavLink to="/add-game" className="sidebar-link">
          Add Game
        </NavLink>

        <NavLink to="/platforms" className="sidebar-link">
          Platforms
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
