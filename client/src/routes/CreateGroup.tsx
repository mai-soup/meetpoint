import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const CreateGroup = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    owner: "",
  });

  const navigate = useNavigate();

  const handleSubmission = (evt: React.FormEvent) => {
    evt.preventDefault();
    axios
      .post("/groups/new", formData)
      .then(res => res.data)
      .then(id => {
        navigate(`/group/${id}`);
      });
  };

  return (
    <div>
      <h1>Add a group</h1>
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

export default CreateGroup;
