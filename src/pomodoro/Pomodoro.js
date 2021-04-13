import React, { useState } from "react";

import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import BreakDuration from "./BreakDuration";
import FocusDuration from "./FocusDuration";
import PlayPauseStop from "./PlayPauseStop";

import { minutesToDuration } from "../utils/duration";
import { secondsToDuration } from "../utils/duration";

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [initialFocusTime, setInitialFocusTime] = useState(25);
  const [initialBreakTime, setInitialBreakTime] = useState(5);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [onPlay, setOnPlay] = useState(true);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [focusSession, setFocusSession] = useState(false);
  const [breakSession, setBreakSession] = useState(false);
  const [progressBar, setProgressBar] = useState(0);

  const resetTimer = () => {
    setOnPlay(true);
    setIsTimerRunning(false);
    setFocusTime(25);
    setBreakTime(5);
    setTimerMinutes(focusTime);
    setTimerSeconds(0);
    setBreakSession(false);
    setFocusSession(false);
    setInitialFocusTime(focusTime);
    setInitialBreakTime(breakTime);
    setProgressBar(0);
  };

  function playPause() {
    if (onPlay) {
      setInitialFocusTime(focusTime);
      setInitialBreakTime(breakTime);
      setTimerMinutes(focusTime);
      setOnPlay(false);
    }
    setFocusSession(true);
    setIsTimerRunning((prevState) => !prevState);
  }

  // Use Interval Function ---------------------------------------
  useInterval(
    () => {
      setTimerSeconds((second) => {
        second === 0 ? (second = 59) : (second -= 1);
        if (second === 59) setTimerMinutes(timerMinutes - 1);
        return second;
      });
      if (breakSession)
        setProgressBar(
          (progress) =>
            (progress = percentage(
              timerMinutes,
              timerSeconds,
              initialBreakTime
            ))
        );
      else
        setProgressBar(
          (progress) =>
            (progress = percentage(
              timerMinutes,
              timerSeconds,
              initialFocusTime
            ))
        );

      if (timerMinutes === 0 && timerSeconds === 1) sessionExpired();
    },
    isTimerRunning ? 1000 : null
  );

  const sessionExpired = () => {
    if (!breakSession) focusTimeExpired();
    else breakTimeExpired();
  };
  const focusTimeExpired = () => {
    new Audio("https://bigsoundbank.com/UPLOAD/mp3/0116.mp3").play();
    setBreakSession(true);
    setProgressBar(0);
    setTimerSeconds(0);
    setTimerMinutes(initialBreakTime);
  };
  const breakTimeExpired = () => {
    new Audio("https://bigsoundbank.com/UPLOAD/mp3/0116.mp3").play();
    setBreakSession(false);
    setProgressBar(0);
    setTimerSeconds(0);
    setTimerMinutes(initialFocusTime);
  };

  // Increase and Decrease Focus Time Functions Sent as props tp <FocusDuration />

  const increaseFocusTime = () => {
    if (focusTime < 60 && !isTimerRunning && onPlay) {
      setFocusTime((focusTime) => (focusTime += 5));
    }
  };

  const decreaseFocusTime = () => {
    if (focusTime > 5 && !isTimerRunning && onPlay) {
      setFocusTime((focusTime) => (focusTime -= 5));
    }
  };
  // ------------------------------------------------------------------------------ //

  // Increase and Decrease Break Time Functions Sent as props tp <BreakDuration />

  const increaseBreakTime = () => {
    if (breakTime < 15 && !isTimerRunning && onPlay) {
      setBreakTime((breakTime) => (breakTime += 1));
    }
  };

  const decreaseBreakTime = () => {
    if (breakTime > 1 && !isTimerRunning && onPlay) {
      setBreakTime((breakTime) => (breakTime -= 1));
    }
  };
  // ------------------------------------------------------------------------------ //

  function percentage(currentMinutes, currentSeconds, initialMinutes) {
    return (
      100 -
      ((currentMinutes * 60 + currentSeconds) / (initialMinutes * 60)) * 100
    );
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusDuration
          minutesToDuration={minutesToDuration}
          focusTime={focusTime}
          increaseFocusTime={increaseFocusTime}
          decreaseFocusTime={decreaseFocusTime}
        />
        <BreakDuration
          minutesToDuration={minutesToDuration}
          breakTime={breakTime}
          increaseBreakTime={increaseBreakTime}
          decreaseBreakTime={decreaseBreakTime}
        />
      </div>
      <PlayPauseStop
        playPause={playPause}
        resetTimer={resetTimer}
        classNames={classNames}
        isTimerRunning={isTimerRunning}
        useInterval={useInterval}
      />
      <div style={focusSession ? { display: "block" } : { display: "none" }}>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {!breakSession ? "Focusing" : "On Break"} for{" "}
              {!breakSession
                ? minutesToDuration(initialFocusTime)
                : minutesToDuration(initialBreakTime)}{" "}
              minutes
            </h2>
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(timerMinutes * 60 + timerSeconds)} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progressBar}
                style={{ width: `${progressBar}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
