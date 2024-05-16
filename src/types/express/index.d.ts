import { GetOneUserData } from '../../models/User';

declare global {
  namespace Express {
    export interface Request {
      user?: GetOneUserData;
    }
  }
}
