import React from "react";
import { useApplicationContext } from "../../app-context";
import "./style.css";
import { Divider } from "antd";

const ResultsPage = () => {
  const { dataResults } = useApplicationContext();

  const capitalizeFirstWord = (inputString) => {
    if (inputString) {
      return (
        inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
      );
    }
  };

  console.log("dataResults", dataResults);
  return (
    <>
      <div
        className="container-fluid px-lg-8 px-3  py-5  "
        style={{ height: "100vh" }}
      >
        {dataResults ? (
          <>
            {" "}
            {/* <h2>Top 4 profiles</h2> */}
            {/* <table style={{ overflowX: "scroll" }}>
              <thead>
                <tr>
                  <th style={customStyle}>#</th>
                  <th style={customStyle} scope="col">
                    Name
                  </th>
                  <th style={customStyle} scope="col">
                    Location
                  </th>
                  <th style={customStyle} scope="col">
                    Organization 1
                  </th>
                  <th style={customStyle} scope="col">
                    Title 1
                  </th>
                  <th style={customStyle} scope="col">
                    Job duration 1
                  </th>
                  <th style={customStyle} scope="col">
                    Job Location 1
                  </th>
                  <th style={customStyle} scope="col">
                    Organization 2
                  </th>
                  <th style={customStyle} scope="col">
                    Title 2
                  </th>
                  <th style={customStyle} scope="col">
                    Job duration 2
                  </th>
                  <th style={customStyle} scope="col">
                    Job Location 2
                  </th>
                  <th style={customStyle} scope="col">
                    Skill 1
                  </th>
                  <th style={customStyle} scope="col">
                    Skill 2
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataResults
                  ? dataResults.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td style={customStyle}>{data.name}</td>
                            <td style={customStyle}>{data.location}</td>
                            <td style={customStyle}>{data.org_0}</td>
                            <td style={customStyle}>{data.title_0}</td>
                            <td style={customStyle}>{data.job_0_duration}</td>
                            <td style={customStyle}>{data.job_0_location}</td>
                            <td style={customStyle}>{data.org_1}</td>
                            <td style={customStyle}>{data.title_1}</td>
                            <td style={customStyle}>{data.job_1_duration}</td>
                            <td style={customStyle}>{data.job_1_location}</td>
                            <td style={customStyle}>{data.skill_0}</td>
                            <td style={customStyle}>{data.skill_1}</td>
                          </tr>
                        </>
                      );
                    })
                  : ""}
              </tbody>
            </table> */}
            <div class="container-fluid p-3 ">
              <h1
                className="mb-10 text-lg-start text-center  container-fluid "
                style={{ marginLeft: "-32px" }}
              >
                <span style={{ borderBottom: "8px solid #008000" }}>
                  {" "}
                  TOP 4 PROFILE
                </span>{" "}
                <span class="gray-text">CAREER</span>{" "}
                <span class="green-text">PATH</span>
              </h1>

              {dataResults.map((data) => {
                return (
                  <>
                    <div class="row mt-4">
                      <div
                        class="col-md-3 text-center"
                        style={{
                          display: "grid",
                          alignContent: "center",
                          justifyItems: "center",
                        }}
                      >
                        <div class="circle mb-4 mb-lg-0">
                          {data.title_0.toUpperCase()}
                        </div>
                      </div>
                      <div class="col-md-9">
                        <div class="row d-flex align-items-center">
                          <div className="container d-lg-flex align-items-center mb-4">
                            <div class="col-md-4">
                              <div
                                class="card mb-4 "
                                style={{
                                  background: "#7a111c",
                                }}
                              >
                                <div class="card-body">
                                  <h5 class="card-title">Education</h5>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-9 d-flex mt-8 mt-lg-0">
                              <div class="line-1">
                                <div class="step-circle-1">1</div>
                                <div
                                  class="path-text"
                                  style={{ marginBottom: "100px" }}
                                >
                                  {capitalizeFirstWord(data.digree_0)}
                                </div>
                              </div>
                              <div class="line-1">
                                <div class="path-text">
                                  {capitalizeFirstWord(data.digree_1)}
                                </div>
                                <div class="step-circle-1">2</div>
                              </div>
                              <div class="line-1">
                                <div class="step-circle-1">3</div>
                                <div class="path-text">
                                  {" "}
                                  {capitalizeFirstWord(data.digree_2)}
                                </div>
                              </div>
                              <div class="line-1">
                                <div class="step-circle-1">4</div>
                                <div class="path-text">
                                  {" "}
                                  {capitalizeFirstWord(data.digree_3)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="container d-lg-flex align-items-center mb-4">
                            <div class="col-md-4">
                              <div
                                class="card mb-4 "
                                style={{
                                  background: "#660861",
                                }}
                              >
                                <div class="card-body">
                                  <h5 class="card-title">Previous Jobs</h5>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-9 d-flex mt-8 mt-lg-0">
                              <div class="line-2 ">
                                <div class="step-circle-2">1</div>
                                <div
                                  class="path-text"
                                  style={{ marginBottom: "100px" }}
                                >
                                  {capitalizeFirstWord(data.title_1)}
                                </div>
                              </div>
                              <div class="line-2">
                                <div class="path-text">
                                  {capitalizeFirstWord(data.org_1)}
                                </div>
                                <div class="step-circle-2">2</div>
                              </div>
                              <div class="line-2">
                                <div class="step-circle-2">3</div>
                                <div class="path-text">
                                  {" "}
                                  {capitalizeFirstWord(data.title_2)}
                                </div>
                              </div>
                              <div class="line-2">
                                <div class="step-circle-2">4</div>
                                <div class="path-text">
                                  {" "}
                                  {capitalizeFirstWord(data.title_3)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="container d-lg-flex align-items-center mb-4">
                            <div class="col-md-4">
                              <div
                                class="card mb-4 "
                                style={{
                                  background: "#c96d0a",
                                }}
                              >
                                <div class="card-body">
                                  <h5 class="card-title">Institutes</h5>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-9 d-flex mt-8 mt-lg-0">
                              <div class="line-3 ">
                                <div class="step-circle-3">1</div>
                                <div
                                  class="path-text"
                                  style={{ marginBottom: "100px" }}
                                >
                                  {capitalizeFirstWord(data.institute_0)}
                                </div>
                              </div>
                              <div class="line-3">
                                <div class="path-text">
                                  {capitalizeFirstWord(data.institute_1)}
                                </div>
                                <div class="step-circle-3">2</div>
                              </div>
                              <div class="line-3">
                                <div class="step-circle-3">3</div>
                                <div class="path-text">
                                  {" "}
                                  {capitalizeFirstWord(data.institute_2)}
                                </div>
                              </div>
                              <div class="line-3">
                                <div class="step-circle-3">4</div>
                                <div class="path-text">
                                  {" "}
                                  {capitalizeFirstWord(data.institute_3)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="container d-lg-flex align-items-center mb-4">
                            <div class="col-md-4">
                              <div
                                class="card mb-4"
                                style={{
                                  background: "#324957",
                                }}
                              >
                                <div class="card-body">
                                  <h5 class="card-title">Skills</h5>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-9 d-flex mt-8 mt-lg-0">
                              <div class="line-4 ">
                                <div class="step-circle-4">1</div>
                                <div
                                  class="path-text"
                                  style={{ marginBottom: "100px" }}
                                >
                                  {capitalizeFirstWord(data.skill_0)}
                                </div>
                              </div>
                              <div class="line-4">
                                <div class="path-text">
                                  {capitalizeFirstWord(data.skill_1)}
                                </div>
                                <div class="step-circle-4">2</div>
                              </div>
                              <div class="line-4">
                                <div class="step-circle-4">3</div>
                                <div class="path-text">
                                  {" "}
                                  {capitalizeFirstWord(data.skill_2)}
                                </div>
                              </div>
                              <div class="line-4">
                                <div class="step-circle-4">4</div>
                                <div class="path-text">
                                  {" "}
                                  {capitalizeFirstWord(data.skill_3)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Divider />
                  </>
                );
              })}
              <h2 className="container-fluid text-lg-start text-center mb-3">
                TOP SKILLS NEEDED
              </h2>
              {dataResults.map((profile) => (
                <p className="fs-3 container-fluid text-lg-start text-center">
                  {capitalizeFirstWord(profile.skill_0)}
                </p>
              ))}
            </div>
          </>
        ) : (
          <>
            <div class="wrap container">
              <img
                src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1692813339/ytsubozmmwei8pujjlzi.png"
                alt=""
                style={{
                  transform: "scaleX(-1)",
                  height: "300px",
                  width: "200px",
                }}
              />

              <div
                class="loading "
                style={{ display: "grid", placeItems: "center" }}
              >
                <div class="loader ">
                  <div class="loader__bar"></div>
                  <div class="loader__bar"></div>
                  <div class="loader__bar"></div>
                  <div class="loader__bar"></div>
                  <div class="loader__bar"></div>
                  <div class="loader__ball"></div>
                </div>
                <br />
                <p class="fw-bold text">
                  We are fetching the matching profiles
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ResultsPage;
