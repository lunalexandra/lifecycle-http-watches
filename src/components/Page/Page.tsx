import { useState, useEffect } from "react";
import { Clock } from "../Clock/Clock";
import { Form } from "../Form/Form";
import { getDateInTimezone } from "./getDateInTimezone";

export const Page = () => {
  const [results, setResults] = useState<{ city: string; timeZone: string }[]>([]);
  const [currentTime, setCurrentTime] = useState<{ [key: string]: { hours: number; minutes: number; seconds: number } }>({});

  const handleFormSubmit = (data: { city: string; timeZone: string }) => {
    setResults((prevResults) => [...prevResults, data]);
  };

  const removeResult = (city:string) => {
    setResults(results.filter((obj) => obj.city != city));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTime: { [key: string]: { hours: number; minutes: number; seconds: number } } = {};
      results.forEach(item => {
        updatedTime[item.city] = getDateInTimezone(item.timeZone);
      });
      setCurrentTime(updatedTime);
    }, 1000); 

    return () => clearInterval(intervalId);
  }, [results]); 

  return (
    <>
      <Form onSubmit={handleFormSubmit} />
      <section className="clock-section">
        {results.map((item) => {
          const time = currentTime[item.city] || { hours: 0, minutes: 0, seconds: 0 }; // Значение по умолчанию
          return (
            <Clock
              title={item.city}
              key={item.city}
              hh={time.hours}
              mm={time.minutes}
              ss={time.seconds}
              onDelete={() => removeResult(item.city)}
            />
          );
        })}
      </section>
    </>
  );
};
