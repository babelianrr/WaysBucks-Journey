import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

import { API } from "../../config/api";

export default function Login() {
  let history = useHistory();

  const title = "Login";
  document.title = "WaysBucks | " + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.role === "admin") {
          history.push("/transaction-admin");
        } else {
          history.push("/");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="mb-4 text-red fw-9">Login</h1>
        {message && message}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 form-red">
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3 form-red">
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <button className="form-control btn btn-red">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
