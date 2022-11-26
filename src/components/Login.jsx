import PuffLoader from "react-spinners/PuffLoader";
import { useState } from "react";

export default function Login({ toggleModal, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  window.addEventListener("click", (event) => {
    if (event.target.id === "modal-container") {
      toggleModal();
    }
  });

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage(<PuffLoader color="white" />);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://reqres.in/api/login", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      // Call a function when the state changes.
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let response = JSON.parse(xhr.responseText);
        if ("token" in response) {
          login(response.token);
          setMessage("Logged in successfully!");
          setTimeout(() => {
            toggleModal();
          }, 500);
        } else {
          setMessage("Invalid credentials!");
        }
      }
    };
    xhr.send(JSON.stringify({ email, password }));
  }

  return (
    <div id="modal-container">
      <form onSubmit={handleSubmit} className="login">
        <div className="modal-title">
          <h1 id="login-title">Welcome!</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            onClick={toggleModal}
          >
            <path
              fill="#ffffff"
              d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
            />
          </svg>
        </div>
        <label htmlFor="login-email">E-mail</label>
        <input
          required
          minLength="3"
          id="login-email"
          onChange={handleEmail}
          type="email"
          placeholder="someone@somewhere.com"
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
