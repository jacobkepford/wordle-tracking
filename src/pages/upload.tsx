import type { NextPage } from "next";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SuccessMessage } from "~/components/successMessage";
import { api } from "~/utils/api";

type Error = {
  scoreCountError: string;
  scoreDateError: string;
};

type PossibleScore = {
  score: number;
  isActive: boolean;
};

type FormData = {
  score_value: number;
  score_date: Date;
};

const Upload: NextPage = () => {
  const [errors, setErrors] = useState<Error>({
    scoreCountError: "",
    scoreDateError: "",
  });

  const [successMessage, setsuccessMessage] = useState<SuccessMessage>({
    color: "",
    message: "",
  });

  const [possibleScores, setPossibleScores] = useState<PossibleScore[]>([
    { score: 1, isActive: false },
    { score: 2, isActive: false },
    { score: 3, isActive: false },
    { score: 4, isActive: false },
    { score: 5, isActive: false },
    { score: 6, isActive: false },
  ]);

  const [formData, setFormData] = useState<FormData>({
    score_value: 0,
    score_date: new Date(),
  });

  const addScore = api.score.addScore.useMutation({
    onMutate: () => {
      ClearValidation();
    },
    onSuccess: () => {
      ClearForm();

      setsuccessMessage({
        message: "Sucessfully added score",
        color: "green",
      });
    },
    onError: (e) => {
      //If zod error, show error on field
      // if (e.data?.zodError?.fieldErrors) {
      //   setErrors(e.message.toString);
      //   return;
      // }

      //Otherwise, flash error up top
      setsuccessMessage({ message: e.message, color: "red" });
    },
    onSettled: () => {
      FlashSuccessMessage();
    },
  });

  const ClearValidation = () => {
    setErrors((errors) => ({
      ...errors,
      scoreDateError: "",
      scoreCountError: "",
    }));
  };

  const ClearForm = () => {
    setFormData({ score_value: 0, score_date: new Date() });
    ClearValidation();
    ClearActiveScore();
  };

  const HandleScoreClick = (score: PossibleScore) => {
    const updateScore = possibleScores.map((scoreValue) =>
      scoreValue.score == score.score
        ? { ...scoreValue, isActive: true }
        : { ...scoreValue, isActive: false }
    );

    setPossibleScores(updateScore);
    setFormData({ ...formData, score_value: score.score });
  };

  const ClearActiveScore = () => {
    const clearedScores = possibleScores.map((score) => ({
      ...score,
      isActive: false,
    }));

    setPossibleScores(clearedScores);
    setFormData({ ...formData, score_value: 0 });
  };

  const FlashSuccessMessage = () => {
    //Flash success message and then hide after 5 seconds
    setTimeout(() => {
      ClearSuccessMessage();
    }, 5000);
  };

  const ClearSuccessMessage = () => {
    setsuccessMessage({ color: "", message: "" });
  };

  return (
    <>
      <div className="ml-4 mt-4">
        {/* <h1 className="text-2xl">Upload Score</h1> */}
        <SuccessMessage
          message={successMessage.message}
          color={successMessage.color}
        />
        <form className="text-light">
          <div className="mb-3 w-1/4">
            <label htmlFor="scoreDate">
              What date are you logging this score for?
            </label>
            <DatePicker
              id="scoreDate"
              selected={formData.score_date}
              onChange={(date: Date) =>
                setFormData({ ...formData, score_date: date })
              }
            />
            <span style={{ color: "red" }}>{errors.scoreDateError}</span>
          </div>
          <h1>What was your score?</h1>
          <div className="flex  flex-row gap-2">
            {possibleScores.map((score) => (
              <button
                key={score.score}
                type="button"
                className={`h-12 w-12 border-2 border-white p-2 text-center hover:bg-slate-900 ${
                  score.isActive ? "bg-slate-900" : ""
                }`}
                onClick={() => HandleScoreClick(score)}
              >
                {score.score}
              </button>
            ))}
          </div>
          <span style={{ color: "red" }}>{errors.scoreCountError}</span>
          <div className="mt-4">
            <button
              className="bg-gray py2 rounded px-4 font-bold text-white"
              onClick={ClearForm}
              type="button"
            >
              Clear
            </button>
            <button
              type="button"
              className="rounded bg-slate-900 py-2 px-4 font-bold text-white"
              onClick={() =>
                addScore.mutate({
                  score_value: formData.score_value,
                  score_date: formData.score_date,
                })
              }
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Upload;
