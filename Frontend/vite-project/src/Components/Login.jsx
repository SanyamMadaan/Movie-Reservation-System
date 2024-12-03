import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState("Login");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    try {
      setBtn("Logging in...");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
        {
          email,
          password,
        }
      );

      console.log(response);

      if (response) {
        const token = response.data.token;
        console.log(token);
        navigate('/welcome');
        localStorage.setItem("adminToken", "Bearer " + token);
      } else {
        alert("Invalid Crudentials");
      }
    } catch (error) {
      setBtn("Login");
      console.log(error);
      if (error.response.data.msg) {
        alert(error.response.data.msg);
        return;
      }
      alert("Error while logging in..Please try later");
    }
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold m-10 text-black p-2  ">
        Login as Admin
      </h1>
      <div className="flex justify-center items-center ">
        <div className=" w-full mx-4 sm:mx-8 mt-15  h-fit lg:w-5/12  rounded-lg">
          <form
            className="flex flex-col justify-center items-center lg:mt-0"
            onSubmit={loginUser}
          >
            <input
              className="border-2 border-black sm:p-4 sm:w-1/2 p-4 w-2/3 lg:p-4 lg:w-3/4  rounded-md "
              type="email"
              placeholder="Enter registered email ID"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
              className="border-2 border-black sm:p-4 sm:w-1/2 p-4 w-2/3 lg:p-4 lg:w-3/4  rounded-md mt-4"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button
              className="border-2 border-white bg-black text-white sm:p-4 sm:w-1/2 p-4 w-1/3 lg:p-5 font-semibold lg:w-3/4  rounded-md mt-4"
              type="submit"
            >
              {btn}
            </button>
          </form>
          <div className="flex justify-center items-center">
            <div className="mt-8 border-2 border-black rounded-md p-4  mb-2">
              <div className="font-bold uppercase text-xl">Test Details</div>
              <div>
                <h2>Email : abc@gmail.Com</h2>
                <h2>Password : 12345678</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
