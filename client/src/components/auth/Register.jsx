import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { API } from "../../config/api";

export default function Register() {
  const { t } = useTranslation();
  const alert = useAlert();

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
      if (response.data.status === 200) {
        return alert.info("Account already exist!");
      } else if (response.data.status === 201) {
        alert.success("Account has been registered!");
        setForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        alert.error("Account already exist");
      }
    } catch (error) {
      alert.error("An error occurred!");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="mb-4 text-red fw-9">{t('register')}</h1>
        {message && message}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4 form-red" controlid="formGroupName">
            <input
              type="text"
              placeholder={t('name')}
              value={name}
              name="name"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3 form-red">
            <input
              type="email"
              placeholder={t('email')}
              value={email}
              name="email"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3 form-red">
            <input
              type="password"
              placeholder={t('password')}
              value={password}
              name="password"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <button className="form-control btn btn-red" type="submit">
              {t('register')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
