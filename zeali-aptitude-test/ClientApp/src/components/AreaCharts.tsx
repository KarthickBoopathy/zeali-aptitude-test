import {
  Area,
  AreaChart,
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

export const AreaCharts = ({ chartData }: any) => {
  return (
    <ResponsiveContainer width="95%" height={100}>
      <AreaChart data={chartData} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="test" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="score" stroke="#f50057" fill="#3f51b5" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaCharts;
