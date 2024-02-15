import { NavLink } from "react-router-dom";

function Header() {
  return (
    <ul className="nav bg-dark justify-content-end fs-4 p-3">
      <li className="nav-item">
        <NavLink className="nav-link text-white" to="">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-white" to="register">
          Register
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-white" to="login">
          Login
        </NavLink>
      </li>
      <li className="nav-item ">
        <NavLink className="nav-link text-white" to="technologies">
          Technologies
        </NavLink>
      </li>
      
    </ul>
  );
}

export default Header;
