import React from 'react';
import { Link } from 'react-router-dom'
function Header () {
  return (
    <div>
      <p>Header</p>
      <ul>
        <li>
          <Link to="/">To home</Link>
        </li>
        <li>
          <Link to="/aves">To aves</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;