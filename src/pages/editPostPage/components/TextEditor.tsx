import { useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

type Props = {};

const TextEditor = (props: Props) => {
  const [content, setContent] = useState<string>("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={(newState) => {
          setEditorState(newState);
        }}
        //top-48 z-50
        toolbarClassName="flex sticky shadow !justify-center mx-auto "
        editorClassName="bg-white shadow-sm mb-12 mx-auto border px-10 py-2"
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
          // image: {
          //   uploadCallback: uploadImageCallBack,
          //   alt: { present: true, mandatory: true },
          // },
        }}
      />
    </div>
  );
};

export default TextEditor;
