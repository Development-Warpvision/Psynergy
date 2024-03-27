import { Checkbox } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { labelAssign } from "../features/userTaskSlice";

const UserAuthCheckedBox = ({ ismyRoleIncludes, name, userId }: any) => {
  const [checked, setChecked] = React.useState(ismyRoleIncludes ? true : false);
  const dispatch = useDispatch<any>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(labelAssign({ name, userId })).then(
      (onResolved: any) => {
        setChecked(!checked);

        // console.log("done");
      },
      (onRejected: any) => {
        // console.log("reje");
      }
    );
  };

  return (
    <>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
};

export default UserAuthCheckedBox;
