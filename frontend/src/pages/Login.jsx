import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
