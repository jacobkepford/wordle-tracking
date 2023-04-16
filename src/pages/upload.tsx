import { NextPage } from "next";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type Error = {
  scoreCountError: string;
  scoreDateError: string;
};

type PossibleScore = {
  score: number;
  isActive: boolean;
};

const Upload: NextPage = () => {
  const [scoreDate, setScoreDate] = useState(new Date());
  const [errors, setErrors] = useState<Error>({
    scoreCountError: "",
    scoreDateError: "",
  });
  const [successMessage, setsuccessMessage] = useState("");
  const [possibleScores, setPossibleScores] = useState<PossibleScore[]>([
    { score: 1, isActive: false },
    { score: 2, isActive: false },
    { score: 3, isActive: false },
    { score: 4, isActive: false },
    { score: 5, isActive: false },
    { score: 6, isActive: false },
  ]);

  const GatherFormData = () => {
    const activeScore = GetActiveScore();
    const formData = {
      scoreDate: new Date(scoreDate),
      scoreCount: activeScore,
    };

    return formData;
  };

  const ValidateForm = (formData: { scoreDate: Date; scoreCount: number }) => {
    let formIsValid = true;

    //Empty date returns year value of 1969
    if (formData.scoreDate.getFullYear() < 1970) {
      formIsValid = false;
      setErrors((errors) => ({ ...errors, scoreDateError: "Required" }));
    }

    if (!formData.scoreCount) {
      formIsValid = false;
      setErrors((errors) => ({ ...errors, scoreCountError: "Required" }));
    }

    //Default value of scoreCount is 0
    if (formData.scoreCount < 1) {
      formIsValid = false;
      setErrors((errors) => ({
        ...errors,
        scoreCountError: "Required",
      }));
    }

    return formIsValid;
  };

  const ClearValidation = () => {
    setErrors((errors) => ({
      ...errors,
      scoreDateError: "",
      scoreCountError: "",
    }));
  };

  const ShowSuccessMessage = (message: string) => {
    //Flash success message and then hide after 5 seconds
    setsuccessMessage(message);
    setTimeout(() => {
      setsuccessMessage("");
    }, 5000);
  };

  const ClearForm = () => {
    setScoreDate(new Date());
    ClearValidation();
    ClearActiveScore();
  };

  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = GatherFormData();

    const formIsValid = ValidateForm(formData);

    if (!formIsValid) {
      return;
    }

    ClearValidation();
    //const message = await CreateScore(formData);
    //ShowSuccessMessage(message);
    ClearForm();
  };

  const HandleScoreClick = (score: PossibleScore) => {
    const updateScore = possibleScores.map((scoreValue) =>
      scoreValue.score == score.score
        ? { ...scoreValue, isActive: true }
        : { ...scoreValue, isActive: false }
    );

    setPossibleScores(updateScore);
  };

  const ClearActiveScore = () => {
    const clearedScores = possibleScores.map((score) => ({
      ...score,
      isActive: false,
    }));

    setPossibleScores(clearedScores);
  };

  const GetActiveScore = () => {
    let activeScore = 0;
    possibleScores.forEach((score) => {
      if (score.isActive) {
        activeScore = score.score;
      }
    });

    return activeScore;
  };

  return (
    <>
      <div className="ml-4 mt-4">
        {/* <h1 className="text-2xl">Upload Score</h1> */}
        <span>{successMessage}</span>
        <form onSubmit={HandleSubmit} className="text-light">
          <div className="mb-3 w-1/4">
            <label htmlFor="scoreDate">
              What date are you logging this score for?
            </label>
            <DatePicker
              id="scoreDate"
              selected={scoreDate}
              onChange={(date: Date) => setScoreDate(date)}
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
              type="submit"
              className="rounded bg-slate-900 py-2 px-4 font-bold text-white"
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
