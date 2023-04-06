import { useState, useEffect } from "react";
import axios from "axios";

type Group = {
  title: string;
  description: string;
  owner: string;
};

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  const createGroupList = () => {
    return groups.map((g: Group) => <li>{`${g.title}, ${g.owner}`}</li>);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8888/groups")
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
