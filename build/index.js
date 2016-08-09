/**
 * @flow
 */

'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parseServer = require('parse-server');

var _parseDashboard = require('parse-dashboard');

var _parseDashboard2 = _interopRequireDefault(_parseDashboard);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var databaseURI = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dev';
var cloud = process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js';
var appId = process.env.APP_ID || 'JohnPeel';
var masterKey = process.env.MASTER_KEY || '';
var serverURL = process.env.SERVER_URL || 'http://localhost:1337/parse';
var port = process.env.PORT || 1337;

var api = new _parseServer.ParseServer({
  databaseURI: databaseURI,
  cloud: cloud,
  appId: appId,
  masterKey: masterKey,
  serverURL: serverURL
});

var dashboard = new _parseDashboard2.default({
  apps: [{
    serverURL: serverURL,
    appId: appId,
    masterKey: masterKey,
    appName: "John Peel"
  }]
});

var app = (0, _express2.default)();

var mountParse = process.env.PARSE_MOUNT || '/parse';
app.use(mountParse, api);

var mountDashboard = process.env.PARSE_DASHBOARD || '/dashboard';
app.use(mountDashboard, dashboard);

app.listen(port, function () {
  console.log('John Peel spinning the vinyl on port ' + port + '.');
});