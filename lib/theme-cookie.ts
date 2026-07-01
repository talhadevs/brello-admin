export const THEME_COOKIE_NAME = "brello-admin-theme";

export type ThemePreference = "light" | "dark" | "system";

export function resolveThemeClass(theme: string | undefined): string {
  if (theme === "dark") return "dark";
  return "";
}
