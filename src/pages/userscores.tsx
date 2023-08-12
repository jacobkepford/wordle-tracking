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
import { LoadingSpinner } from "~/components/loadingSpinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserScore = () => {
  const { data: scores, isLoading } = api.score.getUserScores.useQuery();
  const total = scores ? scores.reduce((acc, curr) => acc + curr, 0) : 0;
  const user = useUser();
  const chartData = {
    labels: ["One", "Two", "Three", "Four", "Five", "Six"],
    datasets: [
      {
        label: "Score",
        data: scores?.map((score) => score),
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
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="mt-4 text-center">
          {user.user?.firstName}, here are your scores:
          <h2 className="mb-3">{`Total: ${total}`}</h2>
          <div className="mx-auto h-3/6 w-3/6">
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
      )}
    </>
  );
};

export default UserScore;
