import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return  <CircularProgress className="loading-spinner"/>;
  }

  return (
    <div className="login-div">
      <h1 className="login-img">
        <FaUser /> Register
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <TextField
            label="Name"
            name="name"
            onChange={handleChange}
            size="small"
            type="text"
            variant="outlined"
            value={formData.name}
            fullWidth
          />
        </div>
        <div className="login-form-group">
          <TextField
            label="Email"
            name="email"
            onChange={handleChange}
            size="small"
            type="email"
            variant="outlined"
            value={formData.email}
            fullWidth
          />
        </div>
        <div className="login-form-group">
          <TextField
            label="Password"
            name="password"
            onChange={handleChange}
            size="small"
            type="password"
            variant="outlined"
            value={formData.password}
            fullWidth
          />
        </div>
        <div className="login-form-group">
          <TextField
            className="bottom-form-button"
            label="Confirm password"
            name="confirmPassword"
            onChange={handleChange}
            size="small"
            type="password"
            variant="outlined"
            value={formData.confirmPassword}
            fullWidth
          />
        </div>
        <div className="login-form-group">
        <Button type="submit" variant="contained" size="large" fullWidth>
            Register
        </Button>
        </div>
        <p className="register-redirect">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
