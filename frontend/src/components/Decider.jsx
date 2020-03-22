import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import "./Decider.css";
import { Redirect } from "react-router-dom";
import axios from "axios";

const decisionData = [
  {
    question: "Kopf oder Bauch",
    answerOne: "Kopf",
    answerTwo: "Bauch",
    decisionKey: "kopfbauch"
  },
  {
    question: "Hell oder Dunkel",
    answerOne: "Hell",
    answerTwo: "Dunkel",
    decisionKey: "helldunkel"
  },
  {
    question: "Groß oder Klein",
    answerOne: "Groß",
    answerTwo: "Klein",
    decisionKey: "großklein"
  },
  {
    question: "Laut oder Leise",
    answerOne: "Laut",
    answerTwo: "Leise",
    decisionKey: "lautleise"
  }
];

export function Decider({ decisions, setDecision, ...props }) {
  const [step, setStep] = useState(-1);

  switch (step) {
    case -1:
      return <Initiator setStep={setStep} {...props} />;
    case decisionData.length:
      // User has gone through the whole decision process
      // Here we would need to talk to a backend to find out which listing we should go to based on the selection
      axios
        .post("http://localhost:3001/listing", decisions, {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
          responseType: "json"
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));

      //return <Redirect to={{ pathname: "/listing/123" }} />;
      return <div>Loading</div>;
    default:
      return (
        <DeciderButtons
          step={step}
          setDecision={setDecision}
          decisions={decisions}
          setStep={setStep}
          {...props}
        />
      );
  }
}

function Initiator({ setStep, ...props }) {
  return (
    <button className="startButton" onClick={() => setStep(0)}>
      Zeig mir ein Zimmer
    </button>
  );
}

function DeciderButtons({ step, setDecision, decisions, setStep, ...props }) {
  const { question, answerOne, answerTwo, decisionKey } = decisionData[step];

  return (
    <div className="deciderButtons" {...props}>
      <div className="deciderQuestion">
        <Typography variant="h4" component="h4">
          {question.toUpperCase()}?
        </Typography>
      </div>
      <div className="deciderAnswers">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setDecision({ ...decisions, [decisionKey]: answerOne });
            setStep(step + 1);
          }}
        >
          {answerOne}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setDecision({ ...decisions, [decisionKey]: answerTwo });
            setStep(step + 1);
          }}
        >
          {answerTwo}
        </Button>
      </div>
    </div>
  );
}
