import { Outlet } from "react-router";

const Boilerplate = () => {
  return (
    <div className="flex flex-col text-off-white bg-darkest-grey h-full min-h-screen">
      <header className="bg-dark-grey">AYOOOOOO</header>
      <div className="grow">
        <Outlet />
      </div>
      <footer className="bg-dark-grey flex flex-row justify-center items-center py-4">
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
