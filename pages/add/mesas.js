import SideNav from "components/Layout/SideNav";
import { createData } from "helpers/conecctionApi";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import {  useState } from "react";

export default function AddMesas({session, url }) {
  const xD = session.user.image;
  const { push } = useRouter();
  
  const [infoMesas, setinfoMesas] = useState({
    cedulasInscritas: "",
    numeroMesas: "",
  });
  const captureValue = (e) => {
    setinfoMesas({
      ...infoMesas,
      [e.target.name]: e.target.value,
    });
  };
  const sendData = async (e) => {
    e.preventDefault();
    const {response} = await createData(xD, url, infoMesas);
    push("/mesas");
    console.log(response);
  };

  return (
    <SideNav>
      <div className="container-fluid h-100 gap-2">
        <div className="row gap-5 mx-5 d-flex justify-content-center align-items-center">
          {/* start form */}
          <form className="col-5 ">
            <h5 className=" my-2">Agregar Mesa</h5>

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
                name="numeroMesas"
                type="text"
                id="form3Example3"
                className="form-control"
                placeholder="Numero de Mesa"
              />
            </div>
       

            <button
              type="submit"
              onClick={sendData}
              className="col-12 btn btn-success"
            >
              Agregar Mesa
            </button>
          </form>
          <div className="col-6 rounded-5 shadow p-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              neque vero quia nemo natus facere dolore repellat magnam placeat
              sequi fugiat maiores distinctio velit, molestias consectetur
              deleniti, voluptas assumenda! Ut. Facere quasi corrupti reiciendis
              modi. Optio voluptate sint, ullam recusandae molestiae eum, est
              adipisci sed quos rem omnis nostrum in. Porro ipsam animi debitis
              beatae aut doloribus ipsum ex delectus! Ex, tempora maxime dolore
              suscipit et magnam praesentium rem. Minus, ad autem totam libero
              vero neque sint eveniet eum sed ex, corrupti laudantium dolor
              voluptatibus aliquid, amet perferendis ipsam laboriosam.
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
  const url = process.env.TABLES_URL;

  return {
    props: { session, url },
  };
}

