import { NextPage } from "next";

const NotAuthorized: NextPage = () => {
  return (
    <>
      <h1 className="mt-4 text-center">
        You are not authorized to access this application
      </h1>
    </>
  );
};

export default NotAuthorized;
