'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://France123:fmfmfm1234@ds149742.mlab.com:49742/jwt-auth-music-new';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://France123:fmfmfm1234@ds247852.mlab.com:47852/jwt-auth-music-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
console.log("config file has been executed");
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.CLIENT_ORIGIN = 'http://localhost:3000';