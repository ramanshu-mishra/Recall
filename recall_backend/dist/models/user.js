"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
});
const types = ["youtube",
    "twitter",
    "facebook",
    "notion",
    "medium",
    "Images",
    "others",
    "notes"];
const contentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: types, required: true },
    tags: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "tag" },
    link: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" }
});
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
});
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    share: { type: Boolean, default: false }
});
const contentModel = mongoose_1.default.model("content", contentSchema);
exports.contentModel = contentModel;
const userModel = mongoose_1.default.model("user", userSchema);
exports.userModel = userModel;
const tagModel = mongoose_1.default.model("tag", tagSchema);
exports.tagModel = tagModel;
const linkModel = mongoose_1.default.model("link", linkSchema);
exports.linkModel = linkModel;
