"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const routes_1 = require("./routes/routes");
const PORT = process.env.PORT || 3000;
const uri = process.env.uri;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', routes_1.router);
function connect(uri) {
    mongoose_1.default.connect(uri).then(() => {
        console.log("database connected succesfully");
        app.listen(PORT, () => {
            console.log(`listening at PORT ${PORT}`);
        });
    });
}
console.log(uri);
connect(uri);
