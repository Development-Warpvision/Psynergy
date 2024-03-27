import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  removeServiceById,
  updateServiceById,
} from "../controllers/company services/controller";

const router = express.Router();

router.post("/saveservices", createService);
router.get("/allservices", getAllServices);
router.get("/services/:id", getServiceById);
router.delete("/deleteservices/:id", removeServiceById);
router.put("/updateservices/:id", updateServiceById);

module.exports = router;
