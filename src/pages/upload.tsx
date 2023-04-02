import { NextPage } from "next";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type Error = {
  scoreCountError: string;
  scoreDateError: string;
};

const Upload: NextPage = () => {
  const [scoreCount, setScoreCount] = useState(0);
  const [scoreDate, setScoreDate] = useState(new Date());
  const [errors, setErrors] = useState<Error>({
    scoreCountError: "",
    scoreDateError: "",
  });
  const [successMessage, setsuccessMessage] = useState("");

  const GatherFormData = () => {
    const formData = {
      scoreDate: new Date(scoreDate),
      scoreCount: scoreCount,
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

    if (formData.scoreCount < 1 || formData.scoreCount > 6) {
      formIsValid = false;
      setErrors((errors) => ({
        ...errors,
        scoreCountError: "Invalid. Score must be between 1 and 6",
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
    setScoreCount(0);
    setScoreDate(new Date());
    ClearValidation();
  };

  const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  return (
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
        <div className="mb-3 flex w-1/4 flex-col">
          <label htmlFor="scoreNumber">What was your score?</label>
          <input
            type="number"
            className="form-control"
            id="scoreNumber"
            onChange={(event) => setScoreCount(event.target.valueAsNumber)}
            value={scoreCount}
          />
          <span style={{ color: "red" }}>{errors.scoreCountError}</span>
        </div>
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
      </form>
    </div>
  );
};

export default Upload;
