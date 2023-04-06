import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const EditGroup = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    owner: "",
  });
  const { groupId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/group/${groupId}`)
      .then(res => res.data)
      .then(data => {
        setFormData(data);
      })
      .catch(err => {
        if (err.response) {
          console.error(err.response.data);
          console.error(err.response.status);
          console.error(err.response.headers);
        } else {
          console.error(err);
        }
      });
  }, []);

  const handleSubmission = (evt: React.FormEvent) => {
    evt.preventDefault();
    axios.put(`/group/${groupId}`, formData).then(() => {
      navigate(`/groups/${groupId}`);
    });
  };

  return (
    <div>
      <h1>Edit a group</h1>
      <form onSubmit={handleSubmission}>
        <label>
          Title
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={e => {
              setFormData(oldData => ({ ...oldData, title: e.target.value }));
            }}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={e => {
              setFormData(oldData => ({
                ...oldData,
                description: e.target.value,
              }));
            }}
          />
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={e => {
              setFormData(oldData => ({
                ...oldData,
                location: e.target.value,
              }));
            }}
          />
        </label>
        <label>
          Owner
          <input
            type="text"
            name="owner"
            id="owner"
            value={formData.owner}
            onChange={e => {
              setFormData(oldData => ({
                ...oldData,
                owner: e.target.value,
              }));
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditGroup;
