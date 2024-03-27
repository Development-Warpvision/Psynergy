import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Divider, Input, Switch } from "@mui/material";
import InputVal from "./ChatBotInp";
import BotConatiner from "../../componets/ChatbotContainer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const ChatbotInput = () => {
  const validationSchema = yup.object({
    FirstFirstWidgetOptionText: yup
      .string()
      .email("Enter a valid FirstFirstWidgetOptionText")
      .required("FirstFirstWidgetOptionText is required"),
    FirstSecondWidgetOptionText: yup
      .string()
      // .min(8, 'FirstSecondWidgetOptionText should be of minimum 8 characters length')
      .required("FirstSecondWidgetOptionText is required"),
  });
  const formik = useFormik({
    initialValues: {
      FirstFirstWidgetOptionText: "",
      FirstSecondWidgetOptionText: "",
      FirstThirdWidgetOptionText: "",
      SecondFirstWidgetOptionText: "",
      SecondSecondWidgetOptionText: "",
      SecondThirdWidgetOptionText: "",
      ThirdFirstWidgetOptionText: "",
      ThirdSecondWidgetOptionText: "",
      ThirdThirdWidgetOptionText: "",
      FourthFirstWidgetOptionText: "",
      FourthSecondWidgetOptionText: "",
      FourthThirdWidgetOptionText: "",
      FirstFirstWidgetDescription: "",
      FirstSecondWidgetDescription: "",
      FirstThirdWidgetDescription: "",
      SecondFirstWidgetDescription: "",
      SecondSecondWidgetDescription: "",
      SecondThirdWidgetDescription: "",
      ThirdFirstWidgetDescription: "",
      ThirdSecondWidgetDescription: "",
      ThirdThirdWidgetDescription: "",
      FourthFirstWidgetDescription: "",
      FourthSecondWidgetDescription: "",
      FourthThirdWidgetDescription: "",
      ActionProviderHandlerFirst: "",
      ActionProviderHandlerSecond: "",
      ActionProviderHandlerThird: "",
      ActionProviderHandlerFour: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      const data = {
        learnig: [
          {
            widgetName: "MainTile",
          },
          {
            widgetName: "First",
            options: [
              {
                text: values.FirstFirstWidgetOptionText,
                url: values.FirstFirstWidgetDescription,
                id: 1,
              },
              {
                text: values.FirstSecondWidgetOptionText,
                url: values.FirstSecondWidgetDescription,
                id: 2,
              },
              {
                text: values.FirstThirdWidgetOptionText,
                url: values.FirstThirdWidgetDescription,
                id: 3,
              },
            ],
          },
          {
            widgetName: "Second",
            options: [
              {
                text: values.SecondFirstWidgetOptionText,
                url: values.SecondFirstWidgetDescription,
                id: 1,
              },
              {
                text: values.SecondSecondWidgetOptionText,
                url: values.SecondSecondWidgetDescription,
                id: 2,
              },
              {
                text: values.SecondThirdWidgetOptionText,
                url: values.SecondThirdWidgetDescription,
                id: 3,
              },
            ],
          },
          {
            widgetName: "Third",
            options: [
              {
                text: values.ThirdFirstWidgetOptionText,
                url: values.ThirdFirstWidgetDescription,
                id: 1,
              },
              {
                text: values.ThirdSecondWidgetOptionText,
                url: values.ThirdSecondWidgetDescription,
                id: 2,
              },
              {
                text: values.ThirdThirdWidgetOptionText,
                url: values.ThirdThirdWidgetDescription,
                id: 3,
              },
            ],
          },
          {
            widgetName: "Fourth",
            options: [
              {
                text: values.FourthFirstWidgetOptionText,
                url: values.FourthFirstWidgetDescription,
                id: 1,
              },
              {
                text: values.FourthSecondWidgetOptionText,
                url: values.FourthSecondWidgetDescription,
                id: 2,
              },
              {
                text: values.FourthThirdWidgetOptionText,
                url: values.FourthThirdWidgetDescription,
                id: 3,
              },
            ],
          },
        ],
        ActionProviderHandler: {
          first: values.ActionProviderHandlerFirst,
          second: values.ActionProviderHandlerSecond,
          third: values.ActionProviderHandlerThird,
          fourth: values.ActionProviderHandlerFour,
        },
        learnongOptions: {
          first: "first",
          second: "seconfd",
          third: "third",
          fourth: "fourth",
        },
      };
      // console.log(data);

      //save as file
      const element = document.createElement("a");
      const textFile = new Blob([JSON.stringify(data)], { type: "text/plain" }); //pass data from localStorage API to blob
      element.href = URL.createObjectURL(textFile);
      element.download = "botInput.json";
      document.body.appendChild(element);
      element.click();
    },
  });

  return (
    <Box sx={{ px: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Switch defaultChecked />

          <Box sx={{ pointerEvents: "none", backgroundColor: "grey" }}>
            <h1>First</h1>
            <InputVal
              formikValue={formik.values.ActionProviderHandlerFirst}
              Name={"ActionProviderHandlerFirst"}
              label={"First Main Tile Name"}
              fullwidth={true}
              formikError={formik.errors.ActionProviderHandlerFirst}
              formikTouch={formik.touched.ActionProviderHandlerFirst}
              formikHandleChange={formik.handleChange}
            />
            <Box sx={{ display: "flex" }}>
              <InputVal
                formikValue={formik.values.FirstFirstWidgetOptionText}
                Name={"FirstFirstWidgetOptionText"}
                label={"First Widget Text"}
                formikError={formik.errors.FirstFirstWidgetOptionText}
                formikTouch={formik.touched.FirstFirstWidgetOptionText}
                formikHandleChange={formik.handleChange}
              />
              <ArrowForwardIcon sx={{ marginY: "auto" }} />
              <InputVal
                formikValue={formik.values.FirstFirstWidgetDescription}
                Name={"First Description"}
                formikError={formik.errors.FirstFirstWidgetDescription}
                formikTouch={formik.touched.FirstFirstWidgetDescription}
                formikHandleChange={formik.handleChange}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <InputVal
                formikValue={formik.values.FirstSecondWidgetOptionText}
                Name={"Second Widget Text"}
                formikError={formik.errors.FirstSecondWidgetOptionText}
                formikTouch={formik.touched.FirstSecondWidgetOptionText}
                formikHandleChange={formik.handleChange}
              />
              <ArrowForwardIcon sx={{ marginY: "auto" }} />

              <InputVal
                formikValue={formik.values.FirstSecondWidgetDescription}
                Name={"Second Description"}
                formikError={formik.errors.FirstSecondWidgetDescription}
                formikTouch={formik.touched.FirstSecondWidgetDescription}
                formikHandleChange={formik.handleChange}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <InputVal
                formikValue={formik.values.FirstThirdWidgetOptionText}
                Name={"Third Widget Text"}
                formikError={formik.errors.FirstThirdWidgetOptionText}
                formikTouch={formik.touched.FirstThirdWidgetOptionText}
                formikHandleChange={formik.handleChange}
              />
              <ArrowForwardIcon sx={{ marginY: "auto" }} />
              <InputVal
                formikValue={formik.values.FirstThirdWidgetDescription}
                Name={"Third Description"}
                formikError={formik.errors.FirstThirdWidgetDescription}
                formikTouch={formik.touched.FirstThirdWidgetDescription}
                formikHandleChange={formik.handleChange}
              />
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />

          <Box>
            <h1>Second</h1>
            <InputVal
              formikValue={formik.values.ActionProviderHandlerSecond}
              Name={"Second Main Tile Name"}
              fullwidth={true}
              formikError={formik.errors.ActionProviderHandlerSecond}
              formikTouch={formik.touched.ActionProviderHandlerSecond}
              formikHandleChange={formik.handleChange}
            />
            <Box sx={{ display: "flex" }}>
              <InputVal
                formikValue={formik.values.SecondFirstWidgetOptionText}
                Name={"First Widget Text"}
                formikError={formik.errors.SecondFirstWidgetOptionText}
                formikTouch={formik.touched.SecondFirstWidgetOptionText}
                formikHandleChange={formik.handleChange}
              />
              <InputVal
                formikValue={formik.values.SecondFirstWidgetDescription}
                Name={"First Description"}
                formikError={formik.errors.FirstFirstWidgetOptionText}
                formikTouch={formik.touched.FirstFirstWidgetOptionText}
                formikHandleChange={formik.handleChange}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <InputVal
                formikValue={formik.values.SecondSecondWidgetOptionText}
                Name={"Second Widget Text"}
                formikError={formik.errors.SecondSecondWidgetOptionText}
                formikTouch={formik.touched.SecondSecondWidgetOptionText}
                formikHandleChange={formik.handleChange}
              />
              <InputVal
                formikValue={formik.values.SecondSecondWidgetDescription}
                Name={"Second Description"}
                formikError={formik.errors.SecondSecondWidgetDescription}
                formikTouch={formik.touched.SecondSecondWidgetDescription}
                formikHandleChange={formik.handleChange}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <InputVal
                formikValue={formik.values.SecondThirdWidgetOptionText}
                Name={"Third Widget Text"}
                formikError={formik.errors.SecondThirdWidgetOptionText}
                formikTouch={formik.touched.SecondThirdWidgetOptionText}
                formikHandleChange={formik.handleChange}
              />
              <InputVal
                formikValue={formik.values.SecondThirdWidgetDescription}
                Name={"Third Description"}
                formikError={formik.errors.SecondThirdWidgetDescription}
                formikTouch={formik.touched.SecondThirdWidgetDescription}
                formikHandleChange={formik.handleChange}
              />
            </Box>
          </Box>
        </Box>
        <h1>Third</h1>

        <InputVal
          formikValue={formik.values.ActionProviderHandlerThird}
          Name={"Third Main Tile Name"}
          formikError={formik.errors.ActionProviderHandlerThird}
          formikTouch={formik.touched.ActionProviderHandlerThird}
          formikHandleChange={formik.handleChange}
        />
        <Box>
          <Box sx={{ display: "flex" }}>
            <InputVal
              formikValue={formik.values.ThirdFirstWidgetOptionText}
              Name={"First Widget Text"}
              formikError={formik.errors.ThirdFirstWidgetOptionText}
              formikTouch={formik.touched.ThirdFirstWidgetOptionText}
              formikHandleChange={formik.handleChange}
            />
            <InputVal
              formikValue={formik.values.ThirdFirstWidgetDescription}
              Name={"ThirdFirstWidgetDescription"}
              formikError={formik.errors.ThirdFirstWidgetDescription}
              formikTouch={formik.touched.ThirdFirstWidgetDescription}
              formikHandleChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputVal
              formikValue={formik.values.ThirdSecondWidgetOptionText}
              Name={"ThirdSecondWidgetOptionText"}
              formikError={formik.errors.ThirdSecondWidgetOptionText}
              formikTouch={formik.touched.ThirdSecondWidgetOptionText}
              formikHandleChange={formik.handleChange}
            />
            <InputVal
              formikValue={formik.values.ThirdSecondWidgetDescription}
              Name={"ThirdSecondWidgetDescription"}
              formikError={formik.errors.ThirdSecondWidgetDescription}
              formikTouch={formik.touched.ThirdSecondWidgetDescription}
              formikHandleChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputVal
              formikValue={formik.values.ThirdThirdWidgetOptionText}
              Name={"ThirdThirdWidgetOptionText"}
              formikError={formik.errors.ThirdThirdWidgetOptionText}
              formikTouch={formik.touched.ThirdThirdWidgetOptionText}
              formikHandleChange={formik.handleChange}
            />
            <InputVal
              formikValue={formik.values.ThirdThirdWidgetDescription}
              Name={"ThirdThirdWidgetDescription"}
              formikError={formik.errors.ThirdThirdWidgetDescription}
              formikTouch={formik.touched.ThirdThirdWidgetDescription}
              formikHandleChange={formik.handleChange}
            />
          </Box>
        </Box>
        <h1>Fourth</h1>

        <InputVal
          formikValue={formik.values.ActionProviderHandlerFour}
          Name={"ActionProviderHandlerFour"}
          formikError={formik.errors.ActionProviderHandlerFour}
          formikTouch={formik.touched.ActionProviderHandlerFour}
          formikHandleChange={formik.handleChange}
        />
        <Box>
          <Box sx={{ display: "flex" }}>
            <InputVal
              formikValue={formik.values.FourthFirstWidgetOptionText}
              Name={"FourthFirstWidgetOptionText"}
              formikError={formik.errors.FourthFirstWidgetOptionText}
              formikTouch={formik.touched.FourthFirstWidgetOptionText}
              formikHandleChange={formik.handleChange}
            />
            <InputVal
              formikValue={formik.values.FourthFirstWidgetDescription}
              Name={"FourthFirstWidgetDescription"}
              formikError={formik.errors.FourthFirstWidgetDescription}
              formikTouch={formik.touched.FourthFirstWidgetDescription}
              formikHandleChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputVal
              formikValue={formik.values.FourthSecondWidgetOptionText}
              Name={"FourthSecondWidgetOptionText"}
              formikError={formik.errors.FourthSecondWidgetOptionText}
              formikTouch={formik.touched.FourthSecondWidgetOptionText}
              formikHandleChange={formik.handleChange}
            />
            <InputVal
              formikValue={formik.values.FourthSecondWidgetDescription}
              Name={"FourthSecondWidgetDescription"}
              formikError={formik.errors.FourthSecondWidgetDescription}
              formikTouch={formik.touched.FourthSecondWidgetDescription}
              formikHandleChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputVal
              formikValue={formik.values.FourthThirdWidgetOptionText}
              Name={"FourthThirdWidgetOptionText"}
              formikError={formik.errors.FourthThirdWidgetOptionText}
              formikTouch={formik.touched.FourthThirdWidgetOptionText}
              formikHandleChange={formik.handleChange}
            />
            <InputVal
              formikValue={formik.values.FourthThirdWidgetDescription}
              Name={"FourthThirdWidgetDescription"}
              formikError={formik.errors.FourthThirdWidgetDescription}
              formikTouch={formik.touched.FourthThirdWidgetDescription}
              formikHandleChange={formik.handleChange}
            />
          </Box>
        </Box>
        <Divider />

        <Divider />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ChatbotInput;
