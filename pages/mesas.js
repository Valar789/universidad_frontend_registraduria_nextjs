import SideNav from "components/Layout/SideNav";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { deleteData, getData, updateData } from "helpers/conecctionApi";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Mesas({ dataTables, session, url }) {
  const { push } = useRouter();
  const xD = session.user.image;

  const [idUpdate, setIdUpdate] = useState("");
  const [infoMesas, setinfoMesas] = useState({
    numeroMesa: "",
    cedulasInscritas: "",
  });

  const captureValue = (e) => {
    setinfoMesas({
      ...infoMesas,
      [e.target.name]: e.target.value,
    });
  };

  const deleteTable = async (id) => {
    const resBackend = await deleteData(xD, url, id);
    push("/mesas");
    console.log(resBackend.status);
  };

  const updateTable = async () => {
    const resBackend = await updateData(xD, url, idUpdate, infoMesas);
    console.log(resBackend.status);
    push("/mesas");
  };

  return (
    <SideNav>
      {/* start Modal */}
      <div
        className="modal fade mt-5"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Actualizar Mesa
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* start form */}
              <form className="">
                <div className="mb-4">
                  <div className="">
                    <input
                      onChange={captureValue}
                      name="cedulasInscritas"
                      type="text"
                      id="form3Example1"
                      className="form-control"
                      placeholder="Cedulas Inscritas"
                    />
                  </div>
                </div>
                <div className=" mb-4">
                  <input
                    onChange={captureValue}
                    name="numeroMesa"
                    type="text"
                    id="form3Example3"
                    className="form-control"
                    placeholder="Numero de Mesa"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-mdb-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  updateTable();
                }}
                className="btn btn-primary"
                data-mdb-dismiss="modal"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end Modal */}

      <div className="container-fluid h-100">
        <div className="row mx-5 d-flex justify-content-center align-items-center">
          {dataTables.length > 1 ? (
            <>
              <div className="form-outline mt-4">
                <Link href="/add/mesas">
                  <button className="btn btn-success">Agregar Mesa</button>
                </Link>
              </div>
              <div className="container-fluid">
                <table className="table mx-4 mt-4 table-sm text-center p-4">
                  <thead>
                    <tr>
                      <th className="fw-bold">Codigo unico de le mesa</th>
                      <th className="fw-bold">Cedulas Inscritas</th>
                      <th className="fw-bold">Numero de Mesa</th>
                      <th className="fw-bold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTables.map((ele, index) => (
                      <tr key={index}>
                        <td>{ele._id}</td>
                        <td>{ele.cedulasInscritas}</td>
                        <td>{ele.numeroMesas}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <button
                              className="btn btn-light btn-sm"
                              data-mdb-toggle="modal"
                              data-mdb-target="#exampleModal"
                              onClick={() => setIdUpdate(ele._id)}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                              onClick={() => deleteTable(ele._id)}
                              className="btn btn-danger btn-sm"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </SideNav>
  );
}
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const token = session.user.image; // trae el token

  const url = process.env.TABLES_URL;
  const dataTables = await getData(token, url);
  return {
    props: { dataTables, session, url },
  };
}
