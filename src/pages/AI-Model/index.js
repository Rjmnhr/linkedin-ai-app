import axios from "axios";
import React, { useState } from "react";
import { useApplicationContext } from "../../app-context";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons/lib/icons";

function AIModelComponent() {
  const [section, setSection] = useState(1);
  const [numPreviousJobs, setNumPreviousJobs] = useState(0);
  const [numEducationEntries, setNumEducationEntries] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [previousJobs, setPreviousJobs] = useState([]);
  const [educationEntries, setEducationEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setDataResults } = useApplicationContext();
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
          <h4>Previous Job {i + 1}</h4>
          <div className="mb-3 col-12 text-start">
            <label htmlFor={`organization-${i}`} className="form-label">
              Organization
            </label>
            <input
              type="text"
              className="form-control"
              id={`organization-${i}`}
              name={`organization`}
              onChange={(e) => handlePreviousJobChange(i, e)}
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <label htmlFor={`title-${i}`} className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id={`title-${i}`}
              name={`title`}
              onChange={(e) => handlePreviousJobChange(i, e)}
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <label htmlFor={`duration-${i}`} className="form-label">
              Duration in months
            </label>
            <input
              type="text"
              className="form-control"
              id={`duration-${i}`}
              name={`duration`}
              onChange={(e) => handlePreviousJobChange(i, e)}
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <label htmlFor={`job_location-${i}`} className="form-label">
              Job location
            </label>
            <input
              type="text"
              className="form-control"
              id={`job_location-${i}`}
              name={`job_location`}
              onChange={(e) => handlePreviousJobChange(i, e)}
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <label htmlFor={`emp_count-${i}`} className="form-label">
              Employee count
            </label>
            <input
              type="text"
              className="form-control"
              id={`emp_count-${i}`}
              name={`emp_count`}
              onChange={(e) => handlePreviousJobChange(i, e)}
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <label htmlFor={`industry-${i}`} className="form-label">
              Industry
            </label>
            <input
              type="text"
              className="form-control"
              id={`industry-${i}`}
              name={`industry`}
              onChange={(e) => handlePreviousJobChange(i, e)}
            />
          </div>
          {/* Other input fields */}
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
          <h4>Education Entry {i + 1}</h4>
          <div className="mb-3 col-12 text-start">
            <label htmlFor={`institute-${i}`} className="form-label">
              Institute
            </label>
            <input
              type="text"
              className="form-control"
              id={`institute-${i}`}
              name={`institute`}
              onChange={(e) => handleEducationEntryChange(i, e)}
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <label htmlFor={`degree-${i}`} className="form-label">
              Degree
            </label>
            <input
              type="text"
              className="form-control"
              id={`degree-${i}`}
              name={`degree`}
              onChange={(e) => handleEducationEntryChange(i, e)}
            />
          </div>
          <div className="mb-3 col-12 text-start">
            <label htmlFor={`degree_duration-${i}`} className="form-label">
              Degree Duration
            </label>
            <input
              type="text"
              className="form-control"
              id={`degree_duration-${i}`}
              name={`degree_duration`}
              onChange={(e) => handleEducationEntryChange(i, e)}
            />
          </div>
          {/* Repeat for other fields: degree, duration, etc. */}
        </div>
      );
    }
    return <div>{educationSections}</div>;
  };

  const handleNext = () => {
    if (section < 3) {
      setSection(section + 1);
    }
  };

  const handlePrev = () => {
    if (section > 1) {
      setSection(section - 1);
    }
  };

  const renderSection = () => {
    switch (section) {
      case 1:
        return (
          <div>
            <div className="mb-3 col-12 text-start">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-3 col-12 text-start">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={location}
                onChange={handleLocationChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-3 col-12 text-start">
              <label htmlFor="numPreviousJobs" className="form-label">
                Number of Previous Jobs
              </label>
              <input
                type="number"
                className="form-control"
                id="numPreviousJobs"
                name="numPreviousJobs"
                onChange={handlePreviousJobsChange}
                value={numPreviousJobs}
              />
            </div>
            {renderPreviousJobSection()}
          </div>
        );
      case 3:
        return (
          <div>
            <div className="mb-3 col-12 text-start">
              <label
                htmlFor="numEducationEntry
              "
                className="form-label"
              >
                Number of Education Entries
              </label>
              <input
                type="number"
                className="form-control"
                id="numEducationEntry
                "
                name="numEducationEntry
                "
                onChange={handleEducationEntriesChange}
                value={numEducationEntries}
              />
            </div>
            {renderEducationSection()}
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
      formData.append(`org_${i + 1}`, previousJobs[i].organization);
      formData.append(`title_${i + 1}`, previousJobs[i].title);
      formData.append(`job_${i + 1}_duration`, previousJobs[i].duration);
      formData.append(`job_${i + 1}_location`, previousJobs[i].job_location);
      formData.append(`company_${i + 1}_emp_count`, previousJobs[i].emp_count);
      formData.append(`company_${i + 1}_industry`, previousJobs[i].industry);
    }

    // Process education entries
    for (let i = 0; i < educationEntries.length; i++) {
      formData.append(`institute_${i + 1}`, educationEntries[i].institute);
      formData.append(`degree_${i + 1}`, educationEntries[i].degree);
      formData.append(
        `degree_${i + 1}_duration`,
        educationEntries[i].degree_duration
      );
    }

    axios
      .post("https://backend.2ndstorey.com/api/ai/run-model", formData, {
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
        navigate("/results");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="container pt-lg-10 pt-5 ">
      <div class="w-lg-65 text-center mx-lg-auto mb-7">
        <h2>Enter your profile details</h2>
      </div>

      <div class="row justify-content-lg-center">
        <div class="col-lg-8">
          <div class="card card-lg card-bordered shadow-none">
            <div class="card-body">
              <form>{renderSection()}</form>
              <div className="container mt-3 d-flex gap-3 justify-content-center">
                {section === 1 ? (
                  ""
                ) : (
                  <button onClick={handlePrev} className="btn btn-secondary">
                    Previous
                  </button>
                )}

                {section !== 3 ? (
                  <button onClick={handleNext} className="btn btn-primary">
                    Next
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="btn btn-primary">
                    {isLoading ? <LoadingOutlined /> : "Check"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIModelComponent;
