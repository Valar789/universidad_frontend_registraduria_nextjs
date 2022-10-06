import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faRightFromBracket,
  faUsers,
  faHandshake,
  faX,
  faUser,
  faTable,

} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import perfil from "public/assets/img/perfil.png";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MenuSideBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      session && setUser(session.user);
    })();
  }, []);

  return (
    <div className="sb-sidenav-menu ">
      <div className="nav mt-5">
        <div className="d-flex justify-content-between align-items-center mx-4 gap-2 mt-4 w-75 ">
          <Image className="rounded-circle" src={perfil} alt="Perfil" />

          <div className="mt-3">
            <h5>{!user ? "......" : "Hola, " + user.name}</h5>
            <p>Administrador(a)</p>
          </div>
        </div>
        <div className="sb-sidenav-menu-heading mt-2">Administrar</div>
        <Link href="#/">
          <a className="nav-link mx-4 newfocus ">
            <div className="sb-nav-link-icon text-danger">
              <FontAwesomeIcon icon={faX} />
            </div>
            Reportes
          </a>
        </Link>
        <Link href="#!">
          <a className="nav-link mx-4 ">
            <div className="sb-nav-link-icon text-danger">
              <FontAwesomeIcon icon={faX} />
            </div>
            Resultados
          </a>
        </Link>
        <Link href="/candidatos">
          <a className="nav-link mx-4">
            <div className="sb-nav-link-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            Candidatos
          </a>
        </Link>
        <Link href="/partidos">
          <a className="nav-link mx-4">
            <div className="sb-nav-link-icon">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            Partidos
          </a>
        </Link>
        <Link href="/mesas">
          <a className="nav-link mx-4">
            <div className="sb-nav-link-icon">
              <FontAwesomeIcon icon={faTable} />
            </div>
            Mesas
          </a>
        </Link>

        <Link href="/perfil">
          <a className="nav-link mx-4">
            <div className="sb-nav-link-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            Perfil
          </a>
        </Link>

        <Link href="#!">
          <a
            className="nav-link "
            onClick={() => {
              localStorage.clear();
              signOut();
            }}
          >
            <div className="sb-nav-link-icon text-danger">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
            Cerrar Sesion
          </a>
        </Link>
      </div>
    </div>
  );
}
