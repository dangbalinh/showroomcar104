import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Product from "../pages/Product"
import News from "../pages/News"
import ReadNews from "../pages/ReadNews"
import DetailProduct from "../pages/DetailProduct"
import Introduce from "../pages/Introduce"
import Form from "../pages/Form"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Search from "../pages/SearchResult"

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/contact', component: Contact},
    {path: '/product', component: Product},
    {path: '/news', component: News},
    {path: '/introduce', component: Introduce},
    {path: '/readnews', component: ReadNews},
    {path: '/form', component: Form},
    {path: '/detailproduct', component: DetailProduct},
    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/search', component: Search},
]


export { publicRoutes };
