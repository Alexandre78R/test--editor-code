import React from "react";
import { LANGUAGE_VERSIONS } from "../params/Params";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageEditor = ({ setLanguage }) => {
  const handleClick = (e) => {
    console.log(e);
    setLanguage(e[0]);
  };
  return (
    <>
      {languages?.map((language) => {
        return <li onClick={() => handleClick(language)}> {language[0]}</li>;
      })}
    </>
  );
};

export default LanguageEditor;
