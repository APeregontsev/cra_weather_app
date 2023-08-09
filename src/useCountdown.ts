import { useEffect, useRef, useState } from "react";

export function useCountdown(inputDate: string) {
  // States
  const targetDateInMs = new Date(inputDate).getTime();

  const [difference, setDifference] = useState<number>(0);
  const timerId = useRef<number>();

  // To clear Countdown
  function clearTimer() {
    if (timerId.current) {
      window.clearInterval(timerId.current);
    }
  }

  // Countdown
  useEffect(() => {
    clearTimer();

    timerId.current = window.setInterval(() => {
      const now = Date.now();
      const newDifference = targetDateInMs - now;

      setDifference(newDifference);
    }, 1000);

    return () => clearTimer();
  }, [targetDateInMs]);

  // Lets format time in ms to needed format

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  function convertMsToTime(ms: number) {
    const MSinSecond = 1000;
    const MSinMinute = MSinSecond * 60;
    const MSinHour = MSinMinute * 60;
    const MSinDay = MSinHour * 24;

    // WholeNumbers
    const days = Math.trunc(ms / MSinDay);
    const hours = Math.trunc((ms - days * MSinDay) / MSinHour);
    const minutes = Math.trunc((ms - days * MSinDay - hours * MSinHour) / MSinMinute);
    const seconds = Math.trunc((ms - days * MSinDay - hours * MSinHour - minutes * MSinMinute) / MSinSecond);

    return {
      days: padTo2Digits(days),
      hours: padTo2Digits(hours),
      minutes: padTo2Digits(minutes),
      seconds: padTo2Digits(seconds),
    };
  }

  const result = convertMsToTime(difference);

  if (difference < 0) {
    clearTimer();
    setDifference(0);

    return {
      days: padTo2Digits(0),
      hours: padTo2Digits(0),
      minutes: padTo2Digits(0),
      seconds: padTo2Digits(0),
    };
  }

  return result;
}
