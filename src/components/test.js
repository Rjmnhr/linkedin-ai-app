import React, { useEffect, useState } from "react";
import AxiosInstance from "./axios";

const TestApp = () => {
  const [titleInput, setTitleInput] = useState("");
  const [orgInput, setOrgInput] = useState("");
  const [matchingPercentage, setMatchingPercentage] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    AxiosInstance.get("/api/linkedin/data")
      .then(async (response) => {
        const resultData = await response.data;
        console.log(JSON.stringify(resultData));
        setData(resultData);
      })
      .catch((err) => console.log("error", err));
  }, []);

  const handleSearch = () => {
    const totalProfiles = data.length;
    let matchingProfiles = 0;

    const filteredArr = data.filter((profile) =>
      profile.all_titles.includes(titleInput)
    );
    console.log(
      "🚀 ~ file: test.js:26 ~ handleSearch ~ filteredArr:",
      filteredArr.length
    );

    const percentage = (filteredArr.length / totalProfiles) * 100;
    console.log(
      "🚀 ~ file: test.js:35 ~ handleSearch ~ matchingProfiles:",
      matchingProfiles
    );

    console.log(
      "🚀 ~ file: test.js:39 ~ handleSearch ~ percentage:",
      percentage
    );

    setMatchingPercentage(percentage.toFixed(2));
  };

  return (
    <div>
      <div>
        <label>Title: </label>
        <input
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
      </div>
      <div>
        <label>Organization: </label>
        <input
          type="text"
          value={orgInput}
          onChange={(e) => setOrgInput(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      <div>
        {matchingPercentage > 0 && (
          <p>Matching Percentage: {matchingPercentage}%</p>
        )}
      </div>
    </div>
  );
};

export default TestApp;
