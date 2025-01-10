import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTshirt,
  faShoppingCart,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  console.log("Header is rendering");
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">T-Shirt Store</Link>
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li>
              <Link to="/products">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faTshirt} />
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FontAwesomeIcon icon={faSignInAlt} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
