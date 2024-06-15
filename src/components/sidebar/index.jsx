import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [user, setUser] = useState([])
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
    }

    const fetchData = async () => {
      try {
        if (token) {
          const response = await fetch("http://103.164.54.252:8000/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUser(data);
        } else {
          console.log("Token not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSignIn = () => {
    router.push("/login");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    signOut();
  };

  console.log(router);

  return (
    <div className=" min-h-[90vh] max-h-full w-52 bg-cyan-950 px-6 py-4 flex flex-col justify-between">
      <div className="flex flex-col gap-3">
          {user.role == 'owner' && <Link
          className={
            router.pathname == "/profile" ? "text-slate-300" : "text-slate-500"
          }
          href={"/profile"}
        >
          Profile
        </Link>}
          {user.role == 'admin' && <Link
          className={
            router.pathname.includes("/users") ? "text-slate-300" : "text-slate-500"
          }
          href={"/users"}
        >
          Users
        </Link>}
        <Link
          className={
            router.pathname.includes("/articles") ? "text-slate-300" : "text-slate-500"
          }
          href={"/articles"}
        >
          Articles
        </Link>
      </div>
      <div>
        {!session ? (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md mr-4"
          >
            Log in
          </button>
        ) : (
          <div>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
