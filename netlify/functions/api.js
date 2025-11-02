"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var serverless_http_1 = require("serverless-http");
var server_1 = require("../../server");
exports.handler = (0, serverless_http_1.default)((0, server_1.createServer)());
