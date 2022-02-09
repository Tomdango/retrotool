type AppViews = "HomeView" | "LoginView" | "SetupRetroView" | "RetroView";

export const AppRoutes: Readonly<Record<AppViews, string>> = {
  LoginView: "/",
  HomeView: "/app/",
  RetroView: "/app/retros/:retroID",
  SetupRetroView: "/app/retros/setup",
};
