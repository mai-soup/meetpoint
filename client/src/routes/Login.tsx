import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useUsers, useUsersDispatch } from "../context/UsersContext";
import axios from "axios";
import Button from "../components/Button";
import AuthFormData from "../types/AuthFormData";

const Login = () => {
  const { register, handleSubmit } = useForm<AuthFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const users = useUsers();
  const dispatch = useUsersDispatch();

  const navigate = useNavigate();

  const onSubmit = (data: AuthFormData) => {
    axios
      .post(`/login/`, data)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        dispatch!({
          type: "loggedIn",
          user: { username: data.username, displayName: data.username },
        });
        navigate(`/groups`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <label>
          Username
          <input
            type="text"
            {...register("username", { required: true })}
            className="reset"
          />
        </label>
        <label>
          password
          <input
            type="password"
            {...register("password", { required: true })}
            className="reset"
          />
        </label>
        <Button submit>Submit</Button>
      </form>
    </div>
  );
};

export default Login;
