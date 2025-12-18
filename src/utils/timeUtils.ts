import { ENV } from "../config/environment.ts";

export function generateExpiryTimestamp() {
  return new Date(Date.now() + ENV.PASSWORD_CHANGE_CODE_EXPIRES_IN * 1000);
}
