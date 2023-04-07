import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Boilerplate = () => {
  return (
    <div className="flex flex-col items-center text-off-white bg-darkest-grey h-full min-h-screen">
      <header className="bg-dark-grey py-4 px-4 flex flex-row justify-between w-full items-baseline">
        <Link to="/groups">
          <span className="text-2xl font-bold">
            MeetPoint
            <span className="text-orange-muted">.</span>
          </span>
        </Link>
        <Link to="/groups/create">
          <Button>Create Group</Button>
        </Link>
      </header>
      <div className="grow w-5/6 my-4 flex flex-col items-center">
        <Outlet />
      </div>
      <footer className="bg-dark-grey flex flex-row justify-center items-center py-4 w-full">
        <p>
          Made by{" "}
          <a
            href="https://maijsgarais.com/"
            className="text-orange-muted hover:underline"
          >
            Maijs Garais
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default Boilerplate;
