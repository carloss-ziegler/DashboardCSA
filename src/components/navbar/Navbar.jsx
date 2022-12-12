import React from "react";
import "./Navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-12 border-b-[0.5px] border-[#dbdbdb] flex items-center justify-end">
      <div className="w-full bg-[#f5f5f5] flex p-2 items-center justify-between">
        <div className="flex items-center space-x-1 border border-[#cccccccc] rounded">
          <SearchIcon className="text-gray-600" />
          <input
            className="outline-none px-2 py-1 bg-transparent rounded"
            type="text"
            placeholder="Procurar..."
          />
        </div>
        <div className="flex items-center">
          <div className="mr-10">
            <LanguageIcon className="icon" />
            <span>Português</span>
          </div>
          <div className="mr-10 cursor-pointer">
            <DarkModeIcon className="icon" />
          </div>
          <div className="mr-10 cursor-pointer">
            <NotificationsNoneIcon className="icon" />
          </div>
          <div className="mr-10 cursor-pointer">
            <ChatBubbleOutlineIcon className="icon" />
          </div>
          <div className="mr-10 cursor-pointer">
            <FormatListBulletedIcon className="icon" />
          </div>
          <div className="mr-10 cursor-pointer">
            <img
              src={require("../../assets/csa.jpg")}
              alt="avatar"
              className="w-8 h-8 object-cover"
            />
          </div>
          <div className="mr-10 cursor-pointer">
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
              <LogoutIcon className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
