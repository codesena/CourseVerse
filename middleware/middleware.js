import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminModel, UserModel } from "./db.js";

const USER_JWT_SECRET = process.env.USER_JWT_SECRET;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

async function userSignupMiddleware(req, res, next) {
  const { username } = req.body;

  const user = await UserModel.findOne({
    username: username,
  });
  if (user) {
    res.json({
      msg: "user already exists",
    });
  } else next();
}

async function adminSignupMiddleware(req, res, next) {
  const { username } = req.body;

  const user = await AdminModel.findOne({
    username: username,
  });
  if (user) {
    res.json({
      msg: "user already exists",
    });
  } else next();
}

async function userSigninMiddleware(req, res, next) {
  const { username, password } = req.body;
  const user = await UserModel.findOne({
    username,
  });
  console.log(user);
  if (!user) {
    res.json({
      msg: "invalid credentials",
    });
    return;
  }
  const isvalid = await bcrypt.compare(password, user.password);
  if (isvalid) {
    req.userId = user._id;
    next();
  } else {
    res.json({
      msg: "invalid credentials",
    });
  }
}

async function adminSigninMiddleware(req, res, next) {
  const { username, password } = req.body;
  const admin = await AdminModel.findOne({
    username,
  });
  if (!admin) {
    res.json({
      msg: "invalid credentials",
    });
    return;
  }
  const isvalid = await bcrypt.compare(password, admin.password);
  console.log(admin);
  if (isvalid) {
    req.adminId = admin._id;
    next();
  } else {
    res.json({
      msg: "invalid credentials",
    });
  }
}

async function userAuthMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({
      msg: "you are not logged in",
    });
  }

  try {
    const userId = await jwt.verify(token, USER_JWT_SECRET).userId;
    const user = await UserModel.findOne({ _id: userId });
    if (user) {
      req.userId = userId;
      next();
    } else {
      res.json({
        msg: "You are not an authentic user",
      });
    }
  } catch (error) {
    res.json({
      msg: error,
    });
  }
}

async function adminAuthMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({
      msg: "You are not logged in",
    });
  }

  try {
    let adminId = jwt.verify(token, ADMIN_JWT_SECRET).adminId;
    // console.log(adminId);
    const admin = await AdminModel.findOne({ _id: adminId });
    if (admin) {
      req.adminId = adminId;
      next();
    } else {
      
      res.json({
        msg: "you are not an authentic admin",
      });
    }
  } catch (error) {
    res.json({
      msg: error,
    });
  }
}

export {
  userSignupMiddleware,
  userSigninMiddleware,
  userAuthMiddleware,
  adminSignupMiddleware,
  adminSigninMiddleware,
  adminAuthMiddleware,
};
