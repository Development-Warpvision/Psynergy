import express from "express";
const router = express();
import { User } from "../models/user_model";
import { AccessContorlModel as AceessModel } from "../models/access_control_model";
const {
  IamIamloginUser,
  IamsignupUser,
  IamlogoutUser,
  IamgetAccountDetails,
  IamupdatePassword,
  IamgetAllUsers,
  IamsearchUsers,
  IamgetUserDetailsById,
  IamdeleteProfile,
} = require("../controllers/access_control");
const {
  loginUser,
  signupUser,
  logoutUser,
  getAccountDetails,
  updatePassword,
  forgotPassword,
  deleteProfile,
  verifyOtp,
  taskAssign,
  roleAssign,
  labelAdd,
  labelDelete,
  labelAssigntoConverstaion,
  isLogin,
  getStaff,
  activeUsersCount,
  customerLocation,
  updateUser,
  deleteUser,
  enableNotifications,
  disableNotifications,
} = require("../controllers/user_controller");

const { getAllChats } = require("../controllers/chatController");

const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");
import {
  LoginValidate,
  userSignupValidate,
  updatePasswordValidate,
  forgotPasswordValidate,
  acessControlSignupValidate,
  verifyOtpValidate,
} from "../controllers/vadlidation/validation";
import grantList from "../models/grant_list";
import { AccessControlDocument } from "../models/access_control_model";

router.route("/signup").post(userSignupValidate, signupUser);
router.route("/login").post(LoginValidate, loginUser);
router.route("/logout").get(logoutUser);
router.route("/verifyotp").post(verifyOtpValidate, verifyOtp);

router
  .route("/me")
  .get(
    isAuthenticated(User),
    isAuthenticated(AceessModel),

    getAccountDetails,
  )
  .delete(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role], User),
    deleteProfile,
  );

router
  .route("/staff")
  .get(isAuthenticated(User), isAuthenticated(AceessModel), getStaff);
router
  .route("/check")
  .get(isAuthenticated(User), isAuthenticated(AceessModel), isLogin);
router
  .route("/password/update")
  .put(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role], User),
    updatePasswordValidate,
    updatePassword,
  );
router
  .route("/password/forgot")
  .put(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role], User),
    forgotPasswordValidate,
    forgotPassword,
  );

router
  .route("/assigntask/:id")
  .put(isAuthenticated(User), isAuthenticated(AceessModel), taskAssign);
router
  .route("/roletask/:id")
  .put(isAuthenticated(User), isAuthenticated(AceessModel), roleAssign);

router.route("/allChat").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.admin.role], User),
  // hasPermissionRole([grantList.rootRead.role, "userCreate"], AceessModel),
  getAllChats,
);

router.route("/allChat").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.admin.role], User),
  // hasPermissionRole([grantList.rootRead.role, "userCreate"], AceessModel),
  getAllChats,
);

router
  .route("/label")
  .post(
    isAuthenticated(User),
    // hasPermissionRole([grantList.admin.role], User),
    // hasPermissionRole([grantList.rootRead.role, "userCreate"], AceessModel),
    labelAdd,
  )
  .delete(
    isAuthenticated(User),
    // hasPermissionRole([grantList.admin.role], User),
    // hasPermissionRole([grantList.rootRead.role, "userCreate"], AceessModel),
    labelDelete,
  );
router.route("/label/assign").put(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.admin.role], User),
  // hasPermissionRole([grantList.rootRead.role, "userCreate"], AceessModel),
  labelAssigntoConverstaion,
);
router.post("/customerLocation", customerLocation);
router.get("/activeUsersCount", activeUsersCount);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);
router.post("/enableNotifications", enableNotifications);
router.post("/disableNotifications", disableNotifications);

module.exports = router;
