import AreaCharts from "../../components/AreaCharts";
import BarCharts from "../../components/BarCharts";
import SimpleAccordion from "../../components/Accordion";
import Ratings from "../../components/Ratings";

export const Dashboard = () => {
  const data = [
    {
      Test: "T1",
      Score: 15,
    },
    {
      Test: "T2",
      Score: 7,
    },
    {
      Test: "T3",
      Score: 20,
    },
    {
      Test: "T4",
      Score: 11,
    },
    {
      Test: "T5",
      Score: 12,
    },
    {
      Test: "T6",
      Score: 16,
    },
    {
      Test: "T7",
      Score: 19,
    },
    {
      Test: "T1",
      Score: 15,
    },
    {
      Test: "T2",
      Score: 7,
    },
    {
      Test: "T3",
      Score: 20,
    },
    {
      Test: "T4",
      Score: 11,
    },
    {
      Test: "T5",
      Score: 12,
    },
    {
      Test: "T6",
      Score: 16,
    },
    {
      Test: "T7",
      Score: 19,
    },
  ];

  const bardata = [
    {
      Test: "Highest Score",
      Score: 15,
    },
    {
      Test: "Latest Score",
      Score: 7,
    },
  ];
  const renderTestPerformance = () => {
    return (
      <SimpleAccordion
        title="Performance"
        children={<AreaCharts chartData={data} />}
      />
    );
  };

  const renderHighScore = () => {
    return (
      <SimpleAccordion
        title="Scoring"
        children={<BarCharts chartData={bardata} />}
      />
    );
  };

  const renderRatings = () => {
    return (
      <SimpleAccordion
        title="Badge"
        children={<Ratings star={0.6} />}
      />
    );
  };
  return (
    <div>
      <br />
      {renderRatings()}
      {renderHighScore()}
      {renderTestPerformance()}
    </div>
  );
};

export default Dashboard;
