import { USER_DATA } from "./registration.const";

export type TClient = (typeof USER_DATA)[keyof typeof USER_DATA];
