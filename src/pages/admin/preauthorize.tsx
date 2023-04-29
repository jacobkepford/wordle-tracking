import { PreAuthorizedAccount } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";

const PreAuthorize: NextPage = () => {
  type SuccessMessage = {
    message: string;
    color: string;
  };

  type FormData = {
    email: string;
    isAdmin: boolean;
  };

  const [formData, setFormData] = useState<FormData>({
    email: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
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

      void ctx.preAuthorizedAccount.getAll.invalidate();
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

      void ctx.preAuthorizedAccount.getAll.invalidate();
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
    setFormData({ email: "", isAdmin: false });
    ClearValidation();
  };

  return (
    <div className="m-6">
      <form className="mb-4 flex flex-col items-center justify-center">
        <span style={{ color: successMessage?.color }} className="mb-4">
          {successMessage?.message}
        </span>
        <label htmlFor="textEmail">Enter an email address</label>
        <input
          type="text"
          id="textEmail"
          className="mx-4 w-52"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        ></input>
        <div className="d-flex mt-4 flex-row">
          <label htmlFor="isAdmin">Add as admin?</label>
          <input
            type="checkbox"
            className="ml-4 mt-2 h-4 w-4"
            id="isAdmin"
            checked={formData.isAdmin}
            onChange={() =>
              setFormData({ ...formData, isAdmin: !formData.isAdmin })
            }
          ></input>
        </div>
        <span style={{ color: "red" }}>{error}</span>
        <div className="mt-4 mr-4">
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
            onClick={() => addUser.mutate({ email: formData.email })}
          >
            Add
          </button>
        </div>
      </form>
      {preAuthUsers.data && (
        <div className="relative mt-4 flex overflow-x-auto">
          <table className="w-full content-center text-left text-sm text-gray-500 dark:text-gray-400">
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
    </div>
  );
};

export default PreAuthorize;
