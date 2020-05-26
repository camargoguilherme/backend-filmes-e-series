import jwt from 'jsonwebtoken';
import {promisify} from 'util';

import User from '../models/User';

import authConfig from '../../config/auth';

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({error: 'Token not provider'});
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({error: 'Token invalid'});
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    if (user.idAdmin) {
      return next();
    }
    return res.status(401).json({error: 'User is not admin'});
  } catch (error) {
    return res.status(401).json({error: 'User is not admin'});
  }
};
