import React, { useContext, useState } from "react";
// import "./Login.scss";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockIcon from "@mui/icons-material/Lock";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    if (email && password) {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          toast.success("Conectado!", {
            theme: "dark",
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
          setError(true);
        });
      setLoading(false);
    }
  }

  const { dispatch } = useContext(AuthContext);

  return (
    <div className="fixed bg-[#e5e5e5] flex h-full w-full items-center justify-center">
      <div className="flex flex-row w-[830px] p-4 bg-[#f5f5f5] shadow overflow-hidden rounded-lg">
        {/* Left */}
        <div className="flex-1">
          <img
            src={require("../../assets/csa.jpg")}
            alt=""
            className="object-cover rounded w-[400px] h-[400px]"
          />
        </div>

        {/* Right */}
        <div className="flex-1 bg-[#f5f5f5] p-4">
          <h1 className="text-center text-2xl text-blue-600 font-semibold">
            Entrar no sistema
          </h1>

          <div className="mt-10 space-y-1 flex flex-col">
            <span className="text-gray-600">Email</span>
            <div className="flex items-center space-x-2 py-2 px-3 border border-[#cccccccc] bg-white rounded">
              <EmailRoundedIcon className="text-[#9e9e9e]" />
              <input
                className="w-full outline-none"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3 space-y-1 flex flex-col">
            <span className="text-gray-600">Senha</span>
            <div className="flex items-center space-x-2 py-2 px-3 border border-[#cccccccc] bg-white rounded">
              <LockIcon className="text-[#9e9e9e]" />
              <input
                className="w-full outline-none"
                type="password"
                placeholder="Email"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              onClick={handleLogin}
              className="mt-10 z-10 bg-blue-500 py-2 w-full flex items-center justify-center text-white font-semibold rounded hover:opacity-90"
            >
              {loading ? (
                <span className="flex space-x-2 items-center justify-center">
                  Entrar <CircularProgress color="success" size={24} />
                </span>
              ) : (
                <>Entrar</>
              )}
            </button>

            {error && (
              <span className="text-red-500 text-sm mt-3">
                <>Email ou senha incorretos!</>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
