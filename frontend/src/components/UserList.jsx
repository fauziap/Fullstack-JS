import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`)
      getUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-2xl mt-20">
        <h2 className="text-center font-semibold text-4xl text-gray-200 my-9">
          Membuat Crud Fullstack JS
        </h2>
        <table className="min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-700 border-b border-gray-600">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">
                No
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">
                Nama
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">
                Gender
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray-700 hover:bg-gray-600"
              >
                <td className="py-4 px-6 text-sm text-gray-300">{index + 1}</td>
                <td className="py-4 px-6 text-sm text-gray-300">{user.nama}</td>
                <td className="py-4 px-6 text-sm text-gray-300">
                  {user.email}
                </td>
                <td className="py-4 px-6 text-sm text-gray-300">
                  {user.gender}
                </td>
                <td className="py-4 px-6 text-sm text-gray-300 space-x-2">
                  <Link to={`/edit/${user.id}`}>
                    <button className="py-1 px-3 bg-blue-500 text-white rounded-md text-xs">
                      Edit
                    </button>
                  </Link>
                  <button onClick={()=> deleteUser(user.id)} className="py-1 px-3 bg-red-500 text-white rounded-md text-xs">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <Link to={`/add`}>
            <button className="py-1 px-3 bg-blue-500 mt-5  text-white rounded-md text-xl ">
              Tambahkan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserList;
