import React, { useEffect, useState } from "react";
import "./Single.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

const Single = () => {
  const { userId } = useParams();
  const docRef = doc(db, "clientes", userId);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      getDoc(docRef).then((doc) => {
        setUser(doc.data());
      });
    };
    return getUser();
  }, []);

  console.log(user);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <button onClick={() => navigate("/users")} className="editButton">
              Voltar
            </button>
            <h1 className="title">Informações</h1>
            <hr />
            <div className="item">
              <img
                src={user.img ? user.img : require("../../assets/csa.jpg")}
                alt="Avatar"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.displayName}</h1>
                <div className="detailItem">
                  <span className="itemKey">RG:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telefone:</span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CPF:</span>
                  <span className="itemValue">{user.cpf}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-5 shadow-lg bg-white rounded ">
            <span className="text-gray-400 font-semibold">Observações</span>

            <div className="text-center p-2 w-[450px] h-full over-flow-scroll mx-auto">
              <p>{user.obs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
