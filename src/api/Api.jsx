import axios from "axios";
import { LANGUAGE_VERSIONS } from "../params/Params";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
  console.log("source code", sourceCode);
  console.log("language", language);
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: sourceCode,
  });
  console.log("response", response);
  return response.data;
};
