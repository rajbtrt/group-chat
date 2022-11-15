import { app } from "../main";

export function infoToast(code, message) {
  app.config.globalProperties.$toast.add({
    severity: "info",
    summary: `Status code ${code}`,
    detail: message,
    life: 3000,
  });
}

export function errorToast(code, message) {
  app.config.globalProperties.$toast.add({
    severity: "error",
    summary: `Status code ${code}`,
    detail: message,
    life: 3000,
  });
}
