import { FaBook, FaCalendar, FaHome, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart()


    //TODO: load data from the server to have dynamic isAdmin based on Data
    // const isAdmin = true;
    const [isAdmin] = useAdmin()
    console.log('isAdmin from dashboard:',isAdmin);

    return (
        <div className="drawer drawer-mobile ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            {/* <div className="drawer-content flex items-center justify-center"> */}
            <div className="drawer-content ">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                {/* Page content here */}
                <Outlet></Outlet>


            </div>
            <div className="drawer-side bg-[#d1a054]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80  ">
                    {/* admin / user wise devide data */}
                    {
                        // TODO
                        // isAdmin.admin ?
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/home' ><FaHome />Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/addItem' ><FaUtensils/>Add an Items</NavLink></li>
                                <li><NavLink to='/dashboard/manageitems'><FaWallet />Manage Items</NavLink></li>
                                <li><NavLink to='/dashboard/history'><FaWallet />Manage Bookings</NavLink></li>

                                <li><NavLink to='/dashboard/allusers'><FaUsers/>All Users</NavLink></li>

          
                            </>
                            :
                            <>
                                <li><NavLink to='/dashboard/home' ><FaHome />User Home</NavLink></li>
                                <li><NavLink to='/dashboard/reservations'><FaCalendar />Reservations</NavLink></li>
                                <li><NavLink to='/dashboard/history'><FaWallet />Payment History</NavLink></li>

                                <li className="">
                                    <NavLink to='/dashboard/mycart'>
                                        <FaShoppingCart /> My Cart
                                        <span className="badge badge-secondary">+{cart?.length || 0}</span>
                                    </NavLink>

                                </li>
                            </>
                    }



                    <div className="divider"></div>


                    <li><NavLink to='/'><FaHome />Home</NavLink></li>
                    <li><NavLink to='/menu'>Our Menu</NavLink></li>
                    <li><NavLink to='/order/salad'>Order Food</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;