import { useState } from "react";
import classes from "./form.module.css";

interface IForm {
  city: string;
  timeZone: string;
}

interface FormProps {
  onSubmit: (data: { city: string; timeZone: string }) => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<IForm>({
    city: "",
    timeZone: "",
  });

  const { city, timeZone } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { city: city, timeZone: timeZone};
    const timeZoneNum = Number(timeZone);
    if (!city || !timeZone || isNaN(timeZoneNum) || timeZoneNum < -12 || timeZoneNum > 14) {
        setForm({ city: "", timeZone: "" });
        return 
      }

    onSubmit(data);
    setForm({ city: "", timeZone: "" });
  };

  return (
    <form className={classes["form-container"]} onSubmit={handleSubmit}>
      <div className={classes["input-box"]}>
        <label htmlFor="city">Город</label>
        <input
          type="text"
          name="city"
          className={classes.name}
          value={city}
          onChange={handleChange}
        />
      </div>

      <div className={classes["input-box"]}>
        <label htmlFor="time-zone">Временная зона (в часах)</label>
        <input
          type="text"
          name="timeZone"
          className={classes["time-zone"]}
          value={timeZone}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={classes.button}>
        Добавить
      </button>
    </form>
  );
};
