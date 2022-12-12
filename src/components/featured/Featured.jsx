import React from "react";
import "./Featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Lucro Total</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={72} text={"72%"} strokeWidth={4} />
        </div>
        <p className="title">Vendas do dia</p>
        <p className="amount">$890</p>
        <p className="desc">
          Transações podem não estar atualizadas em tempo real
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Meta</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">R$1400</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Semanal</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">R$2360</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Mensal</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">R$4000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
