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

  const passwordValidation = (value: string) => {
    if (!/(?=.*[a-z])/.test(value)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/(?=.*[0-9])/.test(value)) {
      return "Password must contain at least one digit.";
    }
    if (!/(?=.*[!@#\$%\^&\*])/.test(value)) {
      return "Password must contain at least one special character.";
    }
    if (!/(?=.{10,})/.test(value)) {
      return "Password must be at least 10 characters long.";
    }
    if (/(.)\1{2,}/.test(value)) {
      return "Password must not have 3 or more repeating characters in sequence.";
    }
    return true;
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
            {...register("password", {
              required: true,
              validate: passwordValidation,
            })}
            className="reset"
          />
          {errors.password && (
            <ErrorText className="mb-4">{errors.password.message}</ErrorText>
          )}
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
