import LodingIcon from "../assets/loading-icon.svg";
//style
import { useEffect, useState } from "react";
import Cell from "./Cell";
import styles from "./Schedule.module.css";
import { projectFirestore } from "../firebase/Config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useCollection } from "../hooks/useCollection";
import Form from "./Form";
export default function Schedule() {
  const [form, setForm] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [index, setIndex] = useState(null);
  const { user } = useAuthContext();
  const { editCell, response, error, isPending } = useFirestore("schedules", [
    "uid",
    "==",
    user.uid,
  ]);
  const { schedule, _error, _isPending } = useCollection("schedules", [
    "uid",
    "==",
    user.uid,
  ]);
  ///////////////////////////

  const showForm = (number) => {
    setForm(true);
    setIndex(number);
  };
  const closeForm = () => {
    setForm(false);
  };
  const handleSubmit = (e, _text, _color) => {
    e.preventDefault();
    setForm(false);
    editCell(index, _text, _color);
    // setSchedule((prevSchedule) => {
    //   let color_ = prevSchedule.color;
    //   color_[index] = _color;
    //   let text_ = prevSchedule.text;
    //   text_[index] = _text;
    //   return { color: color_, text: text_ };
    // });
  };
  console.log(schedule, _error);
  return (
    <>
      {!error && !_error && (
        <>
          <div className={styles.center}>
            <div className={styles.schedule}>
              <div className={styles.schedule_static}>
                <Cell color={"gray"} click={false} text="Time / Day" />
                <Cell text={"SUN"} click={false} />
                <Cell text={"MON"} click={false} />
                <Cell text={"TUE"} click={false} />
                <Cell text={"WED"} click={false} />
                <Cell text={"THU"} click={false} />
              </div>

              <div className={styles.schedule_cells}>
                {schedule &&
                  schedule.color.map((color, i) => (
                    <Cell
                      key={i}
                      index={i}
                      color={color}
                      text={schedule.text[i]}
                      showForm={showForm}
                    />
                  ))}
              </div>
            </div>
          </div>
          {form && <Form closeForm={closeForm} handleSubmit={handleSubmit} />}
          {_error && error && <p className="error">please reload the bage</p>}
          {_isPending && (
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
        </>
      )}
    </>
  );
}
