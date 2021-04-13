import React from "react";

const FocusDuration = ({
  minutesToDuration,
  focusTime,
  increaseFocusTime,
  decreaseFocusTime,
}) => {
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          Focus Duration: {minutesToDuration(focusTime)}
        </span>
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={decreaseFocusTime}
          >
            <span className="oi oi-minus" />
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={increaseFocusTime}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusDuration;
