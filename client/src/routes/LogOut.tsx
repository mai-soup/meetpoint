import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUsersDispatch } from "../context/UsersContext";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useUsersDispatch();

  useEffect(() => {
    axios
      .get("/logout")
      .then(res => {
        console.log(res);
      })
      .then(() => {
        dispatch!({ type: "loggedOut" });
        navigate("/groups");
      });
  }, []);

  return (
    <div>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LogOut;
