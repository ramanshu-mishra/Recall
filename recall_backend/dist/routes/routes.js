"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const signin_1 = require("../middlewares/signin");
const login_1 = require("../middlewares/login");
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
exports.router = router;
const salt = 10;
router.get("/", (req, res) => {
    res.status(200).json({
        msg: "API is working fine"
    });
});
router.post("/api/signin", login_1.signinMiddleware, (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    bcrypt_1.default.hash(password, salt, (err, hash) => {
        if (err) {
            res.status(500).json({
                msg: "something went wrong"
            });
        }
        user_1.userModel.create({
            name: name, username: username, email: email,
            password: hash
        }).then(() => {
            res.status(200).json({
                msg: "user registered succesfully"
            });
        });
    });
});
router.post("/api/login", signin_1.loginMiddleware, (req, res) => {
    const username = req.body.username;
    const pasword = req.body.password;
    res.status(200).json({
        msg: "User logged in succesfully",
        token: req.body.token
    });
});
router.get("/api/fetchContent", (req, res) => {
});
router.post("/api/addContent", (req, res) => {
});
router.get("/api/getlink", (req, res) => {
});
router.get("/api/disableLink", (req, res) => {
});
router.get("/api/fetchLink", (req, res) => {
});
