import SideNav from "components/Layout/SideNav";
import { createData } from "helpers/conecctionApi";
import { unstable_getServerSession } from "next-auth";

import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import {  useState } from "react";

export default function AddPartido({ session, url }) {
  const xD = session.user.image;
  const { push } = useRouter();

  const [infoParties, setinfoParties] = useState({
    codeparties: "",
    lema: "",
    logo: "",
    name: "",
  });

  const captureValue = (e) => {
    setinfoParties({
      ...infoParties,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const response = await createData(xD, url, infoParties);
    push("/partidos");
  };

  

  return (
    <SideNav>
      <div className="container-fluid h-100 gap-2">
        <div className="row gap-5 mx-5 d-flex justify-content-center align-items-center">
          {/* start form */}
          <form className="col-5 ">
            <h5 className=" my-2">Agregar Partido</h5>

            <div className="mb-4">
              <div className="">
                <input
                  onChange={captureValue}
                  name="codeparties"
                  type="text"
                  id="form3Example1"
                  className="form-control"
                  placeholder="Codigo del Partido"
                />
              </div>
            </div>
            <div className=" mb-4">
              <input
                onChange={captureValue}
                name="name"
                type="text"
                id="form3Example3"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="mb-4">
              <div className="">
                <input
                  onChange={captureValue}
                  name="lema"
                  type="text"
                  id="form3Example2"
                  className="form-control"
                  placeholder="Lema"
                />
              </div>
            </div>
            <div className=" mb-4">
              <input
                onChange={captureValue}
                name="logo"
                type="text"
                id="form3Example3"
                className="form-control"
                placeholder="Url Logo"
              />
            </div>

            <button
             
              type="submit"
              onClick={sendData}
              className="col-12 btn btn-success"
            >
              Agregar Partido
            </button>
          </form>
          <div className="col-6 rounded-5 shadow p-4">
          <h5>¡Que es el numero de resolucion?</h5>
            <p>            
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit cumque corporis molestias officiis, consequuntur in blanditiis magni pariatur repudiandae accusantium deserunt temporibus error aspernatur commodi, cupiditate libero dolor quis? Natus.consequuntur in blanditiis magni pariatur repudiandae accusantium deserunt temporibus error aspernatur commodi, cupiditate libero dolor quis? Natus.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit cumque corporis molestias officiis, consequuntur in blanditiis magni pariatur 
            </p>
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
        destination: "/login",
        permanent: false,
      },
    };
  }
  const url = process.env.PARTIES_URL;

  return {
    props: { session, url },
  };
}


