import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";
import AuthFormData from "../types/AuthFormData";
import { useUsersDispatch } from "../context/UsersContext";
import ErrorText from "../components/ErrorText";

const Signup = () => {
  const dispatch = useUsersDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: AuthFormData) => {
    axios
      .post(`/signup/`, { user: data })
      .then(res => res.data)
      .then(data => {
        dispatch!({
          type: "loggedIn",
          user: { username: data.username, displayName: data.username },
        });
        navigate(`/groups`);
      })
      .catch(e => {
        if (e.response.status == 422) {
          setError("root.serverError", { message: e.response.data.error });
        } else {
          console.log("AXIOS ERR:", e);
        }
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
          Password
          <input
            type="password"
            {...register("password", { required: true })}
            className="reset"
          />
        </label>
        {errors.root?.serverError && (
          <ErrorText className="mb-4">
            {errors.root.serverError.message}
          </ErrorText>
        )}
        <Button submit>Submit</Button>
      </form>
    </div>
  );
};

export default Signup;
