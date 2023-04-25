import { PreAuthorizedAccount } from "@prisma/client";
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
  const preAuthUsers = api.preAuthorizedAccount.getAll.useQuery();
  const ctx = api.useContext();
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

      ctx.preAuthorizedAccount.getAll.invalidate();
    },
    onError: (e) => {
      //If zod error, show error on field
      if (
        e.data?.zodError?.fieldErrors.email &&
        e.data?.zodError?.fieldErrors.email[0]
      ) {
        setError(e.data?.zodError?.fieldErrors.email[0]);
        return;
      }

      //Otherwise, flash error up top
      setsuccessMessage({ message: e.message, color: "red" });
    },
    onSettled: () => {
      FlashSuccessMessage();
    },
  });
  const deleteUser = api.preAuthorizedAccount.deletePreAuthUser.useMutation({
    onSuccess: () => {
      setsuccessMessage({
        message: "You have successfully removed a pre-authorized user",
        color: "green",
      });
      FlashSuccessMessage();

      ctx.preAuthorizedAccount.getAll.invalidate();
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
      {preAuthUsers.data && (
        <div className="relative mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
                <th scope="col" className="px-6 py-3">
                  Email Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Create Date
                </th>
              </tr>
            </thead>
            <tbody>
              {preAuthUsers.data.map((user) => (
                <tr
                  key={user.pre_authorized_id}
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="rounded bg-slate-900 py-2 px-4 font-bold text-white"
                      onClick={() =>
                        deleteUser.mutate({ userID: user.pre_authorized_id })
                      }
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4">{user.pre_authorized_email}</td>
                  <td className="px-6 py-4">
                    {user.create_date.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PreAuthorize;
