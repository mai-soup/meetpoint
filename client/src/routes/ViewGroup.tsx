import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Group from "../types/Group";

const ViewGroup = () => {
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const { groupId } = useParams();
  const navigate = useNavigate();

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

  const handleDeletion = () => {
    axios.delete(`/group/${groupId}`).then(() => {
      navigate("/groups");
    });
  };

  return (
    <>
      {group ? (
        // <>
        //   <h1>{group.title}</h1> <h2>{group.owner}</h2>
        //   <h2>{group.location}</h2>
        // </>
        <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-dark-grey bg-clip-border shadow-3xl shadow-shadow-500w-full !p-4 3xl:p-![18px]">
          <div className="h-full w-full">
            <div className="relative w-full">
              <img
                src="https://source.unsplash.com/collection/3730086"
                className="mb-3 w-full h-48 object-cover rounded-xl 3xl:h-full 3xl:w-full"
                alt=""
              />
            </div>
            <div className="mb-3 flex flex-row items-center justify-between px-1 md:items-start">
              <div className="mb-2">
                <p className="text-lg font-bold">{group.title}</p>
                <p className="mt-1 text-sm font-medium text-light-grey md:mt-2">
                  By {group.owner}
                </p>
              </div>
              <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
                <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-dark-grey">
                  66
                </span>
                <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png"
                    alt=""
                  />
                </span>
                <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar2.5692c39db4f8c0ea999e.png"
                    alt=""
                  />
                </span>
                <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar3.9f646ac5920fa40adf00.png"
                    alt=""
                  />
                </span>
              </div>
            </div>
            <p className="text-sm pb-4">{group.description}</p>
            <div className="flex items-center justify-between md:items-center lg:justify-between ">
              <div className="flex">
                <p className="!mb-0 text-sm font-bold">
                  <span>69</span> members
                </p>
              </div>
              <Button>Join</Button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      {/* <button onClick={handleDeletion}>Delete</button>
      <Link to="/groups">Back to list</Link> */}
    </>
  );
};

export default ViewGroup;
