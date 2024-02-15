import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {hashSync} from 'bcryptjs'

function Register() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  let [error, setError] = useState("");

  async function onUserRegister(userObj) {
    try {
      //search for duplicate user
      let res1 = await axios.get(
        `http://localhost:4000/users?username=${userObj.username}`
      );
      let usersList = res1.data;
      //if usersList is empty, it means no user existed with same username
      if (usersList.length === 0) {
        //hash the password
        let hashedPassword=hashSync(userObj.password,5)
        //replace plain password with hashed password
        userObj.password=hashedPassword;
        //store in local api
        let res = await axios.post("http://localhost:4000/users", userObj);
        if (res.status === 201) {
          //navigate to Login component
          navigate("/login");
        }
      }
      //a user already exsted in API 
      else {
        setError("User already existed!");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1 className="display-3 text-center text-info">New User Registration</h1>
      {/* http req error message */}
      {error.length !== 0 && (
        <p className="fs-1 text-center text-danger">{error}</p>
      )}
      <form
        className="w-50 mx-auto bg-light p-3 mt-5"
        onSubmit={handleSubmit(onUserRegister)}
      >
        {/* username */}
        <div className="mb-4">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            className="form-control "
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="form-control mb-4"
          />
        </div>

        {/* email */}
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="form-control mb-4"
          />
        </div>

        {/* date of birth */}
        <div className="mb-4">
          <label htmlFor="dob" className="form-label">
            Date of birth
          </label>
          <input
            type="date"
            {...register("dob")}
            className="form-control mb-4"
            placeholder="Username"
          />
        </div>

         {/* dprofile pic*/}
         <div className="mb-4">
          <label htmlFor="profileImg" className="form-label">
            Enter path of profile image
          </label>
          <input
            type="text"
            id="profileImg"
            {...register("profileImg")}
            className="form-control mb-4"
            placeholder="Paste profile image URL here..."
          />
        </div>

        <button className="btn btn-success d-block mx-auto">Register</button>
      </form>
    </div>
  );
}

export default Register;
