import { Outlet } from "react-router-dom";
import Navbar from '../shared/Navbar';
import Footer from "./Footer";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;