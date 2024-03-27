const express = require("express");
const {
  IamloginUser,
  IamsignupUser,
  IamlogoutUser,
  IamgetAccountDetails,
  IamupdatePassword,
  IamgetAllUsers,
  IamsearchUsers,
  IamgetUserDetailsById,
  IamdeleteProfile,
  IamresetRequest,
  onLineAgent,
  offLineAgent,
} = require("../controllers/access_control");
const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");

import {
  accessControlDelete,
  acessControlSignupValidate,
  LoginValidate,
  updatePasswordValidate,
} from "../controllers/vadlidation/validation";

import grantList from "../models/grant_list";
import { User } from "../models/user_model";
import { AccessContorlModel as AccessControlModel } from "../models/access_control_model";

const router = express();

router
  .route("/signup")
  .post(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role, grantList.userCreate.role], User),
    acessControlSignupValidate,
    IamsignupUser,
  );
router.route("/login").post(LoginValidate, IamloginUser);
router.route("/getOnlineAgents").get(onLineAgent);
router.route("/offLineAgent").post(offLineAgent);

router.route("/logout").get(IamlogoutUser);

router.route("/me").get(
  // isAuthenticated(User),
  isAuthenticated(AccessControlModel),
  // hasPermissionRole([grantList.admin.role], AccessControlModel),
  IamgetAccountDetails,
);
router
  .route("/delete/staff")
  .delete(
    isAuthenticated(User),
    accessControlDelete,
    hasPermissionRole([grantList.admin.role, grantList.userDelete.role], User),
    IamdeleteProfile,
  );

router
  .route("/password/update")
  .put(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role, grantList.userUpdate.role], User),
    updatePasswordValidate,
    IamupdatePassword,
  );

router
  .route("/password/reset")
  .put(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role, grantList.userUpdate.role], User),
    IamresetRequest,
  );
router
  .route("/user/all")
  .get(
    isAuthenticated(User),
    hasPermissionRole([grantList.admin.role, grantList.userRead.role], User),
    IamgetAllUsers,
  );

router
  .route("/user")
  .get(
    isAuthenticated(User),
    hasPermissionRole(
      [
        grantList.admin.role,
        grantList.userRead.role,
        grantList.userDelete.role,
        grantList.userUpdate.role,
        grantList.userCreate.role,
      ],
      User,
    ),
    IamsearchUsers,
  );

router
  .route("/user/:id")
  .get(
    isAuthenticated(User),
    hasPermissionRole(
      [
        grantList.admin.role,
        grantList.userRead.role,
        grantList.userDelete.role,
        grantList.userUpdate.role,
        grantList.userCreate.role,
      ],
      User,
    ),
    IamgetUserDetailsById,
  );

module.exports = router;
