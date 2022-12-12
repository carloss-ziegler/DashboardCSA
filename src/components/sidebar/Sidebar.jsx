import React from "react";
import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="top">
        <div className="">
          <Link to="/">
            <span className="text-green-600 font-bold">Casa Santo André</span>
          </Link>
        </div>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Principal</p>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">Lista</p>
          <li>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <PeopleIcon className="icon" />
              <span>Clientes</span>
            </Link>
          </li>
          <li>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <StoreIcon className="icon" />
              <span>Produtos</span>
            </Link>
          </li>
          <p className="title">Útil</p>
          <li>
            <AssessmentIcon className="icon" />
            <span>Status</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notificações</span>
          </li>
          <p className="title">Serviços</p>
          <li>
            <SettingsSystemDaydreamIcon className="icon" />
            <span>Saúde do Sistema</span>
          </li>
          <li>
            <PsychologyIcon className="icon" />
            <span>Registros</span>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <span>Configurações</span>
          </li>
          <p className="title">Usuário</p>
          <li>
            <PersonOutlineIcon className="icon" />
            <span>Perfil</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <button
              title="Sair"
              className="btn btn-outline-none"
              onClick={() => {
                if (window.confirm("Deseja se desconectar?")) {
                  localStorage.removeItem("user");
                  toast.info("Usuário desconectado!");
                  navigate("/login");
                }
              }}
            >
              Sair
            </button>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
