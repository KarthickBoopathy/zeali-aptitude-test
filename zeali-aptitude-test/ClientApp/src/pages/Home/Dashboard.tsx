import AreaCharts from "../../components/AreaCharts";
import BarCharts from "../../components/BarCharts";
import SimpleAccordion from "../../components/Accordion";
import Ratings from "../../components/Ratings";
import { useCallback, useEffect, useState } from "react";
import { getZealiUserInfo } from "../../service/utils";
import { ZealiUsers } from "../../types/schema";
import { useHistory } from "react-router";

export const Dashboard = () => {
  const [userInfo, SetUserInfo] = useState<ZealiUsers>();
  const history = useHistory();
  const NavigateTo = useCallback((path) => history.push(path), [
    history,
  ]);
  useEffect(() => {
    getZealiUserInfo().then((data) => {
      if (data) {
        if (data.errorCode)
          NavigateTo("/Signin");
        else
          SetUserInfo(data)
      }
    });
  }, [NavigateTo]);

  const bardata = [
    {
      Test: "Highest Score",
      Score: userInfo?.highScore,
    },
    {
      Test: "Latest Score",
      Score: userInfo?.latestScore,
    },
  ];
  const renderTestPerformance = () => {
    return (
      <SimpleAccordion
        title="Performance"
        children={<AreaCharts chartData={userInfo?.performance} />}
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
        children={<Ratings star={userInfo?.star ?? 0} />}
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
