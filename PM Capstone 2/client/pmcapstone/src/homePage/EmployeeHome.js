import React, { useEffect, useState } from "react";
import { PieChart } from "./PieChart";
import { getAllProperties } from "../APIManagers/PropertiesManager";
import { Col, Container, Row } from "reactstrap";
//------------------
import Chart from "chart.js/auto"; //These chart imports are necessary
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

//This is the employee landing page. It shows a vacancy report and a pie chart. This was a stretch goal that I had time to execute. First time using chart.js
export const EmployeeHome = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllProperties().then((allProperties) => setProperties(allProperties));
  }, []);

    const totalProperties = properties.length;
    const vacantProperties = properties.filter((property) => property.vacant === true).length;
    const nonVacantProperties = totalProperties - vacantProperties;
    const vacantPercentage = ((vacantProperties / totalProperties) * 100).toFixed();
    const nonVacantPercentage = ((nonVacantProperties / totalProperties) * 100).toFixed();

  const chartData = {
    labels: ["Vacant", "Non-Vacant"],
    datasets: [
      {
        data: [vacantProperties, nonVacantProperties],
        backgroundColor: ["#ed1c24", "#01CC74"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <Container>
          <Row>
            <Col>
              <h1 className="properties-list-header">
                  Welcome back to Property Manager!
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="h3-property-details">Vacancy Report</h3>
              <div className="vacancy-report">
                <p>We have a <i>total of <b>{totalProperties}</b> properties.</i></p>
                <p><b>{nonVacantPercentage}%</b> of the properties are occupied, meaning we have <i><b>{nonVacantProperties}</b> filled properties.</i></p>
                <p><b>{vacantPercentage}%</b> of the properties are vacant, resulting in <i><b>{vacantProperties}</b> vacancy(ies)</i></p>
              </div>
            </Col>
            <Col>
                <PieChart chartData={chartData} />
            </Col>
          </Row>
      </Container>
    </>
  );
};
