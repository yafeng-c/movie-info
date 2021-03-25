import React, { useState } from "react";
import app from "./firebase";
import { useStateValue } from "./StateProvider";
import "./Login.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{}, dispatch] = useStateValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    async function onRegister() {
      await app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          dispatch({
            type: "GET_USER",
            currentUser: user.displayName,
            userId: user.uid,
          });
        })
        .catch((error) => console.log(error));
      history.push("/");
    }
    onRegister();
  };

  return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          required
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
