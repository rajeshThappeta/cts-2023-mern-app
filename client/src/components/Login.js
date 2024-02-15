import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoginLifeCycle } from "../redux/slices/userLoginSlice";

function Login() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onUserLogin = (userCred) => {
    dispatch(userLoginLifeCycle(userCred));
  };

  return (
    <div>
      <h1 className="display-3 text-center text-info">User Login</h1>

      <form
        className="w-50 mx-auto bg-light p-3 mt-5"
        onSubmit={handleSubmit(onUserLogin)}
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

        <button className="btn btn-success d-block mx-auto">Login</button>
      </form>
    </div>
  );
}

export default Login;
