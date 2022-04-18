import TextEditor from "./components/TextEditor";
import Input from "./components/Input";
import ProfileTopBar from "../PostPage/components/ProfileTopBar";

import MOCK_POST from "../../mocks/Post/post.json";

type Props = {};

const EditPostPage = (props: Props) => {
  return (
    <div className="container mx-auto pb-32">
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  px-2"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="mt-24"></div>
        <ProfileTopBar
          username={MOCK_POST.username}
          firstname={MOCK_POST.firstname}
          lastname={MOCK_POST.lastname}
          date={MOCK_POST.date}
          img={MOCK_POST.img}
        />
        <h2 className="w-full py-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600">
          เพิ่มบทความใหม่
        </h2>
        <h4 className="w-full">
          <span className="text-amber-500">*</span>
          หัวข้อเรื่อง
        </h4>
        <Input placeholder="หัวข้อเรื่อง..." />

        <h4 className="w-full">
          <span className="text-amber-500">*</span>
          คำอธิบายขนาดสั้น
        </h4>
        <Input placeholder="คำอธิบายขนาดสั้น" />

        <h4 className="w-full">
          <span className="text-amber-500">*</span>
          หมวดหมู่
        </h4>

        <h4 className="w-full">
          <span className="text-amber-500">*</span>
          ภาพหน้าปก
        </h4>
        <input type="file" />

        <h4 className="w-full">
          <span className="text-amber-500">*</span>
          เนื้อหา
        </h4>
        <div className="w-full h-96">
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
