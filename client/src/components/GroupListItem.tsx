import { FC } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

type GroupListItemProps = {
  title: string;
  owner: string;
  location: string;
  id: string;
};

const GroupListItem: FC<GroupListItemProps> = ({
  title,
  owner,
  location,
  id,
}) => {
  return (
    <Card className="mb-2">
      <Link to={`/groups/${id}`}>
        <h2>{title}</h2>
        <h3 className="text-sm text-light-grey">{location}</h3>
      </Link>
    </Card>
  );
};

export default GroupListItem;
