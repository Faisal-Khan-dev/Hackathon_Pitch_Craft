import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "../components/TextField";
import ButtonCmp from "../components/ButtonCmp";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const signupHandler = async (e) => {

    e.preventDefault();

    try {
      console.log("email", email);
      console.log("password", password);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("user signup");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Sign-up</h1>

      <form onSubmit={signupHandler}>
        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />

        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          autoComplete="new-password"
          required
        />

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>

        <ButtonCmp type="submit" title="Signup" />
      </form>
    </div>
  );
};

export default Signup;
