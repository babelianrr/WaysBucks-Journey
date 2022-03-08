import { useContext, useState } from "react";
import { Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import { UserContext } from "../context/userContext";

import logo from "../assets/waysbucks.png";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export default function Auth() {
  let history = useHistory();

  const title = "Home";
  document.title = "WaysBucks | " + title;

  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === true) {
      if (state.user.role === "admin") {
        history.push("/product-admin");
      } else if (state.user.role === "customer") {
        history.push("/");
      }
    }
  };
  checkAuth();

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const handleOpenLogin = () => setShowLogin(true)
  const handleCloseLogin = () => setShowLogin(false)
  const handleOpenRegister = () => setShowRegister(true)
  const handleCloseRegister = () => setShowRegister(false)

  return (
    <div>
      <div className="container">
        <nav>
          <div className="container d-flex flex-row align-items-center justify-content-between">
            <img src={logo} className="navbar-brand" alt="logo" style={{ width: '60px' }} />
            <div>
              <button className="btn btn-outline-red btn-sm mx-2" onClick={handleOpenLogin}>Log in</button>
              <button className="btn btn-red btn-sm mx-2" onClick={handleOpenRegister}>Register</button>
            </div>
          </div>
        </nav>
      </div>
      <div className="container">
        <div className="jumbotron mt-5 p-4 mx-auto">
          <p className="ms-5 mt-5 text-white fw-9 fre-60">WAYSBUCKS</p>
          <p className="ms-5 text-white fw-3 fs-24">Things are changing, but we're still there for you</p>
          <p className="ms-5 mb-5 text-white fw-3 fs-18">
            We have temporarily closed our in-store cafes, but selected<br />
            groceries and drive-thru locations are remaining open. <br />
            <strong>Waysbucks</strong> Drivers is also available.
          </p>
          <p className="ms-5 mb-5 text-white fw-3 fs-18">Let's Order...</p>
        </div>
      </div>
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton></Modal.Header>
        <Login />
      </Modal>
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton></Modal.Header>
        <Register />
      </Modal>
    </div>
  );
}
