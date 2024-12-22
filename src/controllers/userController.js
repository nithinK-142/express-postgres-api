import {
  getAllUsersService,
  getUserByIdService,
  getUserByEmailService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService.js";
import handleResponse from "../middlewares/responseHandler.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    if (users.length === 0) return handleResponse(res, 200, "No users found");
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User found successfully", user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const existingUser = await getUserByEmailService(email);
    if (existingUser) return handleResponse(res, 400, "User already exists");
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(id, name, email);
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await deleteUserService(id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User deleted successfully", user);
  } catch (error) {
    next(error);
  }
};
