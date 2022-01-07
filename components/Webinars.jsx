import axios from "axios";
import React, { useState } from "react";

const Webinars = () => {
  const [credentials, setCredentials] = useState();
  const [emails, setEmails] = useState([]);

  const createSequence = () => {
    axios.post("/api/mailchimp", {
      action: "createSequence",
      credentials,
      emails,
    });
  };
  const getListInfo = () => {
    axios
      .post("/api/mailchimp", {
        action: "checkInfo",
      })
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  };
  const getSequence = () => {
    axios
      .post("/api/mailchimp", {
        action: "getSequences",
      })
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  };
  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="font-bold text-md text-black dark:text-white ml-2">
              Automatizaciones de Mailchimp para Webinars
            </span>
            <button onClick={getListInfo}>Get</button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="bg-blue-300 rounded px-4 disabled:opacity-30"
          disabled={emails.length === 0}
        >
          -
        </button>
        <span>{emails.length}</span>
        <button
          className="bg-blue-300 rounded px-4"
          onClick={() => setEmails([...emails, {}])}
        >
          +
        </button>
      </div>
      <div>
        {emails.map((email, i) => (
          <div>{i}</div>
        ))}
      </div>
    </div>
  );
};

export default Webinars;
