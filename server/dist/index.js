"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const admindb_1 = __importDefault(require("./db/admindb"));
const userRouter_1 = __importDefault(require("./route/userRouter"));
const adminRouter_1 = __importDefault(require("./route/adminRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_redis_1 = require("connect-redis");
const ioredis_1 = __importDefault(require("ioredis"));
dotenv_1.default.config();
const PORT = process.env.PORT || 7000;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(bodyParser.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: `${process.env.CLIENT_API}`,
    methods: ['GET', 'HEAD', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
const redisClient = new ioredis_1.default();
redisClient.on('connect', () => console.log("connected to redis"));
redisClient.on('error', (err) => console.error("Redis error: ", err));
exports.default = redisClient;
const redisStore = new connect_redis_1.RedisStore({
    client: redisClient,
    prefix: "admin:"
});
app.use((0, express_session_1.default)({
    store: redisStore,
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hour
    },
}));
admindb_1.default.on('error', console.error.bind(console, "MongoDB connection error"));
admindb_1.default.once('open', function () {
    console.log("mongodb connected successfully");
});
app.get('/', (req, res) => {
    res.send("Hello world");
});
(0, adminRouter_1.default)(app);
(0, userRouter_1.default)(app);
app.listen(PORT, () => {
    return console.log(`listening on ${PORT}`);
});
