import SideNav from "components/Layout/SideNav";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import { getData } from "helpers/conecctionApi";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare } from "@fortawesome/free-solid-svg-icons";


export default function Reportes() {
  const [dataReports, setDataReports] = useState([]);

  const url = "http://127.0.0.1:5000/report";
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const dataBackend = await getData(token, url);
        setDataReports(dataBackend);
      }
    })();
  }, []);

  return (
    <SideNav>
      <div className="container-fluid h-100">
        <div className="row mx-5 d-flex justify-content-center align-items-center">
          
          {dataReports.length > 1 ? (
            <>
              <div className="form-outline mt-4">
                <input
                  type="text"
                  className="form-control"
                  id="datatable-search-input"
                />
                <label className="form-label">Buscar por palabra clave</label>
              </div>

              <table className="table mx-4 table-sm text-center p-4">
                <thead className="bg-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Partido</th>
                    <th>Numero de Mesa</th>
                    <th>Cantidad de votos</th>
                    <th>Identificador Unico</th>
                  </tr>
                </thead>
                <tbody>
                  {dataReports.map((ele, index) => (
                    <tr key={index}>
                      <td>
                        <p>{ele.nombre}</p>
                      </td>

                      <td>
                        <p>{ele.partido}</p>
                      </td>

                      <td>
                        <p>{ele.numerodeMesa}</p>
                      </td>

                      <td>
                        <p className="fw-normal mb-1">{ele.cantidadVotos}</p>
                      </td>

                      <td>{ele._id}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-light btn-sm"
                            data-mdb-toggle="modal"
                            data-mdb-target="#exampleModal"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div
              className=" spinner-border text-info d-flex justify-content-center align-items-center"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <div
            className="modal fade mt-10"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-mdb-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary">
                   Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
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
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
