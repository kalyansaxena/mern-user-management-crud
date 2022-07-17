import "../scss/Navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (to) => {
    if (to === "users") {
      navigate("users");
    } else if (to === "register") {
      navigate("users/new");
    }
  };

  return (
    <div className="navbar gradient__bg">
      <ul className="nav-links">
        <li className="nav-item" onClick={() => handleNavigation("users")}>
          Users
        </li>
        <li className="nav-item" onClick={() => handleNavigation("register")}>
          Register
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
