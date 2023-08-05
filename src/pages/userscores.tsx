import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserScore = () => {
  const scores = api.score.getUserScores.useQuery();
  const user = useUser();
  const chartData = {
    labels: ["One", "Two", "Three", "Four", "Five", "Six"],
    datasets: [
      {
        label: "Score",
        data: scores.data?.map((score) => score),
        backgroundColor: [
          "#665645",
          "#ffffff",
          "#818384",
          "#b59f3b",
          "#454566",
          "#538d4e",
        ],
      },
    ],
  };
  return (
    <>
      <div className="text-center">
        {user.user?.firstName}, here are your scores:
        <h2 className="mb-3">{`Total: ${scores.data?.length}`}</h2>
        <div className="w-50 mx-auto">
          <Bar
            data={chartData}
            options={{
              indexAxis: "y",
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default UserScore;
