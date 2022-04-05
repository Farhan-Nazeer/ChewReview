import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      window.alert(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return  <CircularProgress className="loading-spinner"/>;
  }

  return (
    <div className="login-div">
      <h1 className="login-img">
        <FaSignInAlt /> Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </div>
        <div className="login-form-group">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </div>
        <div className="login-form-group">
          <Button type="submit" variant="contained" size="large" fullWidth>
            Login
          </Button>
        </div>
        <p className="register-redirect">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
