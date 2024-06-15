import EditUserPopup from "@/components/edit-user-popup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [editPopUp, setEditPopUp] = useState(false);
  const [hit, setHit] = useState(0);

  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data?.user?.username != 'admin') {
        router.push('/articles')
    }

    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://103.164.54.252:8000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [editPopUp, hit]);

  const handleEdit = (userId) => {
    setEditPopUp(true);
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://103.164.54.252:8000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };

  const handleDelete = (userId) => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.delete(
          `http://103.164.54.252:8000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setHit((x) => x + 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const yes = confirm("Yakin ingin menghapus data?");
    if (yes) {
      fetchData();
    }
  };

  return (
    <>
      {editPopUp && <EditUserPopup onClose={setEditPopUp} sendUser={user} />}
      <div className="bg-slate-200 w-full p-6">
        <table className="table-auto w-fit">
          <thead>
            <tr className="bg-slate-300">
              <th className="table-border">No</th>
              <th className="table-border">Fullname</th>
              <th className="table-border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="bg-white">
                <td className="table-border">{index + 1}</td>
                <td className="table-border">{`${user.first_name} ${user.last_name}`}</td>
                <td className="table-border flex items-center justify-center gap-5">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md mr-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
