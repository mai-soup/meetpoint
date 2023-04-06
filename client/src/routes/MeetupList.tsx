import { useState, useEffect } from "react";
import axios from "axios";

type Meetup = {
  title: string;
  description: string;
  author: string;
};

const MeetupList = () => {
  const [meetups, setMeetups] = useState([]);

  const createMeetupList = () => {
    return meetups.map((m: Meetup) => <li>{`${m.title}, ${m.author}`}</li>);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8888/meetups")
      .then(res => res.data)
      .then(data => setMeetups(data))
      .catch(e => {
        console.error("REQUEST ERROR:", e.message);
      });
  }, []);

  return (
    <div>
      {meetups.length == 0 ? (
        <p>Loading data...</p>
      ) : (
        <ul>{createMeetupList()}</ul>
      )}
    </div>
  );
};

export default MeetupList;
