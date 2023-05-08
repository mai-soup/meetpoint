import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const ViewProfile = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get(`/loggedInUser`)
      .then(res => res.data.user)
      .then(user => setUserData(user));
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {!userData ? (
        <LoadingIndicator />
      ) : (
        <>
          <h1>{userData.displayName || userData.username}</h1>
          <img
            src={userData.avatar ? userData.avatar.url : "/defaultAvatar.png"}
            alt="User Avatar"
          />
          <Link to="/profile/edit">
            <Button secondary>Edit Profile</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ViewProfile;
