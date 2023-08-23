import React from "react";
import { useApplicationContext } from "../../app-context";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.css";

const ResultsPage = () => {
  const { dataResults } = useApplicationContext();
  const customStyle = { width: "200px", textAlign: "start" };
  return (
    <>
      <div className="container px-3 py-5 ">
        {dataResults ? (
          <>
            {" "}
            <h2>Top 4 profiles</h2>
            <table
              class="table  table-thead-bordered "
              style={{ overflowX: "scroll" }}
            >
              <thead class="thead-light">
                <tr>
                  <th style={customStyle} scope="col">
                    #
                  </th>
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
        <h1 className="mb-3 text-start pl-5">
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
            <div class="circle">FOUNDER</div>

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
              <div className="container d-flex align-items-center">
                <div div class="col-md-4 ">
                  <div class="card mb-4 d-inline-block bg-white d-none d-lg-block shadow-sm p-2  ms-n5">
                    <div class="card-body px-2">
                      <h5 class="card-title">Employee Relations</h5>
                    </div>
                  </div>
                </div>

                <div class="col-md-9 d-flex">
                  <div class="line ">
                    <div class="step-circle">1</div>
                    <div class="path-text" style={{ marginBottom: "100px" }}>
                      Employee Relations
                    </div>
                  </div>
                  <div class="line">
                    <div class="path-text">
                      Recruitment & Talent Acquisition
                    </div>
                    <div class="step-circle">2</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">3</div>
                    <div class="path-text">Performance Management</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">4</div>
                    <div class="path-text">Learning & Development</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">5</div>
                    <div class="path-text">HR Leadership</div>
                  </div>
                </div>
              </div>
              <div className="container d-flex align-items-center">
                <div div class="col-md-4 ">
                  <div class="card mb-4 d-inline-block bg-white d-none d-lg-block shadow-sm p-2  ms-n5">
                    <div class="card-body px-2">
                      <h5 class="card-title">
                        Recruitment & Talent Acquisition
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="col-md-9 d-flex">
                  <div class="line">
                    <div class="step-circle">1</div>
                    <div class="path-text">Employee Relations</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">2</div>
                    <div class="path-text">
                      Recruitment & Talent Acquisition
                    </div>
                  </div>
                  <div class="line">
                    <div class="step-circle">3</div>
                    <div class="path-text">Performance Management</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">4</div>
                    <div class="path-text">Learning & Development</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">5</div>
                    <div class="path-text">HR Leadership</div>
                  </div>
                </div>
              </div>
              <div className="container d-flex align-items-center">
                <div div class="col-md-4 ">
                  <div class="card mb-4 d-inline-block bg-white d-none d-lg-block shadow-sm p-2  ms-n5">
                    <div class="card-body px-2">
                      <h5 class="card-title">
                        Recruitment & Talent Acquisition
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="col-md-9 d-flex">
                  <div class="line">
                    <div class="step-circle">1</div>
                    <div class="path-text">Employee Relations</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">2</div>
                    <div class="path-text">
                      Recruitment & Talent Acquisition
                    </div>
                  </div>
                  <div class="line">
                    <div class="step-circle">3</div>
                    <div class="path-text">Performance Management</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">4</div>
                    <div class="path-text">Learning & Development</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">5</div>
                    <div class="path-text">HR Leadership</div>
                  </div>
                </div>
              </div>
              <div className="container d-flex align-items-center">
                <div div class="col-md-4 ">
                  <div class="card mb-4 d-inline-block bg-white d-none d-lg-block shadow-sm p-2  ms-n5">
                    <div class="card-body px-2">
                      <h5 class="card-title">
                        Recruitment & Talent Acquisition
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-9 d-flex">
                  <div class="line">
                    <div class="step-circle">1</div>
                    <div class="path-text">Employee Relations</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">2</div>
                    <div class="path-text">
                      Recruitment & Talent Acquisition
                    </div>
                  </div>
                  <div class="line">
                    <div class="step-circle">3</div>
                    <div class="path-text">Performance Management</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">4</div>
                    <div class="path-text">Learning & Development</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">5</div>
                    <div class="path-text">HR Leadership</div>
                  </div>
                </div>
              </div>
              <div className="container d-flex align-items-center">
                <div div class="col-md-4 ">
                  <div class="card mb-4 d-inline-block bg-white d-none d-lg-block shadow-sm p-2  ms-n5">
                    <div class="card-body px-2">
                      <h5 class="card-title">
                        Recruitment & Talent Acquisition
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-9 d-flex">
                  <div class="line">
                    <div class="step-circle">1</div>
                    <div class="path-text">Employee Relations</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">2</div>
                    <div class="path-text">
                      Recruitment & Talent Acquisition
                    </div>
                  </div>
                  <div class="line">
                    <div class="step-circle">3</div>
                    <div class="path-text">Performance Management</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">4</div>
                    <div class="path-text">Learning & Development</div>
                  </div>
                  <div class="line">
                    <div class="step-circle">5</div>
                    <div class="path-text">HR Leadership</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
