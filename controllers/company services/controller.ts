import { Request, Response } from "express";
import { Service } from "../../models/service_model";

// Create a new service
const createService = async (req: Request, res: Response) => {
  try {
    const {
      serviceName,
      cmpId,
      authName,
      accessToken,
      subscriptionId,
      sessionId,
      clintState,
    } = req.body;

    // Validate request data (you may want to add more validation)
    if (!serviceName || !cmpId || !authName) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid request data" });
    }

    // Create a new Service instance
    const newService = new Service({
      serviceName,
      cmpId,
      authName,
      accessToken: {
        value: accessToken?.value || null,
        expiresAt: accessToken?.expiresAt || null,
      },
      subscriptionId: subscriptionId || null,
      sessionId: sessionId || null,
      clintState: clintState || null,
    });

    // Save the service to the database
    const savedService = await newService.save();

    // Respond with the saved service details
    // res.status(201).json(savedService);
  } catch (error) {
    console.error(error);
  }
};

// Get all services
const getAllServices = async (req: Request, res: Response) => {
  try {
    const cmpId = req.query.cmpId as string; // Extract cmpId from query parameter

    // Validate cmpId
    if (!cmpId) {
      return res
        .status(400)
        .json({ success: false, error: "cmpId is required" });
    }

    // Retrieve services for the specified cmpId
    const services = await Service.find({ cmpId });
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Get specific service by ID
const getServiceById = async (req: Request, res: Response) => {
  try {
    const cmpId = req.query.cmpId as string; // Extract cmpId from query parameter

    // Validate cmpId
    if (!cmpId) {
      return res
        .status(400)
        .json({ success: false, error: "cmpId is required" });
    }

    const service = await Service.findOne({ _id: req.params.id, cmpId });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: "Service not found for the specified cmpId",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Remove service by ID
const removeServiceById = async (req: Request, res: Response) => {
  try {
    const cmpId = req.query.cmpId as string; // Extract cmpId from query parameter

    // Validate cmpId
    if (!cmpId) {
      return res
        .status(400)
        .json({ success: false, error: "cmpId is required" });
    }

    const deletedService = await Service.findOneAndDelete({
      _id: req.params.id,
      cmpId,
    });

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        error: "Service not found for the specified cmpId",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const updateServiceById = async (req: Request, res: Response) => {
  try {
    const cmpId = req.query.cmpId as string; // Extract cmpId from query parameter

    // Validate cmpId
    if (!cmpId) {
      return res
        .status(400)
        .json({ success: false, error: "cmpId is required" });
    }

    const { serviceName, accessToken, authName, subscriptionId } = req.body;

    // Validate request data (you may want to add more validation)
    if (!serviceName || !accessToken || !authName || !subscriptionId) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid request data" });
    }

    const updatedService = await Service.findOneAndUpdate(
      { _id: req.params.id, cmpId },
      {
        serviceName,
        accessToken,
        authName,
        subscriptionId,
      },
      { new: true },
    );

    if (!updatedService) {
      return res.status(404).json({
        success: false,
        error: "Service not found for the specified cmpId",
      });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export {
  createService,
  getAllServices,
  getServiceById,
  removeServiceById,
  updateServiceById,
};
