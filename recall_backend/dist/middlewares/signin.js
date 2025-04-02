"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMiddleware = loginMiddleware;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtKey = process.env.jwtKey;
console.log(jwtKey);
if (!jwtKey) {
    throw new Error("jwtkey not found");
}
const loginSchema = zod_1.z.object({
    password: zod_1.z.string().min(8),
    username: zod_1.z.string().min(3).max(20)
});
function loginMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = req.body.password;
        const username = req.body.username;
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                msg: "invalid Parameters"
            });
            return;
        }
        const user = yield user_1.userModel.findOne({ username: username });
        if (!user) {
            res.status(400).json({
                msg: "user not found"
            });
            return;
        }
        const hash = user === null || user === void 0 ? void 0 : user.password;
        try {
            const val = yield bcrypt_1.default.compare(password, hash);
            console.log(val);
            if (val) {
                console.log("signing jwt");
                const token = jsonwebtoken_1.default.sign({ username: username }, jwtKey);
                console.log("signed jwt");
                req.body.token = token;
                console.log("we got to the next function\n");
                next();
            }
            else {
                res.status(400).json({
                    msg: "user not found"
                });
            }
        }
        catch (e) {
            res.status(500).json({
                msg: "internal server error", e
            });
            return;
        }
        console.log("out of scope");
    });
}
