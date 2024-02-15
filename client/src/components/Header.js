import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { userLoginContext } from "../contexts/userLoginContext";

function Header() {
  let [,setCurrentUser , userLoginStatus, setUserLoginStatus] =
    useContext(userLoginContext);


    function userLogout(){
      //reset user state
      setCurrentUser({})
      setUserLoginStatus(false)
    }

  return (
    <ul className="nav bg-dark justify-content-end fs-4 p-3">
      {userLoginStatus === false ? (
        <>
         
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
        </>
      ) : (
        <li className="nav-item" onClick={userLogout}>
          <NavLink className="nav-link text-white" to="login">
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default Header;
