import React from "react";
import styled from "styled-components";

export const ProgressStep = styled.button`
  position: relative;
  width: 100%;
  font-size: 12px;
  text-align: center;
  cursor: default;
  // Hide the final step's progress bar
  &:last-child:after {
    display: none;
  }
  &:before {
    content: "✔";
    display: flex;
    margin: 0 auto;
    margin-bottom: 10px;
    width: 10px;
    height: 10px;
    background: #fff;
    border: 4px solid #dfe3e4;
    border-radius: 100%;
    color: #fff;
  }
  &:after {
    content: "";
    position: absolute;
    top: 6px;
    left: 50%;
    width: 0%;
    transition: width 1s ease-in;
    height: 5px;
    background: #dfe3e2;
    z-index: -1;
  }
  &.is-active {
    color: blue;

    &:before {
      border: 4px solid #777;
      animation: pulse 2s infinite;
    }
  }
  &.is-complete {
    color: #009900;

    // Step's circle in complete state
    &:before {
      font-family: Font Awesome;
      font-size: 20px;
      color: #fff;
      background: green;
      border: 4px solid transparent;
    }

    // Step's progress bar in complete state
    &:after {
      background: #2183dd;
      animation: nextStep 1s;
      animation-fill-mode: forwards;
    }
  }
  // Pulse animation for Step's circle in active state
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(33, 131, 221, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(33, 131, 221, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(33, 131, 221, 0);
    }
  }
  @keyframes nextStep {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

const UploadProgressTimeline = ({ step1, step2, step3, step4 }) => {
  //   console.log(step1, step2, step3, step4);
  return (
    <div className="relative flex w-full mb-10">
      <div
        className="absolute bg-gray-100 w-full"
        style={{ top: "5px", height: "5px", zIndex: "-1" }}
      ></div>
      <ProgressStep id="step1" className={`progress-step ${step1 ? "is-active" : "is-complete"}`}>
        Title
      </ProgressStep>

      <ProgressStep
        id="step2"
        className={`progress-step ${step2 ? "is-active" : step3 || step4 ? "is-complete" : ""}`}
      >
        Recipe
      </ProgressStep>

      <ProgressStep
        id="step3"
        className={`progress-step ${step3 ? "is-active" : step4 ? "is-complete" : ""}`}
      >
        Tags
      </ProgressStep>

      <ProgressStep id="step4" className={`progress-step ${step4 ? "is-active" : ""}`}>
        Preview
      </ProgressStep>
    </div>
  );
};

UploadProgressTimeline.defaultProps = {
  step1: true,
  step2: false,
  step3: false,
  step4: false,
  complete: false,
};

export default UploadProgressTimeline;
