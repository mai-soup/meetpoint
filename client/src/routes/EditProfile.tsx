import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";
import UserFormData from "../types/UserFormData";
import SwitchInput from "../components/Switch";
import { useEffect, useRef, useState } from "react";

const EditProfile = () => {
  const { register, handleSubmit, watch, setValue, clearErrors } =
    useForm<UserFormData>({
      defaultValues: async () =>
        axios.get(`/loggedInUser`).then(res => {
          const user = res.data.user;

          // Set default values based on the user data from the server
          return {
            displayName: user.displayName,
            location: user.location,
            avatar: createEmptyFileList(),
            removeAvatar: undefined,
          };
        }),
    });
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const [isfileSelected, setIsFileSelected] = useState(false);
  const [shouldDisableUpload, setShouldDisableUpload] = useState(false);

  const removeAvatar = watch("removeAvatar", false);
  const avatar = watch("avatar", undefined);

  const createEmptyFileList = (): FileList => {
    const dataTransfer = new DataTransfer();
    return dataTransfer.files;
  };

  useEffect(() => {
    console.log("Avatar:", avatar);
    console.log("isFileSelected:", isfileSelected);
    const hasFile = avatar && avatar.length > 0;
    setIsFileSelected(hasFile);
  }, [avatar]);

  useEffect(() => {
    if (removeAvatar && avatarInputRef.current) {
      avatarInputRef.current.value = "";
      setValue("avatar", createEmptyFileList());
      clearErrors("avatar");
    }

    setShouldDisableUpload(!!removeAvatar);
  }, [removeAvatar]);

  const onSubmit = (data: UserFormData) => {
    const formData = new FormData();
    formData.append("displayName", data.displayName);
    formData.append("location", data.location);

    const avatarFile = data.avatar.item(0);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    axios
      .put(`/loggedInUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        console.log(res.data);
        navigate(`/profile`);
      });
  };

  const cancelUpload = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
      setValue("avatar", createEmptyFileList());
      clearErrors("avatar");
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <label>
          Display Name
          <input
            type="text"
            {...register("displayName", { required: true })}
            className="reset"
          />
        </label>
        <div className="flex flex-row items-center gap-2">
          <label>
            Avatar
            <input
              type="file"
              {...register("avatar")}
              className="reset"
              multiple={false}
              ref={avatarInputRef}
              disabled={shouldDisableUpload}
              onChange={e => {
                if (e.target.files) {
                  setValue("avatar", e.target.files);
                }
              }}
            />
          </label>
          {isfileSelected && (
            <Button tertiary onClick={cancelUpload}>
              Reset selection
            </Button>
          )}
        </div>
        <SwitchInput
          className="mb-4"
          inputName="shouldRemoveAvatar"
          register={register}
          disabled={isfileSelected}
        >
          ...or delete current avatar without uploading a replacement?
        </SwitchInput>
        <Button submit>Submit</Button>
      </form>
    </div>
  );
};

export default EditProfile;
