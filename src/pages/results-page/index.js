import React from "react";
import { useApplicationContext } from "../../app-context";
import { LoadingOutlined } from "@ant-design/icons";

const ResultsPage = () => {
  const { dataResults } = useApplicationContext();
  const customStyle = { width: "200px", textAlign: "start" };
  return (
    <div className="container px-3 py-5">
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
  );
};

export default ResultsPage;
