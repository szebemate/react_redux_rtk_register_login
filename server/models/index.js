const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user_model");
db.role = require("./role_model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;