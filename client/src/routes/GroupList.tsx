import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Group from "../types/Group";

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  const createGroupList = () => {
    return groups.map((g: Group) => (
      <li key={g._id}>
        <Link to={`/groups/${g._id}`}>{`${g.title}, ${g.owner}`}</Link>
      </li>
    ));
  };

  useEffect(() => {
    axios
      .get("/groups")
      .then(res => res.data)
      .then(data => setGroups(data))
      .catch(e => {
        console.error("REQUEST ERROR:", e.message);
      });
  }, []);

  return (
    <div>
      {groups.length == 0 ? (
        <p>Loading data...</p>
      ) : (
        <ul>{createGroupList()}</ul>
      )}
    </div>
  );
};

export default GroupList;
