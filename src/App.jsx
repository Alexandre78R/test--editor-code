import { useState, useEffect, useRef } from "react";
import "./App.css";
import FileEditor from "./components/FileEditor";
import MenuEditor from "./components/MenuEditor";
import { executeCode } from "./api/Api";
import LanguageEditor from "./components/LanguageEditor";

function App() {
  const editorRef = useRef(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      name: "file1",
      extention: "js",
      language: "javascript",
      content: `console.log('file1')
      const toto = () => {
  return "file1 xsd"
};

window.toto = window.toto  || toto;
`,
    },
    {
      id: 2,
      name: "file2",
      extention: "php",
      language: "php",
      content: `
<?php

$name = 'Alex';
echo $name;


function coucou ($name) {
  return "coucou $name !";
}

echo  "\n".coucou("toto");
echo  "
".coucou($name);
      `,
    },
    {
      id: 3,
      name: "file3",
      extention: "js",
      language: "javascript",
      content: `
function coucou (a,b) {
  return a + b;
}
console.log(coucou(1,2))
console.log(coucou(1,2))
  `,
    },
  ]);

  const [file, setFile] = useState(data[0]);

  const handleClick = async () => {
    if (!code)
      return setOutput("Merci de mettre du code dans l'éditeur de code !");
    if (!language)
      return console.error("Merci de choisir un luangage de programation");
    try {
      const { run: result } = await executeCode(language, [{ content: code }]);
      console.log(result);
      setOutput(result.output);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (file) {
      console.log(file);
      setLanguage(file.language);
      setCode(file.content);
    }
  }, [file]);

  useEffect(() => {
    if (language) {
      console.log("modif changement de language");

      console.warn("NOTE : gérer le select correctement ici !");
    }
  }, [language]);

  return (
    <>
      <div className="parent">
        <div className="MenuEditor">
          <MenuEditor data={data} setFile={setFile} />
        </div>
        <div className="LanguageEditor">
          <LanguageEditor setLanguage={setLanguage} />
        </div>
      </div>
      <FileEditor
        code={code}
        setCode={setCode}
        file={file}
        setData={setData}
        editorRef={editorRef}
        language={language}
      />
      <button type="submit" onClick={handleClick}>
        RUN
      </button>
      <div>
        <h2>Résultat :</h2>
        <pre>{output}</pre>
      </div>
    </>
  );
}

export default App;
