import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = React.useState({});
  const [repos, setRepos] = React.useState([]);
  const [selectedRepo, setSelectedRepo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchUser = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [username]);
  
  const fetchRepos = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepos(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [username]);
  
  React.useEffect(() => {
    fetchUser();
    fetchRepos();
  }, [fetchUser, fetchRepos]);  

  const toggleCommits = async (repo) => {
    if (selectedRepo && selectedRepo.id === repo.id) {
      setSelectedRepo(null);
    } else {
      try {
        setLoading(true);
        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repo.name}/commits`
        );
        setSelectedRepo({ ...repo, commits: commitsResponse.data });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="flex justify-center items-start w-full min-h-screen">
      <div className="flex flex-col justify-start items-start gap-10 w-[95vw] lg:w-[75vw] md:w-[85vw] pt-5 pb-5">
        {loading ? (
          <p className="text-xl font-medium">Loading...</p>
        ) : (
          <div className="flex flex-col justify-start items-start gap-10 w-full">
            <div className="flex flex-col justify-start items-start gap-3 w-full">
              <img
                className="h-36 w-36 rounded-full object-cover"
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
              />
              <h2 className="text-2xl font-medium">{user.name}</h2>
              <p className="text-xl font-medium">{user.bio}</p>
              <div className="flex flex-wrap justify-start items-start gap-3 w-full">
                <p className="text-xl font-medium flex gap-2">
                  Followers:
                  <span className="text-lg  font-medium">{user.followers}</span>
                </p>
                <p className="text-xl font-medium flex gap-2">
                  Following:
                  <span className="text-lg  font-medium">{user.following}</span>
                </p>
                <p className="text-xl font-medium flex gap-2">
                  Public Repos:
                  <span className="text-lg  font-medium">
                    {user.public_repos}
                  </span>
                </p>
                <p className="text-xl font-medium flex gap-2">
                  Location: {user.location || "Not specified"}
                </p>
                <p className="text-xl font-medium flex gap-2">
                  Twitter:
                  <span className="text-lg  font-medium">
                    {user.twitter_username || "Not specified"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-5 w-full">
              <h3 className="text-3xl font-semibold">Repositories:</h3>
              <ul className="grid grid-cols-1 justify-start items-stretch gap-5 w-full">
                {repos.map((repo) => (
                  <li
                    className="flex flex-col justify-start items-start gap-2 w-full p-5 repoCard"
                    key={repo.id}
                  >
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-medium underline"
                    >
                      {repo.name}
                    </a>
                    <p className="text-xl font-medium flex gap-2">
                      Stars:
                      <span className="text-lg  font-medium">
                        {repo.stargazers_count}
                      </span>
                    </p>
                    <p className="text-xl font-medium flex gap-2">
                      Forks:
                      <span className="text-lg  font-medium">
                        {repo.forks_count}
                      </span>
                    </p>
                    <p className="text-xl font-medium flex gap-2">
                      Watchers:
                      <span className="text-lg  font-medium">
                        {repo.watchers_count}
                      </span>
                    </p>
                    <p className="text-xl font-medium flex gap-2">
                      Language:
                      <span className="text-lg  font-medium">
                        {repo.language}
                      </span>
                    </p>
                    <p className="text-xl font-medium flex gap-2">
                      Description:
                      <span className="text-lg  font-medium">
                        {repo.description}
                      </span>
                    </p>
                    <button
                      className="commitBtn px-3 py-2 border-0 text-lg  font-medium"
                      onClick={() => toggleCommits(repo)}
                    >
                      {selectedRepo && selectedRepo.id === repo.id
                        ? "Hide Commits"
                        : "View Commits"}
                    </button>
                    {selectedRepo &&
                      selectedRepo.id === repo.id &&
                      selectedRepo.commits && (
                        <div className="flex flex-col justify-start items-start w-full gap-5">
                          <h4 className="text-2xl font-medium">Commits:</h4>
                          <ul className="flex flex-col justify-start items-start gap-3 w-full">
                            {selectedRepo.commits.map((commit) => (
                              <li
                                className="flex flex-col justify-start items-start gap-2 p-5 repoCommit w-full"
                                key={commit.sha}
                              >
                                <p className="text-xl font-medium flex gap-2">
                                  {commit.commit.message}
                                </p>
                                <p className="text-xl font-medium flex gap-2">
                                  By:
                                  <span className="text-lg  font-medium">
                                    {commit.commit.author.name}
                                  </span>
                                </p>
                                <p className="text-xl font-medium flex gap-2">
                                  Date:
                                  <span className="text-lg  font-medium">
                                    {new Date(
                                      commit.commit.author.date
                                    ).toDateString()}
                                  </span>
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserDetails;