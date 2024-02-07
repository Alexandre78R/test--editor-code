import { useEffect, useRef } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";

const FileEditor = ({ code, setCode, file, setData, editorRef }) => {
  //   const editorRef = useRef(null);
  const monaco = useMonaco();

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

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function toto() {
    console.log("toto");
  }

  return (
    <>
      <p>toto</p>
      <MonacoEditor
        ref={editorRef}
        width="80vh"
        height="50vh"
        language="javascript"
        defaultValue="// some comment"
        value={code}
        onMount={handleEditorDidMount}
        onChange={handleChange}
      />

      {/* <LiveProvider code={code}>
        <div>
          <MonacoEditor
            ref={editorRef}
            width="80vh"
            height="50vh"
            language="javascript"
            defaultValue="// some comment"
            value={code}
            onMount={handleEditorDidMount}
            onChange={handleChange}
          />
        </div>
        <div>
          <LivePreview />
        </div>
        <LiveError />
        <button onClick={toto}></button>
      </LiveProvider> */}
    </>
  );
};

export default FileEditor;
