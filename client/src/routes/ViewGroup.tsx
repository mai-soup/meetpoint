import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Group from "../types/Group";

const ViewGroup = () => {
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const { groupId } = useParams();

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
  return (
    <div>
      {" "}
      {group ? (
        <>
          <h1>{group.title}</h1> <h2>{group.owner}</h2>
          <h2>{group.location}</h2>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ViewGroup;
