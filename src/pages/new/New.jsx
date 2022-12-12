import React, { useEffect, useState } from "react";
import "./New.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";

// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title, icon, table, page }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
  console.log(data);
  console.log(per);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setLoading(true);
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Pausado");
              break;
            case "running":
              console.log("Rodando");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoading(false);
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, table), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      toast.success("Cadastro adicionado com sucesso!", {
        theme: "dark",
      });
      navigate(`/${page}`);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(file);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>
            {title} {icon}
          </h1>
        </div>
        <div className="bottom">
          <div className="left">
            {loading ? (
              <div className="spinner-grow text-dark" role="status" />
            ) : (
              <img
                src={file ? URL.createObjectURL(file) : "../foto2.png"}
                alt="Img"
                className="shadow"
              />
            )}
          </div>
          <div className="right">
            <form className="shadow p-3">
              <div className="formInput">
                <label htmlFor="file">
                  Selecionar imagem: <DriveFolderUploadIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => {
                return (
                  <div className="formInput" key={input.id}>
                    <label htmlFor="">{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  </div>
                );
              })}

              <button
                disabled={per !== null && per < 100}
                type="submit"
                onClick={createUser}
              >
                {loading && (
                  <span
                    className="spinner-border mr-2 spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
