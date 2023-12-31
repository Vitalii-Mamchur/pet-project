const jwt = require('jsonwebtoken');
const config = require('config');
const Token = require('../models/Token');

class TokenService {
  generateVerify(payload) {
    return jwt.sign(payload, config.get('verifySecret'), {expiresIn: '1h'});
  }
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecret'), {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(payload, config.get('refreshSecret'));
    const emailVerificationToken = jwt.sign(payload, config.get('verifySecret'), {expiresIn: '1h'});
    return {
      accessToken, refreshToken, emailVerificationToken, expiresIn: 3600,
    };
  }
  createVerify(payload) {
    const verifyToken = jwt.sign(payload, config.get('verifySecret'));
    return {
      verifyToken,
    };
  }
  async save(userId, refreshToken) {
    const data = await Token.findOne({userId});
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    return await Token.create({user: userId, refreshToken});
  }
  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshSecret'));
    } catch (e) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessSecret'));
    } catch (e) {
      return null;
    }
  }
  async findToken(refreshToken) {
    try {
      return await Token.findOne({refreshToken});
    } catch (e) {
      return null;
    }
  }
}
module.exports = new TokenService();
