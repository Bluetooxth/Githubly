import React from "react";
import { useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { IoCodeSharp } from "react-icons/io5";
import { MdOutlineStarBorder } from "react-icons/md";
import { LuHistory } from "react-icons/lu";

const LandingPage = () => {
  const [username, setUsername] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/user/${username}`);
  };

  return (
    <section className="flex justify-center items-start w-full min-h-screen">
      <div className="flex flex-col justify-start items-start gap-10 w-[95vw] lg:w-[75vw] md:w-[85vw] pt-5 pb-5">
        <div className="nav w-full">
          <h1 className="text-3xl font-semibold mb-2">Githubly</h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 w-full p-5 card">
          <h2 className="text-4xl font-semibold">Welcome to Githubly</h2>
          <p className="text-xl font-medium">
            A place where you can find all the information about your favorite
            Github users
          </p>
          <div className="flex justify-center items-center w-full gap-3">
            <input
              type="text"
              placeholder="Github Username"
              autoComplete="false"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 outline-none text-xl font-medium input"
            />
            <button
              className="text-xl px-4 py-2 border-0 searchBtn"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-4xl font-semibold">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start items-stretch gap-5 w-full">
            <div className="flex flex-col justify-start items-start gap-3 p-5 card">
              <LuUser className="text-5xl" />
              <h2 className="text-2xl font-medium">User Info</h2>
              <p className="text-xl font-medium">
                View Detailed Information About Github Users
              </p>
            </div>
            <div className="flex flex-col justify-start items-start gap-3 p-5 card">
              <IoCodeSharp className="text-5xl" />
              <h2 className="text-2xl font-medium">Repositories</h2>
              <p className="text-xl font-medium">
                View User's Repositories and their Details
              </p>
            </div>
            <div className="flex flex-col justify-start items-start gap-3 p-5 card">
              <MdOutlineStarBorder className="text-5xl" />
              <h2 className="text-2xl font-medium">Stats</h2>
              <p className="text-xl font-medium">
                Analyze User's Github Stats and Contributions
              </p>
            </div>
            <div className="flex flex-col justify-start items-start gap-3 p-5 card">
              <LuHistory className="text-5xl" />
              <h2 className="text-2xl font-medium">Commits</h2>
              <p className="text-xl font-medium">
                View User's Recent Commits on Github Repositories
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-5 w-full">
          <h2 className="text-4xl font-semibold">Upcoming Features</h2>
          <div className="flex justify-center items-center p-5 w-full card">
            <h2 className="text-3xl font-medium">COMING SOON</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;