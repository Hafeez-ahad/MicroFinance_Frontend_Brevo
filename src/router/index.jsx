import Calculator1 from "../components/calculator/calculator1.jsx";
import AdminPage from "../pages/Admin.jsx";
import AdminLoginPage from "../pages/AdminLoginPage.jsx";
import Home from "../pages/Home.jsx";
import PaswordChange from "../pages/paswordChange.jsx";
import StatusByID from "../pages/StatusByID.jsx";
import UserDetail from "../pages/UserDetail.jsx";
import UserStatus from "../pages/UserStatus.jsx";

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