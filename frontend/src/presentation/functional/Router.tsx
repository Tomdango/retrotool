import { useEffect } from "react";
import {
  BrowserRouter,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { AppRoutes } from "../../core/constants/Routing";
import { useAuthContext } from "../../core/context/AuthContext";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import RetroView from "../views/retros/RetroView";
import SetupRetroView from "../views/retros/SetupRetroView";

const Routes: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && pathname !== AppRoutes.LoginView) {
      navigate(AppRoutes.LoginView, { replace: true });
    } else if (isAuthenticated && pathname === AppRoutes.LoginView) {
      navigate(AppRoutes.HomeView, { replace: true });
    }
  }, [isAuthenticated, pathname, navigate]);

  return useRoutes([
    { path: AppRoutes.HomeView, element: <HomeView /> },
    { path: AppRoutes.LoginView, element: <LoginView /> },
    { path: AppRoutes.SetupRetroView, element: <SetupRetroView /> },
    { path: AppRoutes.RetroView, element: <RetroView /> },
  ]);
};

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default Router;
