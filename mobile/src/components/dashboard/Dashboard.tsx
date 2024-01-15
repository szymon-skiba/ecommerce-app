
import { useContext } from "react";
import AuthContext from "../../service/auth/AuthContextProvider";
import SideNav from "./sidenav";
import { Route, Router, Routes } from "react-router-dom";
import Products from "../products/Products";
import CreateProduct from "../products/CreateProduct";
import Users from "../users/Users";
import UpdateProduct from "../products/UpdateProduct";

const Dashboard = () => {

    const { authState } = useContext(AuthContext);
    return (
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">


                    <Routes>
                        <Route path="products" element={<Products />} />
                        {authState.role == "ROLE_ADMIN" && (
                            <>
                                <Route path="products/create" element={<CreateProduct />} />
                                <Route path="products/:id/edit" element={<UpdateProduct />} />
                                <Route path="users" element={<Users />
                                } />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
    );
};

export default Dashboard;