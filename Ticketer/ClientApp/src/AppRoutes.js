import { Movies } from "./components/Movies/Movies";
import { About } from "./components/About/About";
import Movie from "./components/Movie/Movie";
import NotFound from "./components/NotFound/NotFound";
import Seatplan from "./components/Cart/Seatplan";
import { Payment } from "./components/Cart/Payment";
import Login from "./components/Login/Login";
import Cabinet from "./components/Profile/Profile";
import Help from "./components/Help/Help";
import Register from "./components/Register/Register";

const AppRoutes = [
    {
        index: true,
        element: <Movies route="airing" />
    },    
    {
        path: '/movies/soon',
        element: <Movies route="soon" />
    },
    {
        path: '/movies/archive',
        element: <Movies route="archive" />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/help',
        element: <Help />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/cabinet',
        element: <Cabinet/>
    },
    {
        path: '/movie/:id',
        element: <Movie />
    },
    {
        path: 'cart/seatplan',
        element: <Seatplan />
    },
    {
        path: 'cart/:id/payment',
        element: <Payment />
    },
    {
        path: "*",
        element: <NotFound />
    },
];

export default AppRoutes;
