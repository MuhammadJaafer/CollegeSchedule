import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//styles
import styles from "./Navbar.module.css";

// context
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobile, setMobile] = useState(false);
  const { user, AuthIsReady } = useAuthContext();
  const { error, isPending, logout } = useLogout();
  // to change the current window width
  useEffect(() => {
    const changeWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => window.removeEventListener("resize", changeWidth);
  }, []);

  // to check if it is a mobile screen or not
  useEffect(() => {
    windowWidth < 600 ? setMobile(true) : setMobile(false);
  }, [windowWidth]);

  //function to show and hide menu
  const ToggleMenu = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/">College Schedule</NavLink>
      </div>

      <nav
        className={`${styles.navbar__list} ${
          menuToggle ? styles.navbar__active : ""
        }`}
      >
        <ul>
          {AuthIsReady && (
            <>
              {user ? (
                <>
                  <h3
                    className={styles.user_name}
                  >{`Hello! ${user.displayName}`}</h3>
                  <button className={`${styles.btn}`} onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" onClick={mobile ? ToggleMenu : ""}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" onClick={mobile ? ToggleMenu : ""}>
                      Signup
                    </NavLink>
                  </li>
                </>
              )}{" "}
            </>
          )}
        </ul>
      </nav>
      <div className={styles.menu_btn} onClick={ToggleMenu}>
        <div
          className={`${styles.line} ${
            menuToggle ? styles.line_top_active : ""
          } `}
        >
          {" "}
        </div>
        <div
          className={`${styles.line} ${
            menuToggle ? styles.line_mid_active : ""
          } `}
        >
          {" "}
        </div>
        <div
          className={`${styles.line} ${
            menuToggle ? styles.line_bot_active : ""
          } `}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}
