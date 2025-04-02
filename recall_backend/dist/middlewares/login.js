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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinMiddleware = signinMiddleware;
const user_1 = require("../models/user");
const zod_1 = require("zod");
const signinSchema = zod_1.z.object({
    password: zod_1.z.string().min(8),
    username: zod_1.z.string().min(3).max(20),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().max(30)
});
function signinMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const email = req.body.email;
        const result = signinSchema.safeParse(req.body);
        if (result.success) {
            try {
                const usn = yield user_1.userModel.findOne({ username: username });
                const eml = yield user_1.userModel.findOne({ email: email });
                if (usn || eml) {
                    res.status(400).json({
                        msg: "user already exists"
                    });
                    return;
                }
                else {
                    next();
                }
            }
            catch (e) {
                res.status(400).json({
                    msg: "server error", e
                });
                return;
            }
        }
        else {
            res.status(400).json({
                msg: "invalid parameters"
            });
            return;
        }
    });
}
