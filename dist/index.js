"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const server_1 = __importDefault(require("./server"));
const port = process.env.PORT || 5000;
server_1.default.listen(port, () => {
    console.log(colors_1.default.cyan.bold(`Server is running on port ${port}`));
});
