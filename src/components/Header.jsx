/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint jsx-a11y/alt-text: 0 */

import logo from "../assets/logo.webp";
import Login from "./Login";
import { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";

function Header({
  loggedIn,
  login,
  logout,
  setQuery,
  query,
  reloadNews,
  loading,
  menuOpen,
  setMenuOpen,
  modalOpen,
  setModalOpen,
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  function updateQuery(e) {
    setQuery(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    reloadNews();
    setSearchOpen(false);
  }

  function showSearch(e) {
    if (loading || !loggedIn) return;
    const open = searchOpen;
    if (e.target.id !== "search-bar") {
      setSearchOpen(!searchOpen);
      if (open && query.length) handleSearch(e);
    }
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  let searchIcon = null;
  if (loggedIn) {
    searchIcon = searchOpen ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        height="24"
        width="24"
      >
        <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
      </svg>
    ) : (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
      </svg>
    );
  }

  let menuIcon = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
    </svg>
  );

  return (
    <>
      {modalOpen ? <Login toggleModal={toggleModal} login={login} /> : null}
      <header>
        <nav>
          <a href="#" className="logo-wrapper">
            <img className="logo" src={logo} alt="Morning Brew logo" />
          </a>
          <div className="nav-links large-screen-only">
            <a href="#">Brands</a>
            <a href="#">Podcasts</a>
            <a href="#">Featured</a>
            <a href="#">Shop</a>
            <a href="#">Courses</a>
          </div>
          <div className="subscribe large-screen-only">
            <form
              className={"search-wrapper" + (loggedIn ? " loggedIn" : "")}
              onSubmit={handleSearch}
              onClick={showSearch}
            >
              {loading ? <PuffLoader /> : searchIcon}
              {searchOpen ? (
                <input id="search-bar" onChange={updateQuery} autoFocus />
              ) : null}
            </form>
            <svg
              stroke="rgb(28, 127, 242)"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "0.45rem", fontSize: "1.12rem" }}
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <a>Subscribe</a>
            {loggedIn ? (
              <a id="login-link" onClick={logout}>
                Logout
              </a>
            ) : (
              <a id="login-link" onClick={toggleModal}>
                Login
              </a>
            )}
          </div>

          <div className="menu-hamburguer small-screen-only">
            <div
              className="menu-icon-container"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              {loading ? <PuffLoader /> : menuIcon}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
