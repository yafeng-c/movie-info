import React, { useState } from "react";
import app, { db } from "./firebase";
import "./SignUp.css";

const SignUp = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    async function onRegister() {
      await app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          user.updateProfile({ displayName: username });
        })
        .catch((error) => console.log(error));
      history.push("/login");
    }
    onRegister();
  };

  return (
    <div className="signupPage">
      <form className="signupForm" onSubmit={handleSubmit}>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
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
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
