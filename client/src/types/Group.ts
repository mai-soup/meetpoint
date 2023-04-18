import { User } from "./User";

type Group = {
  title: string;
  description: string;
  owner: User;
  location: string;
  _id: string;
};

export default Group;
