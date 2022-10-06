import SideNav from "components/Layout/SideNav";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { deleteData, getData, updateData } from "helpers/conecctionApi";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Candidatos({ dataCandidates, session, url }) {
  const { push } = useRouter();
  const [idTemp, setiIdTemp] = useState("");

  const xD = session.user.image;

  const [infoCandidatos, setinfoCandidatos] = useState({
    apellido: "",
    cedula: "",
    nombre: "",
    numeroderesolucion: "",
  });

  const captureValue = (e) => {
    setinfoCandidatos({
      ...infoCandidatos,
      [e.target.name]: e.target.value,
    });
  };

  const deleteCandidato = async (id) => {
    const resBackend = await deleteData(xD, url, id);
    push('/candidatos')
    console.log(resBackend.status);
  };

  const updateCandidato = async () => {
    const resBackend = await updateData(xD, url, idTemp, infoCandidatos);
    console.log(resBackend.status);
    push('/candidatos')
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
                Actualizar Candidato
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className=" ">
                <div className="mb-4">
                  <div className="">
                    <input
                      onChange={captureValue}
                      name="nombre"
                      type="text"
                      id="form3Example1"
                      className="form-control"
                      placeholder="Nombre"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="">
                    <input
                      onChange={captureValue}
                      name="apellido"
                      type="text"
                      id="form3Example2"
                      className="form-control"
                      placeholder="Apellido"
                    />
                  </div>
                </div>

                <div className=" mb-4">
                  <input
                    onChange={captureValue}
                    name="cedula"
                    type="text"
                    id="form3Example3"
                    className="form-control"
                    placeholder="Cedula"
                  />
                </div>
                <div className=" mb-4">
                  <input
                    onChange={captureValue}
                    name="numeroderesolucion"
                    type="text"
                    id="form3Example3"
                    className="form-control"
                    placeholder="Numero de resolucion"
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
                  updateCandidato();
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
          {dataCandidates.length > 1 ? (
            <>
              <div className="form-outline mt-4">
                <Link href="/add/candidato">
                  <button className="btn btn-success">Agregar Candidato</button>
                </Link>
              </div>

              <table className="table mx-4 mt-4 table-sm text-center p-4">
                <thead className="bg-light">
                  <tr>
                    <th className="fw-bold">Candidato</th>
                    <th className="fw-bold">Nombre</th>
                    <th className="fw-bold">Apellido</th>
                    <th className="fw-bold">Cedula</th>
                    <th className="fw-bold">Numero de resolución</th>
                    <th className="fw-bold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCandidates.map((ele, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center ">
                          <img
                            src={ele.logo}
                            alt=""
                            className="imgTableCandidates rounded-circle"
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>{ele.nombre}</p>
                        </div>
                      </td>
                      <td>
                        <p>{ele.apellido}</p>
                      </td>

                      <td>
                        <p className="fw-normal mb-1">{ele.cedula}</p>
                      </td>

                      <td className="text-primary">{ele.numeroderesolucion}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-light btn-sm"
                            data-mdb-toggle="modal"
                            data-mdb-target="#exampleModal"
                            onClick={() => setiIdTemp(ele._id)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>

                          <button
                            onClick={() => deleteCandidato(ele._id)}
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
export async function getServerSideProps(context, req, res) {
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

  const url = process.env.CANDIDATES_URL;
  const dataCandidates = await getData(token, url);
  return {
    props: { dataCandidates, session, url },
  };
}
