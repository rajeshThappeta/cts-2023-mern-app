import React from "react";
import { Link, Outlet } from "react-router-dom";

function Technologies() {
  return (
    <div>
      <h1 className="display-1 text-center text-info">Technologies</h1>
      <ul className="nav bg-light justify-content-center fs-4 p-3 mt-3">
        <li className="nav-item">
          <Link className="nav-link" to="java">
            Java
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="nodejs">
            Node
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="vue">
            Vuejs
          </Link>
        </li>
      </ul>
      {/* placeholder for components */}
      <Outlet />
    </div>
  );
}

export default Technologies;
