import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const margin = {
  top: 10,
  right: 30,
  left: 0,
  bottom: 0,
};

export const BarCharts = ({ chartData }: any) => {

  return (
    <ResponsiveContainer width="95%" height={100}>
      <BarChart data={chartData} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Test" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Score" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
