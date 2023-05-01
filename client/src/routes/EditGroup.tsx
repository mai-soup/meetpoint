import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";
import GroupFormData from "../types/GroupFormData";

const EditGroup = () => {
  const { register, handleSubmit } = useForm<GroupFormData>({
    defaultValues: async () =>
      axios.get(`/group/${groupId}`).then(res => res.data),
  });
  const onSubmit = (data: GroupFormData) => {
    axios.put(`/group/${groupId}`, data).then(() => {
      navigate(`/groups/${groupId}`);
    });
  };
  const { groupId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit a group</h1>
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

export default EditGroup;
