import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { useState } from "react";
import { signIn } from "next-auth/react";


import TopNavLogin from "components/Layout/TopNavLogin";
import { unstable_getServerSession } from "next-auth";

export default function Login() {
  const { push } = useRouter();

  const [valueInput, setValueInput] = useState({
    //2
    correo: "",
    contrasena: "",
  });

  const simplifyError = (error) => {
    const errorMap = {
      CredentialsSignin: "Correo o contraseña invalidos",
    };
    return errorMap[error] ?? "Correo o contraseña invalidos";
  };

  const [pageState, setPageState] = useState({
    // 4
    error: "",
    processing: false,
  });

  const captureInput = (e) => {
    // 1
    setValueInput({
      ...valueInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuth = async () => {
    //3
    setPageState((old) => ({ ...old, processing: true, error: "" }));
    signIn("credentials", {
      ...valueInput,
      redirect: false,
    })
      .then((response) => {

        if (response.ok) {
          // Authenticate user
          push("/mesas");
        } else {
          setPageState((old) => ({
            ...old,
            processing: false,
            error: response.error,
          }));
        }
      })
      .catch((error) => {
  
        setPageState((old) => ({
          ...old,
          processing: false,
          error: error.message ?? "Something went wrong!",
        }));
      });
  };

  return (
    <>
      <TopNavLogin />
      <div className="container">
        <div className="row vh-100 d-flex justify-content-center align-items-center">

          <div className="row  gap-5 d-flex align-items-center justify-content-center">
            <div className="col-lg-4">
              <div className="">

                {pageState.error !== "" && (
                  <div className="alert alert-danger" role="alert">
                    {simplifyError(pageState.error)}
                  </div>
                )}

              <h2 className="siginh1">Iniciar Sesion</h2>
                <form className="border-0  p-4 ">
                  <div className="mb-4">
                    <label className="d-flex m-0">
                      <p className="text-danger">*</p> Email
                    </label>
                    <input
                      onChange={captureInput}
                      name="correo"
                      type="email"
                      className="form-control m-0"
                      id="idemail"
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label className=" d-flex">
                      <p className="text-danger">*</p> Contraseña
                    </label>
                    <input
                      onChange={captureInput}
                      name="contrasena"
                      type="password"
                      className="form-control"
                      id="idepassword"
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div className="d-grid col-md-12 ">
                    <button
                      color="info"
                      disabled={pageState.processing}
                      onClick={handleAuth}
                      type="submit"
                      className="btn btn-primary shadow mt-4"
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 d-flex  text-primary ">
              La REGISTRADURÍA NACIONAL DE COLOMBIA es una entidad con autonomía
              administrativa, contractual y presupuestal, organizada de manera
              desconcentrada, que tiene a su cargo el registro de la vida civil
              e identificación de los colombianos y la realización de los
              procesos electorales y los mecanismos de participación ciudadana,
              con plenas garantías para los colombianos.
            </div>
          </div>
        </div>
      </div>
    </>
  );

}


export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    return {
      redirect: {
        destination: "/candidatos",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}

