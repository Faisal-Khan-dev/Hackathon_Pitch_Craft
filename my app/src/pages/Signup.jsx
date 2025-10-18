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

  const signupHandler = async () => {
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
      
      <TextField
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className=""
      />
      <br />

      <TextField
        type="password"
        placeholder="Password"
        onChange={(e) => setpassword(e.target.value)}
        value={password}
      />

      <p>
        Already Account? <Link to={"/"}> login </Link>
      </p>
      {/* <button onClick={signupHandler}>Signup</button> */}
      <ButtonCmp title={"Signup"} onClick={signupHandler} />
    </div>
  );
};

export default Signup;
