import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "../components/Button";

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
        navigate(`/groups/${id}`);
      });
  };

  return (
    <div>
      <h1>Create Group</h1>
      <form onSubmit={handleSubmission} className="my-4">
        <label>
          Title
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            className="reset"
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
            className="reset"
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
            className="reset"
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
            className="reset"
            onChange={e => {
              setFormData(oldData => ({
                ...oldData,
                owner: e.target.value,
              }));
            }}
          />
        </label>
        <Button submit>Submit</Button>
      </form>
    </div>
  );
};

export default CreateGroup;
