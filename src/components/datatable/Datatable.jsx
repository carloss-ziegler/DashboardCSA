import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import "./Datatable.scss";
import { userColumns } from "../../DataTableSource";
import { Link, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import CachedIcon from "@mui/icons-material/Cached";
import { toast } from "react-toastify";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Datatable = ({ table, title, columns, page }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, table));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  const handleDelete = async (id) => {
    try {
      if (window.confirm(`Deseja realmente excluir o cadastro?`)) {
        await deleteDoc(doc(db, table, id));

        toast.info("Deletado com sucesso!", {
          theme: "dark",
        });
      }
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Ação",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="flex items-center space-x-2">
            <Link
              to={`/${page}/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <button className="flex items-center justify-center font-semibold cursor-pointer py-1 px-2 rounded text-[#1c94fc] border border-[#1c93fc67] hover:opacity-80">
                Ver <VisibilityIcon />
              </button>
            </Link>

            <div
              className="flex items-center justify-center font-semibold cursor-pointer py-1 px-2 rounded text-[#e91034] border border-[#e9103481] hover:opacity-80"
              onClick={() => handleDelete(params.row.id)}
            >
              Deletar <DeleteSweepIcon />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="h-[400px] p-5">
      <div className="w-full text-lg text-[#808080] mb-3 flex items-center justify-between shadow p-2">
        <Link
          to={`/${page}/new`}
          className="text-decoration-none text-white font-semibold bg-[#048444d5] py-1 px-2 rounded"
        >
          {title}
        </Link>

        <button
          title="Recarregar tabela"
          onClick={() => window.location.reload()}
        >
          <CachedIcon />
        </button>
      </div>
      <DataGrid
        className="shadow border border-dark"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        // autoHeight={true}
      />
    </div>
  );
};

export default Datatable;
