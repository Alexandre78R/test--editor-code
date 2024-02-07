import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import FileEditor from "./components/FileEditor";
import MenuEditor from "./components/MenuEditor";

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
  const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
  };

  const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp:
      'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
  };

  const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
  });

  const executeCode = async (language, sourceCode) => {
    console.log("source code", sourceCode);
    console.log("language", language);
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: sourceCode,
    });
    return response.data;
  };

  const handleClick = async () => {
    console.log(code);

    if (!code) return;
    try {

      const { run: result } = await executeCode("javascript", [
        { content: code },
        { content: code },
      ]);
      console.log(result);

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
      <FileEditor
        code={code}
        setCode={setCode}
        file={file}
        setData={setData}
        editorRef={editorRef}
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
