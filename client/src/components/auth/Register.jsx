import React, { useContext, useState } from "react";
import { Alert } from "react-bootstrap";

import { API } from "../../config/api";

export default function Register() {

  const title = "Register";
  document.title = "WaysBucks | " + title;

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    try {

      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);

      if (response.data.status === "Success") {

        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );

        setMessage(alert);

        setForm({
          name: "",
          email: "",
          password: "",
        });

      } else {

        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );

        setMessage(alert);
      }

    } catch (error) {

      const alert = (
        <Alert variant="danger" className="py-1">
          {error}
        </Alert>
      );

      setMessage(alert);

      console.log(error);
    }

  };

  return (
    <div>
      <div className="container">
        <h1 className="mb-4 text-red fw-9">Register</h1>
        {message && message}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4 form-red" controlid="formGroupName">
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3 form-red">
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3 form-red">
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <button className="form-control btn btn-red" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
