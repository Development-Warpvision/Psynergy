import React from "react";
import { TextField } from "@mui/material";
const InputVal = ({
  formikValue,
  Name,
  formikError,
  formikTouch,
  formikHandleChange,
  label,
  fullwidth=false
}: any) => {
  return (
    <TextField
      sx={{
        my: 1,
      }}
      fullWidth={fullwidth}
      variant="outlined"
      multiline
      id={Name}
      name={Name}
      label={label}
      value={formikValue}
      onChange={formikHandleChange}
      error={formikTouch && Boolean(formikError)}
      helperText={formikTouch && formikError}
    />
  );
};

export default InputVal;
