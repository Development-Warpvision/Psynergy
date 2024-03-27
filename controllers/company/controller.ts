import { Request, Response } from "express";
import { Company } from "../../models/company_model";

// Create a new company
const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, address, owner, contact } = req.body;

    // Validate request data (you may want to add more validation)
    if (!name || !address || !owner || !contact) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid request data" });
    }

    // Create a new Company instance
    const newCompany = new Company({
      name,
      address,
      owner,
      contact,
    });

    // Save the company to the database
    const savedCompany = await newCompany.save();

    // Respond with the saved company details
    res.status(201).json(savedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Get all companies
const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Get specific company by ID
const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Update company by ID
const updateCompanyById = async (req: Request, res: Response) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedCompany) {
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Delete company by ID
const deleteCompanyById = async (req: Request, res: Response) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
};
