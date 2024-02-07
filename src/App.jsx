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
  const [data, setData] = useState([
    {
      id: 1,
      name: "file 1",
      extention: "js",
      content: `console.log('file1')
      const toto = () => {
  return "file1 xsd"
};

window.toto = window.toto  || toto;
`,
    },
    {
      id: 2,
      name: "file 2",
      extention: "js",
      content: `
function coucou (a,b) {
  return a + b;
}
console.log(coucou(1,4))
  `,
    },
    {
      id: 3,
      name: "file 3",
      extention: "js",
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
  const [language, setLanguage] = useState("");

  const handleClick = async () => {
    if (!code) return;
    if (!language)
      return console.error("Merci de choisir un luangage de programation");
    try {
      const { run: result } = await executeCode(language, [
        { content: code },
        { content: code },
      ]);
      console.log(result);
      setOutput(result.output);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("toto");
    }
  };

  useEffect(() => {
    if (file) {
      console.log(file.content);
      setCode(file.content);
    }
  }, [file]);

  return (
    <>
      <p>toto</p>
      <MenuEditor data={data} setFile={setFile} />
      <LanguageEditor setLanguage={setLanguage} />
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
