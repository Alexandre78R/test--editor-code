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
      <h4>Liste des Languages !</h4>
      {/* {languages?.map((language) => {
          return <li onClick={() => handleClick(language)}> {language[0]}</li>;
        })} */}
      <select onChange={(e) => handleClick(e.target.value)}>
        <option value="null">Merci de choisir un langage</option>
        {languages?.map((language) => (
          <option key={language[0]} value={language[0]}>
            {language[0]}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguageEditor;
