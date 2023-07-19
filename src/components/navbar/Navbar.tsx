import { Link } from "react-router-dom";
import "./Navbar.scss";

function NavBar() {
  return (

    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/dynamicForm" className="navbar-link">
            Dynamic Form
          </Link>
        </li>

        <li>
          <Link to="/imageUploader" className="navbar-link">
            Images Upload
          </Link>
        </li>


      </ul>
    </nav>
  );
}

export default NavBar;
