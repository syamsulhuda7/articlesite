import { useRouter } from "next/router";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

const disableNavbar = ["/login"];

export default function AppShell({ children }) {
  const router = useRouter();
  return (
    <>
      {!disableNavbar.includes(router.pathname) && <Navbar />}
      <div className="flex">
        {!disableNavbar.includes(router.pathname) && <Sidebar />}
        {children}
      </div>
    </>
  );
}
