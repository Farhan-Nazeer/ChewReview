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
            type="text"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </div>
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
          <TextField
            label="Confirm password"
            type="password"
            variant="outlined"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            size="small"
            fullWidth
            className="bottom-form-button"
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
