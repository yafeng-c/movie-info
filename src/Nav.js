import React, { useState, useEffect } from "react";
import "./Nav.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import axios from "./axios";
import requests from "./requests";
import { useStateValue } from "./StateProvider";
import { Avatar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import app from "./firebase";

function Nav() {
  const [show, handleShow] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [query, setQuery] = useState("");
  const [{ currentUser }, dispatch] = useStateValue();
  const [sidebar, setSidebar] = useState(false);
  const [logout, setLogout] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => window.addEventListener("scroll");
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchMultiSearch, {
        params: {
          query: query,
        },
      });
      return request;
    }
    if (query !== "")
      fetchData().then((request) => {
        dispatch({
          type: "GET_RESULTS",
          results: request.data.results,
        });
      });
  }, [query]);

  useEffect(() => {
    dispatch({
      type: "LOGOUT",
    });
  }, [logout]);

  const handleLogout = () => {
    app.auth().signOut();
    setLogout(true);
  };

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className={`header ${show && "header_black"}`}>
        <Link to="/">
          <h2>Purple</h2>
        </Link>

        <div className="nav_search">
          <input
            type="text"
            placeholder="Search..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <Link to={`/search/query/${inputSearch}`}>
            <SearchIcon
              className="nav_searchIcon"
              onClick={() => setQuery(inputSearch)}
            />
          </Link>
        </div>
        {currentUser ? (
          <Avatar className="avatar" onClick={showSidebar} />
        ) : (
          <div className="nav_auth">
            <Link to="/signup">
              <p>Sign Up</p>
            </Link>
            <Link to="/login">
              <p>Login</p>
            </Link>
          </div>
        )}
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#">
              <CloseIcon className="closeButton" />
            </Link>
          </li>
          <li className="sidebar_text">
            <Link to="/mylist">
              <span>My list</span>
            </Link>
          </li>
          <p onClick={handleLogout}>Logout</p>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
