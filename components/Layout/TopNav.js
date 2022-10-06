import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "public/assets/img/logo.png";
import { signOut } from "next-auth/react";
// import the icons you need
import Link from "next/link";
import Image from "next/image";
import logo2 from "public/assets/img/logo2.png";

export default function TopNav({ toggleSideBar, user }) {
  return (
    <nav className="sb-topnav shadow-sm bg-white navbar navbar-expand navbar-ligth bg-ligth">
      <Link href="/">
        <a className="navbar-brand ps-3 ">
          <Image
            className="rounded-circle p-2"
            src={logo}
            alt="Registraduria"
          />
        </a>
      </Link>

      <button
        onClick={toggleSideBar}
        className="btn btn-link  order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Image className="mx-4" src={logo2} alt="Registraduria" />

      <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-md-0">
        <div className="input-group mt-2">
          <p>{user && user.email}</p>
        </div>
      </div>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <Link href="#">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faUser} />
            </a>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link href="#!">
                <a className="dropdown-item">Perfil</a>
              </Link>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link href="#!">
                <a
                  onClick={() => {
                    localStorage.clear();
                    signOut();
                  }}
                  className="dropdown-item"
                >
                  Logout
                </a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
