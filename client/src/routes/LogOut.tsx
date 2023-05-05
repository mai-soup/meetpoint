import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUsersDispatch } from "../context/UsersContext";
import LoadingIndicator from "../components/LoadingIndicator";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useUsersDispatch();

  useEffect(() => {
    axios
      .get("/logout")
      .then(res => {
        // console.log(res);
      })
      .then(() => {
        dispatch!({ type: "loggedOut" });
        navigate("/groups");
      });
  }, []);

  return <LoadingIndicator />;
};

export default LogOut;
