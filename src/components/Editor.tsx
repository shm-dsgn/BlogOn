import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ script: "sub" }, { script: "super" }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
  ],
};

const formats = [
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
  "size",
  "color",
  "background",
  "script",
];

const Editor = (props: {
  value: ReactQuill.Value | undefined;
  onChange: (arg0: string) => void;
}) => {
  return (
    <ReactQuill
      value={props.value}
      modules={modules}
      formats={formats}
      onChange={(newValue) => props.onChange(newValue)}
    />
  );
};

export default Editor;
