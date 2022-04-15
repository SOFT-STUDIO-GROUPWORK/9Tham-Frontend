import TextEditor from "./components/TextEditor";
type Props = {};

const EditPostPage = (props: Props) => {
  return (
    <div className="container mx-auto pb-32">
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  px-2"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="mt-24"></div>
        <TextEditor />
      </div>
    </div>
  );
};

export default EditPostPage;
