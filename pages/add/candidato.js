import SideNav from "components/Layout/SideNav";
import { createData } from "helpers/conecctionApi";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useState } from "react";

export default function AddCandidatos({ session, url }) {
  const xD = session.user.image;
  const { push } = useRouter();
  const [infoCandidatos, setinfoCandidatos] = useState({
    apellido: "",
    cedula: "",
    nombre: "",
    numeroderesolucion: "",
    logo: ""
  });

  const captureValue = (e) => {
    setinfoCandidatos({
      ...infoCandidatos,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const {response} = await createData(xD, url, infoCandidatos);
    push("/candidatos");
    console.log(response);
  };

  return (   
    <SideNav>
      <div className="container-fluid h-100 gap-2">
        <div className="row gap-5 mx-5 d-flex justify-content-center align-items-center">
          <form className="col-5 ">
            <h5 className=" my-2">Agregar Candidato</h5>
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
            <div className=" mb-4">
              <input
                onChange={captureValue}
                name="logo"
                type="text"
                id="form3Example3"
                className="form-control"
                placeholder="Foto"
              />
            </div>
            <button
              type="submit"
              onClick={sendData}
              className="col-12 btn btn-success"
            >
              Agregar Candidato
            </button>
          </form>
          <div className="col-6 rounded-5 shadow p-4">
            <h5>¡Que es el numero de resolucion?</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
              cumque corporis molestias officiis, consequuntur in blanditiis
              magni pariatur repudiandae accusantium deserunt temporibus error
              aspernatur commodi, cupiditate libero dolor quis?
              Natus.consequuntur in blanditiis magni pariatur repudiandae
              accusantium deserunt temporibus error aspernatur commodi,
              cupiditate libero dolor quis? Natus. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Odit cumque corporis molestias
              officiis, consequuntur in blanditiis magni pariatur
            </p>
          </div>
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

  const url = process.env.CANDIDATES_URL;
  return {
    props: { session, url },
  };
}
