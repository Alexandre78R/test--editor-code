import { useState, useEffect, useRef } from "react";

import "./App.css";

// import { Controlled as CodeMirror } from "react-codemirror2";
// import MonacoEditor from "react-monaco-editor";
import MonacoEditor from "@monaco-editor/react";
function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const editorRef = useRef(null);

  const handleChange = (editor, data, value) => {
    setCode(value);

    try {

      const logMessages = [];

      const customConsoleLog = (...args) => {
        logMessages.push(args.map((arg) => arg).join(" "));
      };

      console.log = customConsoleLog;

      // Exécutez le code
      eval(editor);

      // Mettez à jour la sortie
      setOutput(logMessages.join("\n"));
    } catch (error) {
      if (error.message === "Invalid or unexpected token") {
        setOutput(`Erreur d'exécution : syntax invalid !`);
      } else {
        setOutput(`Erreur d'exécution : ${error.message}`);
      }
    }
  };

  useEffect(() => {
    // Forcez le redimensionnement après le rendu initial
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, []);

  return (
    <>
      <p>toto</p>
      <MonacoEditor
        ref={editorRef}
        width="80vh"
        height="50vh"
        language="javascript"
        value={code}
        onChange={handleChange}
      />
      <div>
        <h2>Résultat :</h2>
        <pre>{output}</pre>
      </div>
    </>
  );
}

export default App;
