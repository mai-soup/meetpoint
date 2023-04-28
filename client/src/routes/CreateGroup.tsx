import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";
import GroupFormData from "../types/GroupFormData";

const CreateGroup = () => {
  const { register, handleSubmit } = useForm<GroupFormData>({
    defaultValues: {
      title: "",
      location: "",
      description: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: GroupFormData) => {
    axios
      .post(`/groups/new/`, data)
      .then(res => res.data)
      .then(id => {
        navigate(`/groups/${id}`);
      });
  };

  return (
    <div>
      <h1>Create Group</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <label>
          Title
          <input
            type="text"
            {...register("title", { required: true })}
            className="reset"
          />
        </label>
        <label>
          Description
          <input
            type="text"
            {...register("description", { required: true })}
            className="reset"
          />
        </label>
        <label>
          Location
          <input
            type="text"
            {...register("location", { required: true })}
            className="reset"
          />
        </label>
        <Button submit>Submit</Button>
      </form>
    </div>
  );
};

export default CreateGroup;
