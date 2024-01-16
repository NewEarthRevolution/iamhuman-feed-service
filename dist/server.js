"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const feedRoutes_1 = __importDefault(require("./routes/feedRoutes"));
const sseService_1 = require("./services/sseService");
require("./services/redisSubscriber");
require('dotenv').config();
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
(0, sseService_1.setupSSE)(app); // Setup SSE endpoint
app.use('/api', feedRoutes_1.default);
// ... other configurations
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`feed-service running on port ${PORT}`));
exports.default = app;
