import React from "react";
import { Pie } from "react-chartjs-2";

//This is the pie chart itself
export const PieChart = ({ chartData }) => {
    return (
        <div className="chart-container">
          <h2 className="h3-property-details" style={{ textAlign: "center" }}>Vacancies</h2>
          <Pie
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Current status of vacancies"
                }
              }
            }}
          />
        </div>
      );
}