import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type Props = {
  uploadSingleImage: any;
  onEditorStateChange: any;
  editorState: any;
};

const TextEditor = (props: Props) => {
  return (
    <div>
      <Editor
        editorState={props.editorState}
        onEditorStateChange={props.onEditorStateChange}
        //top-48 z-50
        toolbarClassName="flex sticky shadow !justify-center mx-auto z-10"
        toolbarStyle={{ top: "120px" }}
        editorClassName="bg-white shadow-sm mb-12 mx-auto border px-10 py-2"
        editorStyle={{ minHeight: "50vh" }}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "list",
            "textAlign",
            "colorPicker",

            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: {
            inDropdown: false,
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H3", "Blockquote", "Code"],
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["unordered", "ordered"],
          },
          textAlign: { inDropdown: true },

          history: { inDropdown: true },
          image: {
            uploadCallback: props.uploadSingleImage,
            previewImage: true,
            alt: { present: true, mandatory: false },
            // inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          },
        }}
      />
    </div>
  );
};

export default TextEditor;
