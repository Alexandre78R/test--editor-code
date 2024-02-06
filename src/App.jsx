import { useState, useEffect } from "react";

import "./App.css";

import FileEditor from "./components/FileEditor";

// import FolderTree from "react-folder-tree";
import "react-folder-tree/dist/style.css";
import MenuEditor from "./components/MenuEditor";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [file, setFile] = useState(null);
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
      content: `console.log('file2')
console.log(window.toto())
      `,
    },
  ]);
  // const fakeData = [
  //   {
  //     name: "Dossier1",
  //     children: [
  //       {
  //         checked: 0,
  //         name: "file1",
  //         id: 1,
  //         code: `
  //         console.log("dossier 1 - file 1")
  //         `,
  //       },
  //       {
  //         checked: 0,
  //         name: "file2",
  //         id: 2,
  //         code: `
  //         console.log("dossier 1 - file 2")
  //         `,
  //       },
  //       {
  //         checked: 0,
  //         name: "file3",
  //         id: 3,
  //         code: `
  //         console.log("dossier 1 - file 3")
  //         `,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Dossier2",
  //     children: [
  //       {
  //         checked: 0,
  //         name: "file1",
  //         id: 1,
  //         code: `
  //         console.log("dossier 2 - file 1")
  //         `,
  //       },
  //       {
  //         checked: 0,
  //         name: "file2",
  //         id: 2,
  //         code: `
  //         console.log("dossier 2 - file 2")
  //         `,
  //       },
  //       {
  //         checked: 0,
  //         name: "file3",
  //         id: 3,
  //         code: `
  //         console.log("dossier 2 - file 3")
  //         `,
  //       },
  //     ],
  //   },
  // ];
  const handleClick = () => {
    try {
      const logMessages = [];

      const customConsoleLog = (...args) => {
        logMessages.push(args.map((arg) => arg).join(" "));
      };

      console.log = customConsoleLog;

      // Exécutez le code
      eval(code);

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
    // console.log(code);
    // setCode()
    if (file) {
      console.log(file.content);
      setCode(file.content);
    }
  }, [file]);

  // const onTreeStateChange = (state, event) => console.log(state, event);
  // console.log("test data0", testData);
  return (
    <>
      <p>toto</p>
      {/* <FolderTree data={fakeData} onChange={onTreeStateChange} /> */}
      {/* {fakeData.map((data) => {
        return <FolderTree data={data} onChange={onTreeStateChange} />;
      })} */}
      <MenuEditor data={data} setFile={setFile} />
      <FileEditor code={code} setCode={setCode} file={file} setData={setData} />
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
