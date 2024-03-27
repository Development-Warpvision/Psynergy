import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { labelAssigntoConverstaion } from "../../features/userTaskSlice";
// import { socket } from "../../App";

export default function ChatLabel({ convId, convLabel, userSpecificId }: any) {
  const labelList: any[] = JSON.parse(localStorage.getItem("label") ?? "");
  const dispatch = useDispatch<any>();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [label, setlabel] = React.useState<String>(convLabel);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    // socket.emit("addUser", userSpecificId);
  };

  // socket.on("labelsocket", (notificationData) => {
  //   // console.log(`Received notification: ${JSON.stringify(notificationData)}`);
  // });

  function handleClose(event: Event | React.SyntheticEvent) {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box
        onMouseEnter={handleToggle}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
      >
        <Chip
          label={label}
          sx={{
            backgroundColor: label ? "lightgreen" : "",
            // , color: "white"
          }}
        />
      </Box>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {labelList.map((e: any, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        dispatch(
                          labelAssigntoConverstaion({
                            label: e,
                            id: convId,
                          })
                        ).then(
                          (onResolved: any) => {
                            //   // console.log(onResolved.payload.label);
                            setlabel(e);
                            setOpen(false);
                          },
                          (onRejected: any) => {
                            // console.log("reje");
                          }
                        );
                      }}
                    >
                      {e}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
