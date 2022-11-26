import "./App.css";
import Header from "./components/Header";
import Feed from "./components/Feed";
import MobileMenu from "./components/MobileMenu";
import LandingContainer from "./components/LandingContainer";
import api from "./services/api";

import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [reloadNewsIdx, setReloadNews] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);

  function reloadNews() {
    setReloadNews(reloadNewsIdx + 1);
  }

  function logout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  function login(token) {
    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setLoggedIn(true);
  }

  useEffect(() => {
    async function loginWithToken() {
      const token = localStorage.getItem("token");
      if (token) {
        const resp = await api.post("/login", { token });
        if (resp.status === 200) {
          login(token);
        }
      }
    }
    loginWithToken();
  }, []);

  useEffect(() => {
    if (menuOpen || modal) {
      document.querySelector("html").classList.add("lock-scroll");
    } else if (!menuOpen && !modal) {
      document.querySelector("html").classList.remove("lock-scroll");
    }

    if (menuOpen) {
      document.getElementById("menu").classList.remove("hidden");
      setTimeout(
        () => document.getElementById("menu").classList.remove("offset"),
        5
      );
    } else {
      document.getElementById("menu").classList.add("offset");
      setTimeout(
        () => document.getElementById("menu").classList.add("hidden"),
        400
      );
    }
  }, [menuOpen, modal]);

  return (
    <div className="App">
      <Header
        loggedIn={loggedIn}
        login={login}
        logout={logout}
        setQuery={setQuery}
        query={query}
        reloadNews={reloadNews}
        loading={loading}
        setLoading={setLoading}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        modal={modal}
        setModal={setModal}
      />
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        modal={modal}
        setModal={setModal}
        query={query}
        setQuery={setQuery}
        reloadNews={reloadNews}
        loggedIn={loggedIn}
        logout={logout}
      />
      <LandingContainer />
      <Feed
        query={query}
        reloadNewsIdx={reloadNewsIdx}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default App;
