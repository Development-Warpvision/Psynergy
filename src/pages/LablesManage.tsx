import React, { useEffect, useState } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import LabelList from '../componets/LabelList'
import { useDispatch } from 'react-redux'
import { labeltoList } from '../features/userTaskSlice'
import ForbiddenAccess from '../componets/ForbiddenAccess'
import Pagination from "@mui/material/Pagination";

const LabelsManage = () => {
  const roles = JSON.parse(localStorage.getItem('label') ?? '')
  const [isStaff, setisStaff] = useState(false)
  const dispatch = useDispatch<any>()
  const [data, setData] = useState<any>(roles)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') ?? '').user._id
    const staffList: any[] =
      JSON.parse(localStorage.getItem('user') ?? '').user.staff ??
      JSON.parse(localStorage.getItem('user') ?? '').user.createdby.staff

    for (const key in staffList) {
      if (Object.prototype.hasOwnProperty.call(staffList, key)) {
        const element = staffList[key]
        if (element._id === user) {
          setisStaff(true)
        }
      }
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      Role: '',
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      const submitData2 = {
        Id: 20,
        Role: values.Role,
      }

      dispatch(labeltoList({ label: values.Role, method: 'POST' })).then(
        (onResolved: any) => {
          // setisTaskAssign(true);
          setData([...data, submitData2])
          // console.log("done");
        },
      )
    },
  })

  return (
    <>
      {!isStaff ? (
        <>
          <Typography
            sx={{
              py: 2,
              // textAlign: 'center',
              fontFamily: 'Arial, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'primary',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
            variant="h3"
            color="initial"
          >
            Add Label
          </Typography>

          <Box padding={"20px"} sx={{backgroundColor : "#F0F2F5", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", borderRadius : "20px"}}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline={true}
              rows={4}
              id="Role"
              sx={{
                backgroundColor: "white",
                borderRadius: "20px",
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Remove the border
                },
              }}
              name="Role"
              fullWidth
              size="medium"
              margin="normal"
              label="Enter Label here"
              value={formik.values.Role}
              onChange={formik.handleChange}
              error={formik.touched.Role && Boolean(formik.errors.Role)}
              helperText={formik.touched.Role && formik.errors.Role}
            />

            <Button color="primary" variant="contained" fullWidth type="submit"  sx={{borderRadius : "20px"}}>
              Add To List
            </Button>
          </form>
          </Box>
          <Box marginTop={"20px"} borderRadius={"20px"} padding={"1px 20px 40px"} sx={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
          <Box sx={{ marginTop: 5, backgroundColor : "#F9FAFC" }}>
            <LabelList rowsData={roles} inprows={roles} />
          </Box>
          </Box>
          <Box
        mt={"20px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box></Box>
        {/* <Box
          padding={"5px"}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          }}
          borderRadius={"5px"}
        >
          <Pagination count={4} color="primary" />
        </Box> */}
      </Box>
        </>
      ) : (
        <ForbiddenAccess />
      )}
    </>
  )
}

export default LabelsManage
