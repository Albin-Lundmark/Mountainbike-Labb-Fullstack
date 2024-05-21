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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const body_parser_1 = __importDefault(require("body-parser"));
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./model/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const db = new sqlite3_1.default.Database(path_1.default.resolve(__dirname, 'mountainbikers.sqlite'));
const port = process.env.PORT || 5173;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (_req, res) => { });
app.get('/about', (_req, res) => { });
app.get('/products', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error(`Something went wrong with your request: ${err.message}`);
            res.status(500).send('Database error');
            return;
        }
        res.json(rows);
    });
    return console.log(response);
}));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({
            msg: 'Please fill out username, email and password to register as a mountainbiker'
        });
    }
    try {
        const user = yield user_1.default.findOne({
            where: { [sequelize_1.Op.or]: [{ email }, { username }] }
        });
        if (user) {
            return res.status(400).json({ msg: 'That mountainbiker already exists' });
        }
        const newUser = yield user_1.default.create({
            username,
            email,
            password
        });
        res.status(201).json({ msg: 'User registered with a bang!' });
    }
    catch (err) {
        console.error('Could not register that awesome mountainbiker:', err);
        res.status(500).json({ msg: 'Server error' });
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
        return res
            .status(400)
            .send('<div style="display: grid; place-items: center; text-align: center;">Please enter both username/email and password</div>');
    }
    try {
        //Letar igenom min User model så att man ska kunna logga in antingen med användarnamn eller email
        const user = yield user_1.default.findOne({
            where: { [sequelize_1.Op.or]: [{ email: identifier }, { username: identifier }] }
        });
        if (!user || user.password !== password) {
            return res
                .status(400)
                .send('<div style="display: grid; place-items: center; text-align: center;">Unable to find an awesome mountainbiker with that name and/or password</div>');
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jsonwebtoken_1.default.sign(payload, 'awesome_mountainbikers_ftw', { expiresIn: 3600 }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        console.error('Login Error:', err);
        res
            .status(500)
            .send(`Something seems to be wrong with the server, take a break and have a coffee or take your beautiful mountainbike for a ride while we take a look into what's wrong!`);
    }
}));
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'dist')));
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
