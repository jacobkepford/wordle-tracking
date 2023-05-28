import { useState } from "react";

export type SuccessMessage = {
  message: string;
  color: string;
};

export const SuccessMessage = (props: SuccessMessage) => {
  return (
    <span style={{ color: props.color }} className="mb-4">
      {props.message}
    </span>
  );
};
