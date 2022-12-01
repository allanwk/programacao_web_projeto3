import PuffLoader from "react-spinners/PuffLoader";
import { useState } from "react";
import api from "../services/api";

export default function Login({ modal, setModal, login, setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState(null);

  window.addEventListener("click", (event) => {
    if (event.target.id === "modal-container") {
      setModal(null);
    }
  });

  function handleUser(e) {
    setUser(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(<PuffLoader color="white" />);
    if (modal === "register") {
      const response = await api.post("/register", { user, email, password });
      if ("token" in response.data) {
        if ("isAdmin" in response.data) {
          setIsAdmin(response.data.isAdmin);
        }
        login(response.data.token);
        setMessage("Registered successfully!");
        setTimeout(() => {
          setModal(null);
          setMessage(null);
        }, 500);
      } else {
        setMessage(response.data.error || response.data.message);
      }
    } else {
      const response = await api.post("/login", { user: email, password });
      console.log(response.data);
      if ("token" in response.data) {
        if ("isAdmin" in response.data) {
          setIsAdmin(response.data.isAdmin);
        }
        login(response.data.token);
        setMessage("Logged in successfully!");
        setTimeout(() => {
          setModal(null);
          setMessage(null);
        }, 500);
      } else {
        setMessage(response.data.error || response.data.message);
      }
    }
  }
  if (modal) {
    return (
      <div id="modal-container">
        <form onSubmit={handleSubmit} className="login">
          <div className="modal-title">
            <h1 id="login-title">Welcome!</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              onClick={() => setModal(null)}
            >
              <path
                fill="#ffffff"
                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
              />
            </svg>
          </div>
          {modal === "register" ? (
            <>
              <label htmlFor="login-user">Username</label>
              <input
                required
                minLength="3"
                id="login-user"
                onChange={handleUser}
              />
            </>
          ) : null}
          <label htmlFor="login-email">
            {modal === "register" ? "E-mail" : "E-mail or username"}
          </label>
          <input
            required
            minLength="3"
            id="login-email"
            onChange={handleEmail}
            type={modal === "register" ? "email" : "text"}
          />
          <label htmlFor="login-password">Password</label>
          <input
            required
            minLength="3"
            id="login-password"
            onChange={handlePassword}
            type="password"
            placeholder="your password"
          />
          {message ? <h3 id="login-message">{message}</h3> : null}
          {modal === "register" ? (
            <button type="submit">Register</button>
          ) : (
            <button type="submit">Login</button>
          )}
        </form>
      </div>
    );
  }
}
