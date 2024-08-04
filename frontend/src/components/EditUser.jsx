import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    getUsersById()
  },[])

  const updateUser = async (e) =>{
    e.preventDefault();
    try{
        await axios.patch(`http://localhost:3000/users/${id}`,{
            nama,
            email,
            gender
        })
        navigate('/')
    } catch (error){
        console.log(error)
    }
  }

  const getUsersById = async () => {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    setNama(response.data.nama);
    setEmail(response.data.email);
    setGender(response.data.gender);
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-2xl mt-20">
        <h2 className="text-center font-semibold text-4xl text-gray-200 my-9">
          Fitur Edit Crud Fullstack JS
        </h2>
        <form onSubmit={updateUser}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nama
            </label>
            <input
              id="nama"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block appearance-none w-full bg-gray-700 border border-gray-600 text-gray-300 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10V7l3-3 3 3v3H7zm6 3v3l-3 3-3-3v-3h6z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
