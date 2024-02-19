import { useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";

const FileEditor = ({ code, setCode, file, setData, editorRef, language }) => {
  const handleChange = (editor) => {
    editorRef.current = editor;
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
        height="40vh"
        language={language}
        value={code}
        onChange={handleChange}
      />
    </>
  );
};

export default FileEditor;
