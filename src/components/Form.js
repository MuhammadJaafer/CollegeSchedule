import { useState } from "react";
// styles
import styles from "./Form.module.css";
export default function Form({ closeForm, handleSubmit }) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#a8a8a8");
  return (
    <div className={styles.form}>
      <div className={styles.close} onClick={closeForm}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
      </div>
      <form onSubmit={(e) => handleSubmit(e, text, color)}>
        <label>
          <span>Text:</span>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            required
          />
        </label>
        <label>
          <span>Color:</span>
          <input
            className={styles.color_piker}
            type="color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          />
        </label>
        <button className={styles.btn}>Done</button>
      </form>
    </div>
  );
}
