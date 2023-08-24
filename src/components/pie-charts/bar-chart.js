import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ProfileBarChart = () => {
  const educationData = [
    { educationLevel: "High School", count: 50 },
    { educationLevel: "Bachelor's Degree", count: 120 },
    { educationLevel: "Master's Degree", count: 80 },
    { educationLevel: "PhD", count: 25 },
  ];

  return (
    <BarChart width={600} height={400} data={educationData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="educationLevel" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default ProfileBarChart;
