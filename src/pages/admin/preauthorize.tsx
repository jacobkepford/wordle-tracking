import { NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";

const PreAuthorize: NextPage = () => {
  type SuccessMessage = {
    message: string;
    color: string;
  };

  const [email, setEmail] = useState("");
  const [emailError, setError] = useState("");
  const [successMessage, setsuccessMessage] = useState<SuccessMessage>({
    color: "",
    message: "",
  });
  const addUser = api.preAuthorizedAccount.addPreAuthUser.useMutation({
    onMutate: () => {
      ClearValidation();
    },
    onSuccess: () => {
      ClearForm();

      setsuccessMessage({
        message: "Sucessfully pre authorized email",
        color: "green",
      });
    },
    onError: (e) => {
      if (
        e.data?.zodError?.fieldErrors.email &&
        e.data?.zodError?.fieldErrors.email[0]
      ) {
        setError(e.data?.zodError?.fieldErrors.email[0]);
        return;
      }

      setsuccessMessage({ message: e.message, color: "red" });
    },
    onSettled: () => {
      FlashSuccessMessage();
    },
  });

  const ClearValidation = () => {
    setError("");
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

  const ClearForm = () => {
    setEmail("");
    ClearValidation();
  };

  return (
    <>
      <span style={{ color: successMessage?.color }}>
        {successMessage?.message}
      </span>
      <form>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <span style={{ color: "red" }}>{emailError}</span>
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
            onClick={() => addUser.mutate({ email: email })}
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default PreAuthorize;
