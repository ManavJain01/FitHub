// Importing Services
const service = require("../services/UserService");
const reportService = require("../services/ReportService");

// Creating Admin
const createAdminController = async (req, res) => {
  try {
    const result = await service.createAdmin(req.body);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

// Creating User
const createUserController = async (req, res) => {
  try {
    const result = await service.createUser(req.body, req.file);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

//Update User
const putUserController = async (req, res) => {
  try {    
    const result = await service.putUser(req.body, req.file, req.user.companyId);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(404).send(error);
  }
};

const deleteUserController = async (req, res) => {
  const id = req.query;
  try {
    const result = await service.deleteUser(id);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(204).send(error);
  }
};

// Signup
const signupController = async (req, res) => {
  try {
    const result = await service.signup(req.body);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const result = await service.login(req.body);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

// clerk Login
const clerkLoginController = async (req, res) => {
  try {
    const result = await service.clerkLoginService(req.body);
    res.status(200).send(result);

  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
}

const searchUserController = async (req, res) => {
  try {
    const result = await service.userSearch(req.query.user);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

// reset Password
const resetController = async (req, res) => {
  try {
    const result = await service.userReset(req.body);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const userController = async (req, res) => {
  try {
    const result = await service.getUser(req.query.id);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const allUsersController = async (req, res) => {
  try {
    const companyId = req.user.companyId;    
    const loggedInUserId = req.user._id;
    const result = await service.allUsers(loggedInUserId, companyId);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const userListController = async (req, res) => {
  try {
    const companyId = req.user.companyId;    
    const result = await service.userList(companyId);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

// Reports
const userLoginsController = async (req, res) => {
  try {
    const result = await reportService.fetchLogins();
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const productListController = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const result = await service.productList(companyId);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const createProductController = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const data = req.body;
    
    const result = await service.createProduct(data, companyId);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const putProductController = async (req, res) => {
  try {
    const data = req.body;

    const result = await service.updateProduct(data);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const deleteProductController = async (req, res) => {
  try {
    const {companyId, productId} = req.query;

    const result = await service.deleteProduct(productId, companyId);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const subscriptionListController = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const result = await service.subscriptionList(companyId);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const createSubscriptionController = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const data = req.body;
    
    const result = await service.createSubscription(data, companyId);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const putSubscriptionController = async (req, res) => {
  try {
    const data = req.body;

    const result = await service.updateSubscription(data);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

const deleteSubscriptionController = async (req, res) => {
  try {
    const {companyId, subscriptionId} = req.query;

    const result = await service.deleteSubscription(subscriptionId, companyId);
    res.status(200).send(result);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).send(error.message);
  }
};

// Exporting controllers
module.exports = {
  createAdminController,
  // Customers
  createUserController,
  putUserController,
  deleteUserController,
  signupController,
  loginController,
  clerkLoginController,
  searchUserController,
  resetController,
  userController,
  allUsersController,
  userListController,
  // Products
  productListController,
  createProductController,
  putProductController,
  deleteProductController,
  // subscription
  subscriptionListController,
  createSubscriptionController,
  putSubscriptionController,
  deleteSubscriptionController,
  // Reports
  userLoginsController,
};
