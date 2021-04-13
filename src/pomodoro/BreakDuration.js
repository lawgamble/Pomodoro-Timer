import React from "react";

const BreakDuration = ({
  minutesToDuration,
  increaseBreakTime,
  decreaseBreakTime,
  breakTime,
}) => {
  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            Break Duration: {minutesToDuration(breakTime)}
          </span>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              onClick={decreaseBreakTime}
            >
              <span className="oi oi-minus" />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              onClick={increaseBreakTime}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakDuration;
