import TopNav from "./TopNav";
import { useEffect, useRef, useState } from "react";
import MenuSideBar from "./MenuSideBar";
import { getSession } from "next-auth/react";

export default function SideNav({ children }) {
  const sidebar = useRef();
  const [user, setUser] = useState(null);

  const getData_setToken = async () => {
      const session = await getSession();
      session && setUser(session.user);
      localStorage.setItem("token", session.user.image)
    
  }

  useEffect(() => {
      getData_setToken()
  }, []);

  const toggleSideBar = (e) => {
    e.preventDefault();
    sidebar.current.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      sidebar.current.classList.contains("sb-sidenav-toggled")
    );
  };

  return (
    <div ref={sidebar}>
      <TopNav toggleSideBar={toggleSideBar} user={user} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion shadow" id="sidenavAccordion">
            <MenuSideBar />
          </nav>
        </div>
        <div
          id="layoutSidenav_content"
          className="h-100 mt-5 d-flex justify-content-center align-items-center"
        >
          <main className="h-100 container-fluid mt-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
