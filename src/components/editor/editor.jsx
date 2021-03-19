import React, { memo, useState } from "react";
import ReactQuill from "react-quill";
// import Parser from "html-react-parser";
import "react-quill/dist/quill.snow.css";

const Editor = memo(({ mainContents, onChangeField }) => {
  const [content, setContent] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ],
  };

  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];
  const onChangeHandler = (content, delta, source, editor) => {
    onChange(editor.getHTML());
  };
  const onChange = (e) => {
    setContent({ content: e });
    onChangeField(content);
    // console.log(e);
  };
  return (
    <ReactQuill
      style={{ height: "90%" }}
      theme="snow"
      modules={modules}
      formats={formats}
      // value={Parser(mainContents)}
      onChange={onChangeHandler}
    />
  );
});

export default Editor;
