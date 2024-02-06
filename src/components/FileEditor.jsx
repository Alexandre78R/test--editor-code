import { useEffect, useRef } from "react";

import MonacoEditor from "@monaco-editor/react";

const FileEditor = ({ code, setCode, file, setData }) => {
  const editorRef = useRef(null);
  const handleChange = (editor) => {
    setCode(editor);
    if (file) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === file.id ? { ...item, content: editor } : item
        )
      );
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
    </>
  );
};

export default FileEditor;
