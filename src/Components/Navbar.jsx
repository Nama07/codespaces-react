import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="navbar-brand" to="/">Domovská stránka</Link>
          </li>
          <li className="nav-item">
            <Link className="navbar-brand" to="/report">Podat Hlášení</Link>
          </li>
          <li className="nav-item">
            <Link className="navbar-brand" to="/view-reports">View Reports</Link>
          </li>
        </ul>
        <span className="navbar-text">
          <Login />
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
