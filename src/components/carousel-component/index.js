import React, { useEffect, useState } from "react";
import { Carousel, Radio, Button, Progress, Modal } from "antd";
import { PGDegree, UGDegree } from "../../list-of-degrees/list-of-degree";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { linkedinDataNew } from "../linkedin-data";
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
  const [instituteValues, setInstituteValues] = useState(
    JSON.parse(sessionStorage.getItem("institute")) || []
  );
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
    JSON.parse(sessionStorage.getItem("education_match_percentage")) || []
  );
  const [previousJobMatchPercentages, setPreviousJobMatchPercentages] =
    useState(JSON.parse(sessionStorage.getItem("job_match_percentage")) || []);

  const { setDataResults } = useApplicationContext();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { Panel } = Collapse;
  const [activePanels, setActivePanels] = useState([0]); // Set the panel indexes to open initially

  const degreeDurationOptions = [
    "Less than 1 year",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "Greater than 4 years",
  ];

  const jobDurationOptions = [
    "Less than 1 year",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "Greater than 6 years",
  ];

  useEffect(() => {
    // Retrieve and populate institute values from sessionStorage
    const retrievedInstituteValues = [];
    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`institute_${i}`);
      retrievedInstituteValues.push(value || null);
    }
    setInstituteValues(retrievedInstituteValues);

    const retrievedDegreeValues = [];

    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`degree_${i}`);
      retrievedDegreeValues.push(value || null);
    }
    setDegreeValues(retrievedDegreeValues);

    const retrievedDegreeDurationValues = [];
    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`degree_duration_${i}`);
      retrievedDegreeDurationValues.push(value || null);
    }
    setDurationValues(retrievedDegreeDurationValues);

    const retrievedExperienceValues = [];
    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`experience_${i}`);
      retrievedExperienceValues.push(value || null);
    }
    setExperienceValues(retrievedExperienceValues);

    const retrievedOrganizationValues = [];
    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`organization_${i}`);
      retrievedOrganizationValues.push(value || null);
    }
    setOrganizationValues(retrievedOrganizationValues);

    const retrievedTitleValues = [];
    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`title_${i}`);
      retrievedTitleValues.push(value || null);
    }
    setTitleValues(retrievedTitleValues);

    const retrievedDurationJobValues = [];
    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`job_duration_${i}`);
      retrievedDurationJobValues.push(value || null);
    }
    setDurationValuesJob(retrievedDurationJobValues);

    const retrievedJobLocationValues = [];
    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`job_location_${i}`);
      retrievedJobLocationValues.push(value || null);
    }
    setJobLocationValues(retrievedJobLocationValues);

    const retrievedCompanySizeValues = [];
    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`companySize_${i}`);
      retrievedCompanySizeValues.push(value || null);
    }
    setCompanySizeValues(retrievedCompanySizeValues);

    const retrievedSectorValues = [];
    for (let i = 0; i < numEducationEntries; i++) {
      const value = sessionStorage.getItem(`industrySector_${i}`);
      retrievedSectorValues.push(value || null);
    }
    setSectorValues(retrievedSectorValues);

    // Similarly, retrieve and populate other values from sessionStorage

    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   AxiosInstance.get("/api/linkedin/data")
  //     .then(async (response) => {
  //       const resultData = await response.data;

  //       console.log(JSON.stringify(resultData));
  //       // setDataLinkedIn(resultData);
  //     })
  //     .catch((err) => console.log("error", err));
  // }, []);

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
        sessionStorage.setItem(`institute_${index}`, e.target.value);

        return updatedValues;
      });
    }
    if (e.target.name === "degree") {
      setDegreeValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        sessionStorage.setItem(`degree_${index}`, e.target.value);

        return updatedValues;
      });
    }
    if (e.target.name === "degree_duration") {
      setDurationValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        sessionStorage.setItem(`degree_duration_${index}`, e.target.value);

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
        sessionStorage.setItem(`experience_${index}`, e.target.value);
        return updatedValues;
      });
    }
    if (e.target.name === "organization") {
      setOrganizationValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        sessionStorage.setItem(`organization_${index}`, e.target.value);
        return updatedValues;
      });
    }
    if (e.target.name === "title") {
      setTitleValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        sessionStorage.setItem(`title_${index}`, e.target.value);

        return updatedValues;
      });
    }

    if (e.target.name === "duration") {
      setDurationValuesJob((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        sessionStorage.setItem(`job_duration_${index}`, e.target.value);

        return updatedValues;
      });
    }
    if (e.target.name === "job_location") {
      setJobLocationValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        sessionStorage.setItem(`job_location_${index}`, e.target.value);

        return updatedValues;
      });
    }

    if (e.target.name === "companySize") {
      setCompanySizeValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        sessionStorage.setItem(`companySize_${index}`, e.target.value);

        return updatedValues;
      });
    }

    if (e.target.name === "industrySector") {
      setSectorValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = e.target.value;
        sessionStorage.setItem(`industrySector_${index}`, e.target.value);

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
      linkedinDataNew,
      profileField,
      LoweredValue
    );

    setPreviousJobMatchPercentages((prevMatchPercentages) => {
      const updatedMatchPercentages = [...prevMatchPercentages];
      updatedMatchPercentages[sectionIndex] = {
        ...updatedMatchPercentages[sectionIndex],
        [fieldName]: matchPercentage,
      };

      sessionStorage.setItem(
        "job_match_percentage",
        JSON.stringify(previousJobMatchPercentages)
      );

      return updatedMatchPercentages;
    });
  };

  const handleEducationEntryBlur = (sectionIndex, fieldName, value) => {
    const LoweredValue = value.toLowerCase();

    const profileField = mapFormFieldToProfileField(fieldName); // Implement this mapping

    const matchPercentage = calculateMatchPercentage(
      linkedinDataNew,
      profileField,
      LoweredValue
    );

    setEducationMatchPercentages((prevMatchPercentages) => {
      const updatedMatchPercentages = [...prevMatchPercentages];
      updatedMatchPercentages[sectionIndex] = {
        ...updatedMatchPercentages[sectionIndex],
        [fieldName]: matchPercentage,
      };
      sessionStorage.setItem(
        "education_match_percentage",
        JSON.stringify(educationMatchPercentages)
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

  console.log("check-1", instituteValues);

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
                onBlur={(e) => handleEducationEntryChange(i, e)}
                placeholder="Institute"
                value={instituteValues[i] || null}
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
                value={degreeValues[i] || null}
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
              <select
                required
                className="form-control"
                style={{ padding: "5px 27px", color: "#51596c" }}
                id={`degree_duration-${i}`}
                name={`degree_duration`}
                onChange={(e) => handleEducationEntryChange(i, e)}
                placeholder="Degree Duration"
                value={durationValues[i] || null}
              >
                <option value={0}>Duration</option>
                {degreeDurationOptions.map((data) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
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
      const sectionMatchPercentages = previousJobMatchPercentages[i] || {}; // Default to empty object if not available
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
            <div className="d-lg-flex align-items-center justify-content-center   flex-wrap">
              <div className="mb-3 col-lg-2 col-12 text-start input-container">
                <select
                  type="text"
                  className="form-control"
                  style={{ padding: "5px 27px", color: "#51596c" }}
                  id={`experience-${i}`}
                  name={`experience`}
                  placeholder="Experience"
                  // onBlur={(e) => handlePreviousJobChange(i, e)}
                  value={experienceValues[i] || null}
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
              <div className="mb-3 col-lg-2 col-12 text-start input-container">
                <input
                  required
                  type="text"
                  className="form-control"
                  id={`organization-${i}`}
                  name={`organization`}
                  onBlur={(e) => handlePreviousJobChange(i, e)}
                  placeholder="organization"
                  value={organizationValues[i] || null}
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
              <div className="mb-3 col-lg-2 col-12 text-start input-container">
                <input
                  required
                  type="text"
                  className="form-control"
                  id={`title-${i}`}
                  name={`title`}
                  onBlur={(e) => handlePreviousJobChange(i, e)}
                  placeholder="Title"
                  value={titleValues[i] || null}
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
              <div className="mb-3 col-lg-2 col-12 text-start input-container">
                <select
                  style={{ padding: "5px 27px", color: "#51596c" }}
                  required
                  type="number"
                  className="form-control"
                  id={`duration-${i}`}
                  name={`duration`}
                  onChange={(e) => handlePreviousJobChange(i, e)}
                  placeholder="Duration in months"
                  value={durationValuesJob[i] || null}
                >
                  <option value={0}>Duration</option>
                  {jobDurationOptions.map((data) => (
                    <option value={data}>{data}</option>
                  ))}
                </select>
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
              <div className="mb-3 col-lg-2 col-12 text-start input-container">
                <input
                  required
                  type="text"
                  className="form-control"
                  id={`job_location-${i}`}
                  name={`job_location`}
                  onBlur={(e) => handlePreviousJobChange(i, e)}
                  placeholder="Job location"
                  value={jobLocationValues[i] || null}
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

              <div className="mb-3 col-lg-2 col-12 text-start input-container">
                <select
                  id="companySize"
                  name="companySize"
                  className="form-control"
                  style={{ padding: "5px 27px", color: "#51596c" }}
                  // onBlur={(e) => handlePreviousJobChange(i, e)}
                  value={companySizeValues[i] || null}
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
              <div className="mb-3 col-lg-2 col-12 text-start input-container">
                <select
                  id="industrySector"
                  name="industrySector"
                  className="form-control"
                  style={{ padding: "5px 27px", color: "#51596c" }}
                  onChange={(e) => handlePreviousJobChange(i, e)}
                  value={sectorValues[i] || null}
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
        onBlur={handlePositionChange}
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
          <div class="container-fluid px-5  pt-5 scrollable-container">
            <div class="row justify-content-lg-center">
              <div class="col-lg-12">
                <form onSubmit={handleNext}>{renderPreviousJobSection()}</form>
              </div>
            </div>
          </div>
          <div className="col-12 px-5 text-end">
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
