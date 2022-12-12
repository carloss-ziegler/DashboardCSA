import React from "react";
import "./Orders.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Orders = () => {
  return (
    <div className="orders">
      <Sidebar />
      <div className="ordersContainer">
        <Navbar />
        <div className="main">Nada ainda</div>
      </div>
    </div>
  );
};

export default Orders;
