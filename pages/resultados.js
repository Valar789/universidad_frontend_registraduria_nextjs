import SideNav from "components/Layout/SideNav";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]";
import { getData } from "helpers/conecctionApi";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


export default function Resultados() {
  const [dataResults, setDataResults] = useState([]);
  const url = "http://127.0.0.1:5000/results";
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const dataBackend = await getData(token, url);
        setDataResults(dataBackend);
      }
    })();
  }, []);

  return (
    <SideNav>
      <div className="container-fluid h-100">
        <div className="row mx-5 d-flex justify-content-center align-items-center">
          {dataResults.length > 1 ? (
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
                    <th>Emblema</th>
                    <th>Nombre</th>
                    <th>Lema</th>
                    <th>Codigo de partido</th>
                    <th>Identificador Unico</th>
                  </tr>
                </thead>
                <tbody>
                  {dataResults.map((ele, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center ">
                          {/* <Image
                            src={ele.logo}
                            alt=""
                            className="imgTableParties"
                          /> */}
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>{ele.name}</p>
                        </div>
                      </td>
                      <td>
                        <p>{ele.lema}</p>
                      </td>

                      <td>
                        <p className="fw-normal mb-1">{ele.codeparties}</p>
                      </td>

                      <td>{ele._id}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button className="btn btn-light btn-sm">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (dataResults.length < 1 &&
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
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
