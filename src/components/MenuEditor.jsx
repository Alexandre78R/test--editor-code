import React from "react";

const MenuEditor = ({ data, setFile }) => {
  const handleClick = (e) => {
    console.log(e);
    setFile(e);
  };
  return (
    <>
      <h4>Liste des Fichiers :</h4>
      {data?.map((data) => {
        return (
          <li onClick={() => handleClick(data)}>
            {data?.name}.{data?.extention}
          </li>
        );
      })}
    </>
  );
};

export default MenuEditor;
