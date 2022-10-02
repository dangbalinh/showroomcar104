import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Product from "../pages/Product"

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/contact', component: Contact},
    {path: '/product', component: Product}
]

export {publicRoutes};