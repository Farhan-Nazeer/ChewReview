import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

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
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  };

  if (isLoading) {
    return <p>Loading...</p>
  }


  return (
    <div>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login to your account</p>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group"></div>
          <button type="submit" className="btn btn-block">Login</button>
        </form>
      </section>
    </div>
  );
}

export default Login;
