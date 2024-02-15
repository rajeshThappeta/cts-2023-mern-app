import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  let [error, setError] = useState("");

  async function onUserRegister(userObj) {
    try {
      //store in local api
      let res = await axios.post(
        "http://localhost:4000/user-api/user",
        userObj
      );
      if (res.status === 201) {
        //navigate to Login component
        navigate("/login");
      }

      //a user already exsted in API
      else {
        setError(res.data.message);
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


        <button className="btn btn-success d-block mx-auto">Register</button>
      </form>
    </div>
  );
}

export default Register;
