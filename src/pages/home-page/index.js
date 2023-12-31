import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/details");
  };

  const jobTitles = [
    "Founder",
    "CEO",
    "Product Manager",
    "VP/P",
    "GM",
    "Partner",
    "Business Analyst",
    "Business Development Manager",
    "Project Manager",
    "Software/Senior Software Engineer",
    "Consultant",
  ];

  return (
    <div>
      <div className="overflow-hidden content-space-t-lg-1">
        <div className="container position-relative  content-space-b-2">
          <div>
            <img
              className="img-fluid "
              height={250}
              width={250}
              src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1692624513/btwkzb24s2odtvrkew12.png"
              alt="na"
            />
            {/* <span className="text-cap">Azkroflyz</span> */}
          </div>

          <div className="w-lg-75 mx-lg-auto">
            <div className="text-center mb-5">
              <h1 className="display-4">Want to be a founder? </h1>
              <p className="text-primary fs-2"> How do you become a founder?</p>
              <p className="fs-3">
                We have interviewed thousands of successful founders and
                reviewed many successful business owners. We have studied
                patterns of success and our Machine Learning based algorithm
                will determine the best career path for you
              </p>
            </div>
          </div>

          <div className="w-lg-65 mx-lg-auto">
            <form>
              <div className="input-card input-card-sm">
                <select
                  id="jobTitleSelect"
                  className="form-control"
                  style={{
                    padding: "1px 27px",
                    color: "#51596c",

                    marginTop: "7px",
                  }}
                >
                  <option value="">What you want to become?</option>
                  {jobTitles.map((title, index) => (
                    <option key={index} value={title}>
                      {title}
                    </option>
                  ))}
                </select>

                {/* <div className="input-card-form">
                  <label
                    for="emailRegisterForm"
                    className="form-label visually-hidden"
                  >
                    Enter email
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="emailRegisterForm"
                    placeholder="Your email"
                    aria-label="Your email"
                  />
                </div> */}
                <button
                  type="button"
                  className="btn btn-primary w-50 btn-lg   "
                  onClick={handleNavigate}
                >
                  Get started
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
