import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

//styles
import styles from "./Signup.module.css";
//icons
import LodingIcon from "../../assets/loading-icon.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { error, isPending, signup } = useSignup();
  //handle Sumbimt

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, name);
    console.log(name, email, password);
    clearForm();
  };

  //clear fields
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.signup_form}>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>
          <span>Dispaly Name:</span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Email Address:</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        {isPending && (
          <>
            <img
              src={LodingIcon}
              width="30px"
              height="30px"
              className="loading-icon"
            ></img>
            <div className="dark-background"></div>
          </>
        )}
        <button className="btn">Signup</button>
      </form>
    </div>
  );
}
