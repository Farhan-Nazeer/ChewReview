import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="header-text">
          <h1> <RestaurantMenuIcon fontSize="large" className="logo-icon"/> ChewReview</h1>
        </Link>
      </div>
      <div className="header-actions">
        {user ? (
          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            className="header-button"
          >
            Logout
          </Button>
        ) : (
          <>
            <Button startIcon={<LoginIcon />} className="header-button">
              <Link to="/login" className="header-text">
                Login
              </Link>
            </Button>
            <Button startIcon={<PersonIcon />} className="header-button">
              <Link to="/register" className="header-text">
                Register
              </Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
