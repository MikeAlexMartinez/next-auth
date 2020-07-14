import { authApi, setAuthorization } from './api';
import logger from './logger';

export default async function isTokenValid(token) {
  setAuthorization(token);
  try {
    const res = await authApi().get('verifyToken');
    return true;
  } catch (e) {
    logger.error(e);
    setAuthorization();
    return false;
  }
}
