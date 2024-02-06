import { UserRecord } from 'firebase-admin/auth';

export type LoginCheck = {
  isLoggedIn: boolean;
  user?: UserRecord;
}