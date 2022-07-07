//style
import styles from "./Cell.module.css";

export default function Cell({
  color = "white",
  text,
  index,
  click = true,
  children,
  showForm,
}) {
  const handleClick = () => {
    if (!click) return;
    showForm(index);
  };
  return (
    <div
      onClick={handleClick}
      className={styles.cell}
      style={{ background: color }}
    >
      {!children && <p>{text}</p>}
      {children && children}
    </div>
  );
}
