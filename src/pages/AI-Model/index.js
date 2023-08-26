import axios from "axios";
import React, { useEffect, useState } from "react";
import { useApplicationContext } from "../../app-context";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons/lib/icons";
import SimplePieChart from "../../components/pie-charts/progress-chart";
import "./style.css";
// import ProfileBarChart from "../../components/pie-charts/bar-chart";
import { PGDegree, UGDegree } from "../../list-of-degrees/list-of-degree";
import { Progress } from "antd";

function AIModelComponent() {
  const [section, setSection] = useState(1);
  const [numPreviousJobs, setNumPreviousJobs] = useState(1);
  const [numEducationEntries, setNumEducationEntries] = useState(2);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [previousJobs, setPreviousJobs] = useState([]);
  const [educationEntries, setEducationEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const { setDataResults } = useApplicationContext();
  // useEffect(() => {
  //   AxiosInstance.get("/api/linkedin/data")
  //     .then(async (response) => {
  //       const resultData = await response.data;
  //       console.log(resultData);
  //       setLinkedInData(resultData);
  //     })
  //     .catch((err) => console.log("error", err));
  // }, []);

  useEffect(() => {
    setDataResults(null);
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const handlePreviousJobsChange = (event) => {
    setNumPreviousJobs(parseInt(event.target.value, 10));
  };

  const handleEducationEntriesChange = (event) => {
    setNumEducationEntries(parseInt(event.target.value, 10));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handlePreviousJobChange = (index, e) => {
    const updatedPreviousJobs = [...previousJobs];

    if (updatedPreviousJobs.length > index) {
      updatedPreviousJobs[index] = {
        ...updatedPreviousJobs[index], // Preserve existing properties
        [e.target.name]: e.target.value, // Update the specific property
      };
    } else {
      updatedPreviousJobs.push({
        [e.target.name]: e.target.value,
      });
    }

    setPreviousJobs(updatedPreviousJobs);
  };

  const handleEducationEntryChange = (index, e) => {
    // console.log(value);
    const updatedEducationEntries = [...educationEntries];

    if (updatedEducationEntries.length > index) {
      updatedEducationEntries[index] = {
        ...updatedEducationEntries[index], // Preserve existing properties
        [e.target.name]: e.target.value, // Update the specific property
      };
    } else {
      updatedEducationEntries.push({
        [e.target.name]: e.target.value,
      });
    }

    setEducationEntries(updatedEducationEntries);

    console.log(educationEntries);
  };

  const renderPreviousJobSection = () => {
    const previousJobSections = [];
    for (let i = 0; i < numPreviousJobs; i++) {
      // Render input fields for the first two previous jobs
      previousJobSections.push(
        <div key={i}>
          {/* <h4>Previous Job {i + 1}</h4> */}
          <div className="mb-3 col-12 text-start">
            <select
              type="text"
              className="form-control"
              style={{ padding: "5px 27px", color: "#51596c" }}
              id={`experience-${i}`}
              name={`experience`}
              placeholder="Experience"
            >
              <option value={0}>Experience</option>
              <option value="fresher">Fresher</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="3">More than 3 years</option>
              <option value="3">More than 5 years</option>
              <option value="3">More than 10 years</option>
            </select>
          </div>
          <div className="mb-3 col-12 text-start">
            <input
              required
              type="text"
              className="form-control"
              id={`organization-${i}`}
              name={`organization`}
              onChange={(e) => handlePreviousJobChange(i, e)}
              placeholder="organization"
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <input
              required
              type="text"
              className="form-control"
              id={`title-${i}`}
              name={`title`}
              onChange={(e) => handlePreviousJobChange(i, e)}
              placeholder="Title"
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <input
              required
              type="number"
              className="form-control"
              id={`duration-${i}`}
              name={`duration`}
              onChange={(e) => handlePreviousJobChange(i, e)}
              placeholder="Duration in months"
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <input
              required
              type="text"
              className="form-control"
              id={`job_location-${i}`}
              name={`job_location`}
              // onChange={(e) => handlePreviousJobChange(i, e)}
              placeholder="Job location"
            />
          </div>
          {/* <div className="mb-3 col-12 text-start">
            // <input required
              type="text"
              className="form-control"
              id={`emp_count-${i}`}
              name={`emp_count`}
              onChange={(e) => handlePreviousJobChange(i, e)}
              placeholder="Employee count"
            />
          </div>
          <div className="mb-3 col-12 text-start">
            // <input required
              type="text"
              className="form-control"
              id={`industry-${i}`}
              name={`industry`}
              onChange={(e) => handlePreviousJobChange(i, e)}
              placeholder="Industry"
            />
          </div> */}
          <div className="mb-3 col-12 text-start">
            <select
              id="companySize"
              name="companySize"
              className="form-control"
              style={{ padding: "5px 27px", color: "#51596c" }}
            >
              <option>Company size</option>
              <option value="freelancer">Freelancer / Solo Entrepreneur</option>
              <option value="micro">Micro (1-9 employees)</option>
              <option value="small">Small (10-49 employees)</option>
              <option value="medium">Medium (50-249 employees)</option>
              <option value="large">Large (250+ employees)</option>
            </select>
          </div>
          <div className="mb-3 col-12 text-start">
            <select
              id="industrySector"
              name="industrySector"
              className="form-control"
              style={{ padding: "5px 27px", color: "#51596c" }}
            >
              <option>Industry/Sector</option>
              <option value="it">Information Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance and Banking</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="education">Education</option>
              <option value="hospitality">Hospitality and Tourism</option>
              <option value="energy">Energy and Utilities</option>
              <option value="media">Media and Entertainment</option>
              <option value="nonprofit">Non-profit / NGO</option>
              <option value="government">Government</option>
              <option value="other">Other (Specify)</option>
            </select>
          </div>
        </div>
      );
    }
    return <div>{previousJobSections}</div>;
  };

  const renderEducationSection = () => {
    const educationSections = [];

    for (let i = 0; i < numEducationEntries; i++) {
      educationSections.push(
        <div key={i}>
          <h4>
            {i === 0 ? "Under Graduation details " : "Post Graduation details"}
          </h4>
          <div className="mb-3 col-12 text-start">
            {/* <label htmlFor={`institute-${i}`} className="form-label">
              Institute
            </label> */}
            <input
              required
              type="text"
              className="form-control"
              id={`institute-${i}`}
              name={`institute`}
              onChange={(e) => handleEducationEntryChange(i, e)}
              placeholder="Institute"
            />
          </div>
          <div className="mb-3 col-12 text-start  ">
            <select
              className="form-control"
              style={{ padding: "5px 27px", color: "#51596c" }}
              id={`degree-${i}`}
              name={`degree`}
              onChange={(e) => handleEducationEntryChange(i, e)}
              placeholder="Degree"
            >
              <option style={{ color: "#51596c" }}>Degree</option>
              {i === 0
                ? UGDegree.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))
                : PGDegree.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
            </select>
          </div>
          <div className="mb-3 col-12 text-start">
            <input
              required
              type="number"
              className="form-control"
              id={`degree_duration-${i}`}
              name={`degree_duration`}
              onChange={(e) => handleEducationEntryChange(i, e)}
              placeholder="Degree Duration"
            />
          </div>
          {/* Repeat for other fields: degree, duration, etc. */}
        </div>
      );
    }
    return <div>{educationSections}</div>;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (section === 3) {
      handleSubmit();
    } else if (section < 3) {
      setSection(section + 1);
    }
  };

  const handlePrev = () => {
    if (section > 1) {
      console.log("🚀 ~ file: index.js:307 ~ handlePrev ~ section:", section);

      setSection(section - 1);
    }
  };

  const renderSection = () => {
    switch (section) {
      case 1:
        return (
          <div>
            <div class="w-lg-100 text-center mx-lg-auto mb-7">
              <h2>Enter your Personal details</h2>
            </div>
            <div className="mb-3 col-12 text-start">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter"
              />
            </div>
            <div className="mb-3 col-12 text-start">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div class="w-lg-100 text-center mx-lg-auto mb-7">
              <h2>Enter your educational details</h2>
            </div>
            <div className="mb-3 col-12 text-start d-none">
              <label
                htmlFor="numEducationEntry
           "
                className="form-label"
              >
                Number of Education Entries
              </label>
              <select
                className="form-control p-2"
                id="numEducationEntry
             "
                name="numEducationEntry
             "
                onChange={handleEducationEntriesChange}
                value={numEducationEntries}
              >
                <option>Select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            {renderEducationSection()}
          </div>
        );
      case 3:
        return (
          <div>
            <div class="w-lg-100 text-center mx-lg-auto mb-7">
              <h2>Enter your previous job details</h2>
            </div>
            <div className="mb-3 col-12 text-start d-none">
              <label htmlFor="numPreviousJobs" className="form-label">
                Number of Previous Jobs
              </label>
              <input
                required
                type="number"
                className="form-control"
                id="numPreviousJobs"
                name="numPreviousJobs"
                onChange={handlePreviousJobsChange}
                value={numPreviousJobs}
              />
              <select
                type="number"
                className="form-control"
                id="numPreviousJobs"
                name="numPreviousJobs"
                onChange={handlePreviousJobsChange}
                value={numPreviousJobs}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            {renderPreviousJobSection()}
          </div>
        );
      default:
        return <div>Invalid section</div>;
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);

    console.log(JSON.stringify(educationEntries));
    // Process previous jobs
    for (let i = 0; i < previousJobs.length; i++) {
      const job = previousJobs[i];
      formData.append(`org_${i + 1}`, job.organization || "");
      formData.append(`title_${i + 1}`, job.title || "");
      formData.append(`job_${i + 1}_duration`, Number(job.duration) || 1);
      formData.append(`job_${i + 1}_location`, job.job_location || "");
      formData.append(`company_${i + 1}_emp_count`, Number(job.emp_count) || 1);
      formData.append(`company_${i + 1}_industry`, job.industry || "");
    }

    // Process education entries
    for (let i = 0; i < educationEntries.length; i++) {
      const education = educationEntries[i];
      formData.append(`institute_${i + 1}`, education.institute || "");
      formData.append(`degree_${i + 1}`, education.degree || "");
      formData.append(
        `degree_${i + 1}_duration`,
        Number(education.degree_duration) || 1
      );
    }
    axios
      .post("http://localhost:8002/api/ai/run-model", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        const data = await response.data;

        const stringData = data.output;
        const cleanedStringData = stringData.replace(/NaN/g, "null");
        console.log(cleanedStringData);
        const parsedData = JSON.parse(cleanedStringData);
        const stored = await setDataResults(parsedData);
        console.log(stored);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    if (isLoggedIn === "true") {
      navigate("/results");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="d-flex align-items-center"
      style={{ transition: "all 0.3s ease" }}
    >
      <div
        class="container pt-lg-10 pt-5 scrollable-container"
        style={{
          overflowY: "scroll",
          height: "100vh",
          transition: "all 0.3s ease",
        }}
      >
        <div class="row justify-content-lg-center">
          <div class="col-lg-8">
            <div
              class="card card-lg card-bordered shadow-none"
              style={{ padding: "15px", marginBottom: "30px" }}
            >
              <form onSubmit={handleNext}>
                {renderSection()}
                <div class="container mt-3 d-flex gap-3 justify-content-center">
                  {section === 1 ? (
                    ""
                  ) : (
                    <button onClick={handlePrev} class="btn btn-secondary">
                      Previous
                    </button>
                  )}

                  {section !== 3 ? (
                    <button type="submit" class="btn btn-primary">
                      Next
                    </button>
                  ) : (
                    <button type="submit" class="btn btn-primary">
                      {isLoading ? <LoadingOutlined /> : "Check"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {educationEntries ? (
        educationEntries.length > 1 ? (
          <div
            className={`pie-chart-container `}
            style={{ transition: "all 0.3s ease" }}
          >
            <div>
              <SimplePieChart />
            </div>

            <div className="mt-3 mb-3">
              {" "}
              <Progress
                type="circle"
                percent={48}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />
            </div>
            <p>{48}% Profiles are matching</p>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default AIModelComponent;
