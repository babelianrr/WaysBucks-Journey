import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import LangSelector from "../LangSelector";
import { UserContext } from "../context/userContext";

import CartBadge from "../components/badge/CartBadge";
import logo from "../assets/waysbucks.png";
import cart from '../assets/cart.svg'
import profilepic from "../assets/blank-profile.png";

import { API } from "../config/api";

const logoutIcon = <FontAwesomeIcon icon={faSignOutAlt} />
const user = <FontAwesomeIcon icon={faUser} />

export default function Navbar() {
  const [state, dispatch] = useContext(UserContext);
  const [profile, setProfile] = useState({});

  let history = useHistory();
  const { t } = useTranslation();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    history.push("/auth");
  };

  const getProfile = async (id) => {
    try {
      const response = await API.get("/profile/" + state.user.id);
      setProfile(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <div className="container">
        <nav>
          <div className="container d-flex flex-row align-items-center justify-content-between">
            <Link to="/">
              <img src={logo} alt="logo" style={{ width: '60px' }} />
            </Link>
            <LangSelector />
            <ul className="d-flex flex-row align-items-center navbar-nav">
              <Link to="/cart">
                <li className="mx-3 nav-item position-relative">
                  <img src={cart} alt="cart" />
                  <CartBadge />
                </li>
              </Link>
              <li className="mx-3 nav-item dropdown">
                <div className="dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={profile?.image ? profile.image : profilepic} alt="profile pic" className="rounded-circle" style={{ width: '50px' }} />
                </div>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to={`/profile/` + state.user.id} style={{ textDecoration: "none" }}>
                    <li>
                      <div className="text-center">
                        <div className="dropdown-item nav-link">
                          <span className="text-red">{user} <span className="fw-9">{t('my_profile')}</span></span>
                        </div>
                      </div>
                    </li>
                  </Link>
                  <li><hr className="dropdown-divider" /></li>
                  <li className="text-center">
                    <div className="dropdown-item nav-link" onClick={logout}>
                      <span className="text-red">{logoutIcon} <span className="fw-9">{t('logout')}</span></span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
