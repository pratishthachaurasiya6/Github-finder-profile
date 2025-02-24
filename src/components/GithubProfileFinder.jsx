import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const GitHubProfileFinder = () => {
  const [userName, setUserName] = useState("pratishthachaurasiya6");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubProfile("pratishthachaurasiya6");
  }, []);

  const fetchGitHubProfile = async (username) => {
    try {
      setError(null);
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        throw new Error("User not found");
      }
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  const handleSearch = () => {
    fetchGitHubProfile(userName);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <h1 className="text-3xl font-bold text-white mb-6">GitHub Profile Finder</h1>
      <div className="flex gap-2 mb-6 bg-white p-4 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter GitHub username"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 bg-white p-2 rounded-lg shadow-lg">{error}</p>}
      {userData && <GithubUser user={userData} />}
    </div>
  );
};

const GithubUser = ({ user }) => {
  const { avatar_url, followers, following, public_repos, name, login, created_at, bio, company, location } = user;
  const createdData = new Date(created_at);

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center transform transition duration-500 hover:scale-105">
      <img src={avatar_url} alt={login} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg" />
      <h2 className="text-2xl font-semibold text-gray-800">{name || login}</h2>
      <p className="text-gray-600 italic">{bio || "No bio available"}</p>
      <p className="text-gray-700 font-medium">Location: {location || "N/A"}</p>
      <p className="text-gray-700 font-medium">Company: {company || "N/A"}</p>
      <div className="flex justify-around mt-4 text-gray-700">
        <p className="font-semibold">Repos: {public_repos}</p>
        <p className="font-semibold">Followers: {followers}</p>
        <p className="font-semibold">Following: {following}</p>
      </div>
      <p className="text-gray-600 mt-2">Joined: {createdData.toLocaleDateString()}</p>
      <a href={`https://github.com/${login}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-blue-600">Visit Profile</a>
    </div>
  );
};

GithubUser.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    public_repos: PropTypes.number.isRequired,
    name: PropTypes.string,
    login: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    bio: PropTypes.string,
    company: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

export default GitHubProfileFinder;