import Calculator1 from "../components/calculator/calculator1";
import AdminPage from "../pages/Admin";
import AdminLoginPage from "../pages/AdminLoginPage";
import Home from "../pages/Home";
import PaswordChange from "../pages/paswordChange";
import StatusByID from "../pages/StatusByID";
import UserDetail from "../pages/UserDetail";
import UserStatus from "../pages/UserStatus";

export const router = [
    {
        path: '/',
        page: <Home/>
    },
    {
        path: '/passchange',
        page: <PaswordChange/>
    },
    {
        path: '/userdetail/:id',
        page: <UserDetail/>
    },
    {
        path: '/userstatus/:id',
        page: <UserStatus/>
    },
    {
        path: '/userstatusById',
        page: <StatusByID/>
    },
    {
        path: '/adminpage',
        page: <AdminPage/>
    },
    {
        path: '/loancalculator',
        page:< Calculator1/>
    },
    {
        path: '/adminLogin',
        page:< AdminLoginPage/>
    },
   
]