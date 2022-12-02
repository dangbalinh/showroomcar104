import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Product from "../pages/Product";
import News from "../pages/News";
import ReadNews from "../pages/ReadNews";
import DetailProduct from "../pages/DetailProduct";
import Introduce from "../pages/Introduce";
import Form from "../pages/Form";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Search from "../pages/SearchResult"
import PassReset from "../pages/Login/ForgetPass/PassReset";
import UserInfoPage from "../pages/UserInfoPage";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/contact", component: Contact },
    { path: "/product/:carBrand", component: Product },
    { path: "/news", component: News },
    { path: "/introduce", component: Introduce },
    { path: "/readnews/:id", component: ReadNews },
    { path: "/form", component: Form },
    { path: "/detailproduct/:productId", component: DetailProduct },
    { path: "/register/*", component: Register, layout: null },
    { path: "/login", component: Login, layout: null },
    { path: '/search', component: Search },
    { path: "/admin/*", component: Admin, layout: null },
    { path: "/*", component: NotFound },
    { path: "/resetpass/:token", component: PassReset,layout:null },
    { path: "/user", component: UserInfoPage },

];

export {
    publicRoutes
};