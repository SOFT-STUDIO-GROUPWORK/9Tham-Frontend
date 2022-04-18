import TextEditor from "./components/TextEditor";
import Input from "./components/Input";
import ProfileTopBar from "../PostPage/components/ProfileTopBar";

import MOCK_POST from "../../mocks/Post/post.json";
import { useEffect, useState } from "react";

import { BsFillImageFill } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { FiLock } from "react-icons/fi";

import axios from "axios";
import $ from "jquery";
import Button from "../../components/Button";

type Props = {};

const EditPostPage = (props: Props) => {
  // const [coverImage, setCoverImage] = useState("");
  const [selectCoverImage, setSelectCoverImage] = useState<undefined | Blob>();
  const [previewCoverImage, setPreviewCoverImage] = useState<string>("");
  const [token, setToken] = useState(
    "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzdHJpbmciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1MDMwMzQwNn0.X-0k5MuwSKHHzKbNhWQIVm1BYzxSJdC8QsV7ch0Uss94B49KQAQ6uawiBIO_TUIDh7KV4texZMn_iQZkItRi5g"
  );

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectCoverImage) {
      setPreviewCoverImage("");
      return;
    }

    const objectUrl: string = URL.createObjectURL(selectCoverImage);
    console.log(objectUrl);
    setPreviewCoverImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectCoverImage]);

  const handleUploadCoverImage = (event: any) => {
    console.log(event.target.files[0]);
  };

  const fileSelectHandler = (event: any) => {
    if (!event.target.files[0] || event.target.files[0] === 0) {
      setSelectCoverImage(undefined);
      return;
    }
    setSelectCoverImage(event.target.files[0]);
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
    onUploadProgress: (progressEvent: any) => {
      console.log(
        "Upload progress: " +
          Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          "%"
      );
    },
  };

  const fileUploadHandler = (event: any) => {
    if (!selectCoverImage) {
      console.log("Error: no file to Upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectCoverImage);
    axios
      .post("endpoint api", formData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto ">
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  px-2 pb-32"
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

        <div className="w-full my-3">
          <h4 className="mb-2">
            <span className="text-amber-500">*</span>
            หัวข้อเรื่อง
          </h4>
          <Input
            className="text-2xl font-bold py-4"
            placeholder="หัวข้อเรื่อง..."
          />
        </div>

        <div className="w-full my-3">
          <h4 className="mb-2">
            <span className="text-amber-500">*</span>
            คำอธิบายขนาดสั้น
          </h4>
          <Input placeholder="คำอธิบายขนาดสั้น" />
        </div>

        <div className="w-full my-3">
          <h4 className="mb-2">
            <span className="text-amber-500">*</span>
            หมวดหมู่
          </h4>
        </div>

        <div className="w-full my-3 flex flex-col items-center bg-slate-50">
          <h4 className="mb-2 self-start w-full bg-slate-50">
            <span className="text-amber-500">*</span>
            ภาพหน้าปก
          </h4>
          {/* input picture */}
          <div
            className="relative w-full rounded border bg-white shadow"
            style={{ height: "400px", width: "400px" }}
          >
            {selectCoverImage ? (
              <img
                id="img-preview"
                src={previewCoverImage}
                className="object-fill"
                style={{ height: "400px", width: "400px" }}
                alt=""
              />
            ) : (
              <BsFillImageFill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 text-gray-400" />
            )}
          </div>
          <div
            className="flex flex-row items-center justify-center"
            style={{ width: "400px" }}
          >
            <input
              type="file"
              id="previewImageInputFile"
              className=" shadow text-center border grow "
              onChange={fileSelectHandler}
            />
            {selectCoverImage ? (
              <Button
                onClick={() => {
                  setSelectCoverImage(undefined);
                  $("#previewImageInputFile").val("");
                }}
                className="self-stretch w-12 "
                children="X"
                color="red"
              />
            ) : (
              <></>
            )}
          </div>
          <p className="text-amber-500">
            ขนาดแนะนำ จัตุรัส ไม่เกิน 400 px X 400 px
          </p>
        </div>

        <h4 className="w-full mb-2 sticky bg-slate-50 py-3 z-10" style={{top:"66px"}}>
          <span className="text-amber-500">*</span>
          เนื้อหา
        </h4>
        <div className="w-full">
          <TextEditor />
        </div>

        <div className="w-full flex flex-col items-center gap-5">
          <div className="w-full flex flex-col items-center my-8">
            <h4 className="mb-5">รูปแบบการโพสต์</h4>
            <ul className="flex flex-row gap-5">
              <li className="relative">
                <input
                  className="sr-only peer"
                  type="radio"
                  value="0"
                  name="visibility"
                  id="private"
                />
                <label
                  className="text-lg flex items-center py-2 px-4 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-amber-500 peer-checked:text-white peer-checked:border-transparent transition duration-150 ease-in-out"
                  htmlFor="private"
                >
                  <FiLock className="mr-2" /> เฉพาะฉัน
                </label>
              </li>
              <li className="relative">
                <input
                  className="sr-only peer"
                  type="radio"
                  value="1"
                  name="visibility"
                  id="public"
                  checked
                />
                <label
                  className="text-lg flex items-center py-2 px-4 bg-slate-50  rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-amber-500 peer-checked:text-white peer-checked:border-transparent transition duration-150 ease-in-out"
                  htmlFor="public"
                >
                  <AiOutlineGlobal className="mr-2" /> สาธารณะ
                </label>
              </li>
            </ul>
          </div>
          <Button
            onClick={() => {}}
            className="w-2/5 rounded-full"
            children="บันทึกแบบร่าง"
            color="amber"
            mode="outline"
          />
          <Button
            onClick={() => {}}
            className="w-2/5 rounded-full"
            children="โพสต์"
            color="amber"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
