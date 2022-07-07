import Schedule from "../../components/Schedule";
import { useAuthContext } from "../../hooks/useAuthContext";
//styles
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuthContext();
  console.log(user.uid);
  return (
    <div>
      <Schedule></Schedule>
    </div>
  );
}
