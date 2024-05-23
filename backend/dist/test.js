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
const axios_1 = __importDefault(require("axios"));
const registerUser = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const res = yield axios_1.default.post('http://localhost:8080/register', {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        console.log(res.data);
    }
    catch (err) {
        console.error(((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || err.message);
    }
});
const loginUser = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const res = yield axios_1.default.post('http://localhost:8080/login', {
            identifier: 'testuser',
            password: 'password123'
        });
        console.log(res.data);
    }
    catch (err) {
        console.error(((_b = err.response) === null || _b === void 0 ? void 0 : _b.data) || err.message);
    }
});
registerUser();
loginUser();
