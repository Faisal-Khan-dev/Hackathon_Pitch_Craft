import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import ButtonCmp from "../components/ButtonCmp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = async () => {
    try {
      console.log("email:", email);
      console.log("password:", password);

      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("response:", response);

      localStorage.setItem("uid", response.user.uid);

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent page reload
          LoginHandler(); // call your login function
        }}
      >
        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <p>
          Create Account? <Link to="/signup">Signup</Link>
        </p>

        {/* Use type="submit" so pressing Enter also triggers it */}
        <ButtonCmp type="submit" title="Login" />
      </form>
    </div>
  );
};

export default Login;
