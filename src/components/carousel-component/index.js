import React, { useEffect, useState } from "react";
import { Carousel, Radio, Button, Progress, Modal } from "antd";
import { PGDegree, UGDegree } from "../../list-of-degrees/list-of-degree";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { linkedInData } from "../linkedin-data";
import { useApplicationContext } from "../../app-context";
import AxiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import { Collapse } from "antd";

import "./style.css";

const App = () => {
  const [dotPosition, setDotPosition] = useState("top");
  const [carouselRef, setCarouselRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // eslint-disable-next-line
  const [numEducationEntries, setNumEducationEntries] = useState(2);
  const [numPreviousJobs, setNumPreviousJobs] = useState(1);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [educationEntries, setEducationEntries] = useState([]);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [instituteValues, setInstituteValues] = useState([]);
  const [degreeValues, setDegreeValues] = useState([]);
  const [durationValues, setDurationValues] = useState([]);
  const [experienceValues, setExperienceValues] = useState([]);
  const [organizationValues, setOrganizationValues] = useState([]);
  const [titleValues, setTitleValues] = useState([]);
  const [durationValuesJob, setDurationValuesJob] = useState([]);
  const [jobLocationValues, setJobLocationValues] = useState([]);
  const [companySizeValues, setCompanySizeValues] = useState([]);
  const [sectorValues, setSectorValues] = useState([]);
  const [educationMatchPercentages, setEducationMatchPercentages] = useState(
    []
  );
  const [PreviousJobMatchPercentages, setPreviousJobMatchPercentages] =
    useState([]);
  const { setDataResults } = useApplicationContext();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { Panel } = Collapse;
  const [activePanels, setActivePanels] = useState([0]); // Set the panel indexes to open initially
  //   useEffect(() => {
  //     AxiosInstance.get("/api/linkedin/data")
  //       .then(async (response) => {
  //         const resultData = await response.data;

  //         console.log(resultData);
  //         setDataLinkedIn(resultData);
  //       })
  //       .catch((err) => console.log("error", err));
  //   }, []);

  useEffect(() => {
    setDataResults(null);
    // eslint-disable-next-line
  }, []);

  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  const handleNext = () => {
    if (carouselRef) {
      carouselRef.next();
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (carouselRef && currentSlide > 0) {
      carouselRef.prev();
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleEducationEntryChange = (index, e) => {
    handleEducationEntryBlur(index, e.target.name, e.target.value);
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

    // Update the corresponding state variables for progress bar
    if (e.target.name === "institute") {
      setInstituteValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }
    if (e.target.name === "degree") {
      setDegreeValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }
    if (e.target.name === "degree_duration") {
      setDurationValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }
  };

  const handlePreviousJobChange = (index, e) => {
    handlePreviousJobEntryBlur(index, e.target.name, e.target.value);
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

    // Update the corresponding state variables for progress bar
    if (e.target.name === "experience") {
      setExperienceValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }
    if (e.target.name === "organization") {
      setOrganizationValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }
    if (e.target.name === "title") {
      setTitleValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }

    if (e.target.name === "duration") {
      setDurationValuesJob((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }
    if (e.target.name === "job_location") {
      setJobLocationValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }

    if (e.target.name === "companySize") {
      setCompanySizeValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }

    if (e.target.name === "industrySector") {
      setSectorValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        return updatedValues;
      });
    }
  };

  const handleAddJob = () => {
    setNumPreviousJobs(numPreviousJobs + 1);
  };

  const handleDeleteJob = (index) => {
    const updatedPreviousJobs = [...previousJobs];
    updatedPreviousJobs.splice(index, 1);
    setPreviousJobs(updatedPreviousJobs);
    setNumPreviousJobs(numPreviousJobs - 1);
  };

  const showDeleteConfirmation = (index) => {
    setDeleteConfirmationVisible(true);
    setDeletingIndex(index);
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmationVisible(false);
    setDeletingIndex(null);
  };

  const handleDeleteConfirmed = () => {
    if (deletingIndex !== null) {
      handleDeleteJob(deletingIndex);
    }
    hideDeleteConfirmation();
  };

  const mapFormFieldToProfileField = (formFieldName) => {
    switch (formFieldName) {
      case "institute":
        return "all_instutes";
      case "degree":
        return "all_degree";
      case "degree_duration":
        return "digree_0_duration";
      case "organization":
        return "all_org_cols";
      case "title":
        return "all_titles";
      case "duration":
        return "job_0_duration";
      case "job_location":
        return "all_loc_cols";
      case "companySize":
        return "all_comp_emp_count";
      case "industrySector":
        return "all_comp_ind";

      default:
        return formFieldName;
    }
  };

  const calculateMatchPercentage = (profiles, fieldName, value) => {
    if (
      fieldName === "job_0_duration" ||
      fieldName === "digree_0_duration" ||
      fieldName === "   all_comp_emp_count"
    ) {
      const matchingProfiles = profiles.filter((profile) => {
        // eslint-disable-next-line
        return profile[fieldName] == value;
      });
      const percentage = (matchingProfiles.length / profiles.length) * 100;
      return percentage.toFixed(2); // Round to two decimal places
    } else {
      const matchingProfiles = profiles.filter((profile) => {
        return profile[fieldName].includes(value);
      });
      const percentage = (matchingProfiles.length / profiles.length) * 100;
      return percentage.toFixed(2); // Round to two decimal places
    }
  };

  const handlePreviousJobEntryBlur = (sectionIndex, fieldName, value) => {
    const LoweredValue = value.toLowerCase();

    if (fieldName === "companySize" || fieldName === "experience") return;

    const profileField = mapFormFieldToProfileField(fieldName); // Implement this mapping

    const matchPercentage = calculateMatchPercentage(
      linkedInData,
      profileField,
      LoweredValue
    );

    setPreviousJobMatchPercentages((prevMatchPercentages) => {
      const updatedMatchPercentages = [...prevMatchPercentages];
      updatedMatchPercentages[sectionIndex] = {
        ...updatedMatchPercentages[sectionIndex],
        [fieldName]: matchPercentage,
      };

      return updatedMatchPercentages;
    });
  };

  const handleEducationEntryBlur = (sectionIndex, fieldName, value) => {
    const LoweredValue = value.toLowerCase();
    console.log(
      "🚀 ~ file: index.js:290 ~ handleEducationEntryBlur ~ LoweredValue:",
      LoweredValue
    );
    const profileField = mapFormFieldToProfileField(fieldName); // Implement this mapping
    console.log(
      "🚀 ~ file: index.js:292 ~ handleEducationEntryBlur ~ profileField:",
      profileField
    );

    const matchPercentage = calculateMatchPercentage(
      linkedInData,
      profileField,
      LoweredValue
    );
    console.log(
      "🚀 ~ file: index.js:299 ~ handleEducationEntryBlur ~ matchPercentage:",
      matchPercentage
    );
    setEducationMatchPercentages((prevMatchPercentages) => {
      const updatedMatchPercentages = [...prevMatchPercentages];
      updatedMatchPercentages[sectionIndex] = {
        ...updatedMatchPercentages[sectionIndex],
        [fieldName]: matchPercentage,
      };
      console.log(
        "🚀 ~ file: index.js:307 ~ setEducationMatchPercentages ~ updatedMatchPercentages:",
        updatedMatchPercentages
      );
      return updatedMatchPercentages;
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", "");

    console.log(JSON.stringify(educationEntries));
    // Process previous jobs
    for (let i = 0; i < previousJobs.length; i++) {
      const job = previousJobs[i];
      formData.append(`org_${i + 1}`, job.organization || "");
      formData.append(`title_${i + 1}`, job.title || "");
      formData.append(`job_${i + 1}_duration`, Number(job.duration) || 1);
      formData.append(`job_${i + 1}_location`, job.job_location || "");
      formData.append(`company_${i + 1}_emp_count`, Number(job.emp_count) || 1);
      formData.append(`company_${i + 1}_industry`, job.industrySector || "");
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
    AxiosInstance.post("/api/ai/run-model", formData, {
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
      })
      .catch((err) => {
        console.log(err);
      });

    if (isLoggedIn === "true") {
      navigate("/results");
    } else {
      navigate("/login-app");
    }
  };

  const handlePanelChange = (activeKey) => {
    setActivePanels(activeKey);
  };

  const renderEducationSection = () => {
    const educationSections = [];

    for (let i = 0; i < numEducationEntries; i++) {
      const sectionMatchPercentages = educationMatchPercentages[i] || {}; // Default to empty object if not available
      educationSections.push(
        <div key={i}>
          <h4>
            {i === 0 ? "Under Graduation details " : "Post Graduation details"}
          </h4>
          <div className="d-lg-flex align-items-center justify-content-center mt-5 mb-5 ">
            <div className="mb-3 col-lg-4 col-12 text-start  ">
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
              <div
                style={{
                  visibility: instituteValues[i] ? "visible" : "hidden",
                  paddingTop: "5px", // Adjust as needed
                }}
              >
                <Progress
                  percent={sectionMatchPercentages.institute || 0} // Use match percentage for this field
                  style={{ width: "100%" }}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                />
              </div>
            </div>
            <div className="mb-3 col-lg-4 col-12 text-start  ">
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
              <div
                style={{
                  visibility: degreeValues[i] ? "visible" : "hidden",
                  paddingTop: "5px", // Adjust as needed
                }}
              >
                <Progress
                  percent={sectionMatchPercentages.degree || 0} // Use match percentage for this field
                  style={{ width: "100%" }}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                />
              </div>
            </div>
            <div className="mb-3 col-lg-4 col-12 text-start  ">
              <input
                required
                type="number"
                className="form-control"
                id={`degree_duration-${i}`}
                name={`degree_duration`}
                onChange={(e) => handleEducationEntryChange(i, e)}
                placeholder="Degree Duration"
              />
              <div
                style={{
                  visibility: durationValues[i] ? "visible" : "hidden",
                  paddingTop: "5px", // Adjust as needed
                }}
              >
                <Progress
                  percent={sectionMatchPercentages.degree_duration || 0} // Use match percentage for this field
                  style={{ width: "100%" }}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Repeat for other fields: degree, duration, etc. */}
        </div>
      );
    }
    return <div>{educationSections}</div>;
  };

  const renderPreviousJobSection = () => {
    const previousJobSections = [];
    for (let i = 0; i < numPreviousJobs; i++) {
      // Render input fields for the first two previous jobs
      const sectionMatchPercentages = PreviousJobMatchPercentages[i] || {}; // Default to empty object if not available
      previousJobSections.push(
        <Panel
          class="card card-lg card-bordered shadow-none"
          style={{
            marginBottom: "20px",
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
          }}
          header={<h4 style={{ paddingTop: "10px" }}>Previous Job {i + 1}</h4>}
          key={i}
        >
          <div>
            {/* <h4>Previous Job {i + 1}</h4> */}
            <div className="d-lg-flex align-items-center justify-content-start mt-5 mb-5  flex-wrap">
              <div className="mb-3 col-lg-4 col-12 text-start  ">
                <select
                  type="text"
                  className="form-control"
                  style={{ padding: "5px 27px", color: "#51596c" }}
                  id={`experience-${i}`}
                  name={`experience`}
                  placeholder="Experience"
                  onChange={(e) => handlePreviousJobChange(i, e)}
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
                <div
                  style={{
                    visibility: experienceValues[i] ? "visible" : "hidden",
                    paddingTop: "5px", // Adjust as needed
                  }}
                >
                  <Progress
                    percent={0}
                    style={{ width: "100%" }}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </div>
              <div className="mb-3 col-lg-4 col-12 text-start  ">
                <input
                  required
                  type="text"
                  className="form-control"
                  id={`organization-${i}`}
                  name={`organization`}
                  onChange={(e) => handlePreviousJobChange(i, e)}
                  placeholder="organization"
                />
                <div
                  style={{
                    visibility: organizationValues[i] ? "visible" : "hidden",
                    paddingTop: "5px", // Adjust as needed
                  }}
                >
                  <Progress
                    percent={sectionMatchPercentages.organization || 0} // Use match percentage for this field
                    style={{ width: "100%" }}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </div>
              <div className="mb-3 col-lg-4 col-12 text-start  ">
                <input
                  required
                  type="text"
                  className="form-control"
                  id={`title-${i}`}
                  name={`title`}
                  onChange={(e) => handlePreviousJobChange(i, e)}
                  placeholder="Title"
                />
                <div
                  style={{
                    visibility: titleValues[i] ? "visible" : "hidden",
                    paddingTop: "5px", // Adjust as needed
                  }}
                >
                  <Progress
                    percent={sectionMatchPercentages.title || 0} // Use match percentage for this field
                    style={{ width: "100%" }}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </div>
              <div className="mb-3 col-lg-4 col-12 text-start  ">
                <input
                  required
                  type="number"
                  className="form-control"
                  id={`duration-${i}`}
                  name={`duration`}
                  onChange={(e) => handlePreviousJobChange(i, e)}
                  placeholder="Duration in months"
                />
                <div
                  style={{
                    visibility: durationValuesJob[i] ? "visible" : "hidden",
                    paddingTop: "5px", // Adjust as needed
                  }}
                >
                  <Progress
                    percent={sectionMatchPercentages.duration || 0} // Use match percentage for this field
                    style={{ width: "100%" }}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </div>
              <div className="mb-3 col-lg-4 col-12 text-start  ">
                <input
                  required
                  type="text"
                  className="form-control"
                  id={`job_location-${i}`}
                  name={`job_location`}
                  onChange={(e) => handlePreviousJobChange(i, e)}
                  placeholder="Job location"
                />
                <div
                  style={{
                    visibility: jobLocationValues[i] ? "visible" : "hidden",
                    paddingTop: "5px", // Adjust as needed
                  }}
                >
                  <Progress
                    percent={sectionMatchPercentages.job_location || 0} // Use match percentage for this field
                    style={{ width: "100%" }}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </div>

              <div className="mb-3 col-lg-4 col-12 text-start  ">
                <select
                  id="companySize"
                  name="companySize"
                  className="form-control"
                  style={{ padding: "5px 27px", color: "#51596c" }}
                  onChange={(e) => handlePreviousJobChange(i, e)}
                >
                  <option>Company size</option>
                  <option value="1">Freelancer / Solo Entrepreneur</option>
                  <option value="9">Micro (1-9 employees)</option>
                  <option value="49">Small (10-49 employees)</option>
                  <option value="249">Medium (50-249 employees)</option>
                  <option value="300">Large (250+ employees)</option>
                </select>
                <div
                  style={{
                    visibility: companySizeValues[i] ? "visible" : "hidden",
                    paddingTop: "5px", // Adjust as needed
                  }}
                >
                  <Progress
                    percent={1.69} // Use match percentage for this field
                    style={{ width: "100%" }}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </div>
              <div className="mb-3 col-lg-4 col-12 text-start  ">
                <select
                  id="industrySector"
                  name="industrySector"
                  className="form-control"
                  style={{ padding: "5px 27px", color: "#51596c" }}
                  onChange={(e) => handlePreviousJobChange(i, e)}
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
                <div
                  style={{
                    visibility: sectorValues[i] ? "visible" : "hidden",
                    paddingTop: "5px", // Adjust as needed
                  }}
                >
                  <Progress
                    percent={sectionMatchPercentages.industrySector || 0} // Use match percentage for this field
                    style={{ width: "100%" }}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 text-end">
              {i > 0 && (
                <button
                  className="btn btn-link"
                  onClick={() => showDeleteConfirmation(i)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </Panel>
      );
    }
    return (
      <div>
        <Collapse
          style={{ marginBottom: "20px" }}
          accordion
          onChange={handlePanelChange}
          activeKey={activePanels}
        >
          {previousJobSections}
        </Collapse>
        <Modal
          title="Confirm Deletion"
          visible={deleteConfirmationVisible}
          onOk={handleDeleteConfirmed}
          onCancel={hideDeleteConfirmation}
        >
          Are you sure you want to delete this section?
        </Modal>
      </div>
    );
  };

  return (
    <>
      <Radio.Group
        onChange={handlePositionChange}
        value={dotPosition}
        style={{
          marginBottom: 8,
        }}
      ></Radio.Group>
      <Carousel dotPosition={dotPosition} ref={setCarouselRef}>
        <div
          className="d-flex align-items-center"
          style={{ transition: "all 0.3s ease" }}
        >
          <div class="container-fluid  pt-5 scrollable-container">
            <div class="row justify-content-lg-center">
              <div class="col-lg-8">
                <div
                  class="card card-lg card-bordered shadow-none"
                  style={{ padding: "15px", marginBottom: "30px" }}
                >
                  <form onSubmit={handleNext}>{renderEducationSection()}</form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ transition: "all 0.3s ease" }}>
          <div class="container-fluid  pt-5 scrollable-container">
            <div class="row justify-content-lg-center">
              <div class="col-lg-8">
                <form onSubmit={handleNext}>{renderPreviousJobSection()}</form>
              </div>
            </div>
          </div>
          <div className="col-10 text-end">
            <Button onClick={handleAddJob}>+ Add more</Button>
          </div>
        </div>
      </Carousel>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        {currentSlide > 0 && (
          <button
            className="btn border"
            style={{ marginRight: 8 }}
            onClick={handlePrev}
          >
            <ArrowLeftOutlined />
          </button>
        )}
        {currentSlide < 1 ? (
          <button className="btn btn-primary " onClick={handleNext}>
            Continue
          </button>
        ) : (
          <button className="btn btn-primary " onClick={handleSubmit}>
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default App;
