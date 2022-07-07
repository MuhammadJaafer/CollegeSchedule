import { useState } from "react";

//context
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogin } from "../../hooks/useLogin";

//styles
import styles from "./Login.module.css";
import LodingIcon from "../../assets/loading-icon.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();
  //handle Sumbimt
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
    clearForm();
  };

  //clear fields
  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.login_form}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button className="btn">Login</button>
      </form>
    </div>
  );
}
