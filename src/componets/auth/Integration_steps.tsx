import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GmailLogin from "./GmailLogin";
import OutlookLogin from "./OutlookLogin";
import FacebookLogin from "./FacebookLogin";
import SteeperSucces from "./SteeperSucces";
import SteeperAllDone from "./SteeperAllDone";
import { useLocation, useNavigate } from "react-router-dom";
import SteeperFetchChats from "./SteeperFetchChats";

const successFetchCheckArr: String[] = [];

export default function IntegrationStep() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [sendData, setSendData] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // console.log(location.state);

    if (
      location.state === undefined ||
      location.state === null ||
      location.state === ""
    ) {
      // navigate("/");
    }
  }, []);

  const getMessage = () => {
    setSendData(true);
  };

  const steps = ["Gmail", "Outlook", "Facebook"];
  const stepsModel = [
    <GmailLogin getMessage={getMessage} />,
    <OutlookLogin getMessage={getMessage} />,
    <FacebookLogin getMessage={getMessage} />,
  ];

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (sendData) {
      setSendData(false);
      successFetchCheckArr.push(steps[activeStep]);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // if (sendData) {
    //   setSendData(true);
    // }
  };
  // console.log(successFetchCheckArr);
  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box sx={{ width: "100%", marginY: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              {/* error={sendData ? true : false} */}
              <StepLabel {...labelProps}>
                <Typography>{label}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography
            sx={{ mt: 2, mb: 1, display: "flex", justifyContent: "center" }}
            variant="h1"
          >
            Congratulations
          </Typography>
          <SteeperFetchChats successFetchCheckArr={successFetchCheckArr} />
        </>
      ) : (
        <>
          <Box sx={{ mt: 2, mb: 1 }}>
            {sendData ? <SteeperSucces /> : stepsModel[activeStep]}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mt: 3 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            }
            <Button onClick={handleNext} disabled={sendData ? false : true}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
