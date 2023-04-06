import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Group from "../types/Group";

const ViewGroup = () => {
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const { groupId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/group/${groupId}`)
      .then(res => res.data)
      .then(data => {
        setGroup(data);
      })
      .catch(e => {
        console.error("REQUEST ERROR:", e.message);
      });
  }, []);

  const handleDeletion = () => {
    axios.delete(`/group/${groupId}`).then(() => {
      navigate("/groups");
    });
  };

  return (
    <div>
      {group ? (
        <>
          <h1>{group.title}</h1> <h2>{group.owner}</h2>
          <h2>{group.location}</h2>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      <button onClick={handleDeletion}>Delete</button>
      <Link to="/groups">Back to list</Link>
    </div>
  );
};

export default ViewGroup;
