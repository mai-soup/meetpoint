import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";
import AuthFormData from "../types/AuthFormData";

const Signup = () => {
  const { register, handleSubmit } = useForm<AuthFormData>({
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
      .then(() => {
        navigate(`/groups`);
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

export default Signup;
