(function () {
  try {
    var stored = localStorage.getItem("brello-admin-theme");
    var theme = stored === "dark" || stored === "light" ? stored : "system";
    var dark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
