import React, { useEffect, useState } from "react";
import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data;

  switch (type) {
    case "user":
      data = {
        title: "Clientes",
        isMoney: false,
        link: "Ver todos",
        page: "users",
        query: "clientes",
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{
              color: "#E91034",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Pedidos",
        isMoney: false,
        link: "Ver todos",
        page: "orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "#E9C125",
              backgroundColor: "rgba(128, 165, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    case "earnings":
      data = {
        title: "Lucros",
        isMoney: true,
        link: "Ver detalhes",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "#048444",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "Produtos",
        query: "produtos",
        page: "products",
        link: "Ver detalhes",
        icon: (
          <InventoryIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) /
          prevMonthData.docs.length) *
          100
      );
    };
    fetchData();
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "R$"} {amount}
        </span>
        <Link to={`/${data.page}`} className="link">
          {data.link}
        </Link>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
