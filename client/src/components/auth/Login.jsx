import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { API } from "../../config/api";

export default function Login() {
  const { t } = useTranslation();
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

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response.data.data.role === "admin") {
          history.push("/transaction-admin");
        } else {
          history.push("/");
        }

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
        <h1 className="mb-4 text-red fw-9">{t('login')}</h1>
        {message && message}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 form-red">
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder={t('email')}
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
              placeholder={t('password')}
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <button className="form-control btn btn-red">
              {t('login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
