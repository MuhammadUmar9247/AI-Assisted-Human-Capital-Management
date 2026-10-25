import Department from "../models/Department.js";
import Designation from "../models/Designation.js";
import LeaveType from "../models/LeaveType.js";
import Holiday from "../models/Holiday.js";
import CompanySettings from "../models/CompanySettings.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await CompanySettings.findOne();
  res.json(settings);
});

export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await CompanySettings.findOne();
  if (!settings) settings = await CompanySettings.create(req.body);
  else { Object.assign(settings, req.body); await settings.save(); }
  res.json(settings);
});

export const getDepartments = asyncHandler(async (req, res) => {
  const depts = await Department.find().sort({ name: 1 });
  res.json(depts);
});

export const createDepartment = asyncHandler(async (req, res) => {
  const dept = await Department.create(req.body);
  res.json(dept);
});

export const getDesignations = asyncHandler(async (req, res) => {
  const desigs = await Designation.find().populate("departmentId").sort({ name: 1 });
  res.json(desigs);
});

export const createDesignation = asyncHandler(async (req, res) => {
  const desig = await Designation.create(req.body);
  res.json(desig);
});

export const getLeaveTypes = asyncHandler(async (req, res) => {
  const types = await LeaveType.find().sort({ name: 1 });
  res.json(types);
});

export const createLeaveType = asyncHandler(async (req, res) => {
  const type = await LeaveType.create(req.body);
  res.json(type);
});

export const getHolidays = asyncHandler(async (req, res) => {
  const holidays = await Holiday.find().sort({ date: 1 });
  res.json(holidays);
});

export const createHoliday = asyncHandler(async (req, res) => {
  const holiday = await Holiday.create(req.body);
  res.json(holiday);
});
