"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const sqlite3_1 = __importDefault(require("sqlite3"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const db = new sqlite3_1.default.Database(path_1.default.resolve(__dirname, 'mountainbikers.sqlite'));
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', async (_req, res) => {
    try {
        const rows = await db.all('SELECT * FROM products');
        res.json(rows);
    }
    catch (err) {
        console.error(`Something went wrong with your request: ${err}`);
        res.status(500).send('Database error');
    }
});
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'dist')));
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
