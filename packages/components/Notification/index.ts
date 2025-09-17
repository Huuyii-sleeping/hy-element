import Notification from "./methods";
import { withInstallFunction } from "@hy-element/utils";

export const hyNotification = withInstallFunction(Notification, '$notification')
export * from './types'