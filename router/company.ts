import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
} from "../controllers/company/controller";

const router = express.Router();
// company add user must be super user
router.post("/savecompanies", createCompany);
router.get("/getallcompanies", getAllCompanies);
router.get("/getcompanies/:id", getCompanyById);
router.put("/updatecompanies/:id", updateCompanyById);
router.delete("/deletecompanies/:id", deleteCompanyById);

module.exports = router;
