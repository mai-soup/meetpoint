import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Group from "../types/Group";
import GroupListItem from "../components/GroupListItem";
import LoadingIndicator from "../components/LoadingIndicator";

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  const createGroupList = () => {
    return groups.map((g: Group) => (
      <GroupListItem
        key={g._id}
        title={g.title}
        owner={g.owner.displayName!}
        location={g.location}
        id={g._id}
      />
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
    <div className="w-full flex flex-col items-center justify-center">
      {groups.length == 0 ? <LoadingIndicator /> : createGroupList()}
    </div>
  );
};

export default GroupList;
