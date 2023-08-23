import React from "react";
import { useApplicationContext } from "../../app-context";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.css";

const ResultsPage = () => {
  const { dataResults } = useApplicationContext();
  const customStyle = { width: "200px", textAlign: "start" };
  const capitalizeFirstWord = (inputString) => {
    if (inputString) {
      return (
        inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
      );
    }
  };
  return (
    <>
      <div className="container  py-5  ">
        {dataResults ? (
          <>
            {" "}
            <h2>Top 4 profiles</h2>
            <table style={{ overflowX: "scroll" }}>
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
            </table>
          </>
        ) : (
          <p>
            Please wait your results are loading... <LoadingOutlined />{" "}
          </p>
        )}
      </div>

      <div class="container-fluid p-3 ">
        <h1 className="mb-3  pl-2">
          <span class="gray-text">CAREER</span>{" "}
          <span class="green-text">PATH</span>
        </h1>
        <div class="row mt-4">
          <div
            class="col-md-3 text-center"
            style={{
              display: "grid",
              alignContent: "center",
              justifyItems: "center",
            }}
          >
            <img
              src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1692813339/ytsubozmmwei8pujjlzi.png"
              alt=""
              style={{
                transform: "scaleX(-1)",
                height: "300px",
                width: "200px",
              }}
            />
            {/* <div class="circle">FOUNDER</div> */}

            {/* <div
              class="line"
              style={{
                position: "absolute",

                width: "2px",
                height: "50%",
                backgroundColor: "black",
              }}
            ></div> */}
          </div>
          <div class="col-md-8">
            <div class="row d-flex align-items-center">
              {dataResults
                ? dataResults.map((data) => {
                    return (
                      <>
                        <div className="container d-lg-flex align-items-center">
                          <div div class="col-md-4 mt-8 mt-lg-0  ">
                            <div class="card mb-4 d-inline-block bg-white  d-lg-block shadow-sm p-2  ms-n5">
                              <div class="card-body px-2">
                                <h5 class="card-title">
                                  {data.title_0.toUpperCase()}
                                </h5>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-9 d-flex mt-8 mt-lg-0">
                            <div class="line ">
                              <div class="step-circle">1</div>
                              <div
                                class="path-text"
                                style={{ marginBottom: "100px" }}
                              >
                                {capitalizeFirstWord(data.org_0)}
                              </div>
                            </div>
                            <div class="line">
                              <div class="path-text">
                                {capitalizeFirstWord(data.org_1)}
                              </div>
                              <div class="step-circle">2</div>
                            </div>
                            <div class="line">
                              <div class="step-circle">3</div>
                              <div class="path-text">
                                {" "}
                                {capitalizeFirstWord(data.org_2)}
                              </div>
                            </div>
                            <div class="line">
                              <div class="step-circle">4</div>
                              <div class="path-text">
                                {" "}
                                {capitalizeFirstWord(data.org_3)}
                              </div>
                            </div>
                            {/* <div class="line">
                    <div class="step-circle">5</div>
                    <div class="path-text">HR Leadership</div>
                  </div> */}
                          </div>
                        </div>
                      </>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
