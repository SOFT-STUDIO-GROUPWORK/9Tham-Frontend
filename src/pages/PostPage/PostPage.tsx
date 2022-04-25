import Comment from "./components/Comment";
import ProfileTopBar from "./components/ProfileTopBar";
import NewComment from "./components/NewComment";

import MOCK_COMMENTS from "../../mocks/Post/comments.json";
import MOCK_POST from "../../mocks/Post/post.json";

type Props = {};

const PostPage = (props: Props) => {
  return (
    <div className="container mx-auto pb-32">
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  px-2"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        {/* margin top for navbar */}
        <div className="w-full mt-24">
          <ProfileTopBar
            username={MOCK_POST.username}
            firstname={MOCK_POST.firstname}
            lastname={MOCK_POST.lastname}
            date={MOCK_POST.date}
            img={MOCK_POST.img}
          />
        </div>

        <h2 className="w-full py-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600">
          เข้าวัดทำบุญ ได้อะไร
        </h2>
        <img
          src="https://s359.kapook.com/pagebuilder/b62916bb-10ce-462c-a9ba-cd01dabae311.jpg"
          alt="mockup"
          className="my-6"
        />
        <p className="mt-6 mb-12">
          {" "}
          คำว่า ธรรมะ พระราชวรมุนี (ประยุทธ์ ปยุตโต) กล่าวไว้ว่า คือ
          สภาพที่ทรงไว้, ธรรมดา, ธรรมชาติ สภาวะธรรม, สัจธรรม, ความจริง, เหดุ,
          ต้นเหตุ, สิ่ง, ปรากฏการณ์ ฯลฯ ธรรมะ อันเป็นคำสั่งสอนของพระพุทธเจ้านั้น
          แม้จะมีจำนวนมากมาย แยกแยะเป็นหลายประเภท
          หากบุคคลรู้จักเลือกสรรเอาหัวข้อธรรมมาปฏิบัติให้เหมาะสมกับสภาพปัญหาและชีวิตของตน
          ครอบครัว และสังคมแล้ว
          ย่อมจะเป็นไปตามจุดมุ่งหมายของศาสดาผู้นำหลักธรรมมาประกาศ
          หลักธรรมอันเป็นคำสั่งสอนของพระพุทธองค์ล้วนเป็นจริง
          เป็นสิ่งที่พาไปสู่ความสงบสุข และประโยชน์เกื้อกูล
          คุณของพระธรรมที่เรียกว่า “ธรรมคุณ” สรุปได้ 6 ประการคือ 1. สฺวากขาโต
          ภควา ธมฺโม แปลว่า พระธรรมอันธรรมที่พระผู้มีพระภาคเจ้าตรัสไว้ดีแล้ว คือ
          ตรัสไว้เป็นความจริงแท้ อีกทั้งงามในเบื้องต้น(ละชั่ว : ประพฤติศีล)
          งามในท่ามกลาง (ทำดี : สมาธิ) และงามในที่สุด (ทำใจให้บริสุทธิ์ : ปัญญา)
          พร้อมทั้งอรรถ (เนื้อความ, ใจความ)พร้อมทั้งพยัญชนะ (อักษร)
          ประกาศหลักการครองชีวิตอันประเสริฐ บริสุทธิ์ บริบูรณ์สิ้นเชิง 2.
          สนฺทิฏฺฐิโก{" "}
        </p>
        <hr className="w-full" />
        <div className="w-full">
          {MOCK_COMMENTS.map((c) => {
            return (
              <Comment
                username={c.username}
                firstname={c.firstname}
                lastname={c.lastname}
                date={c.date}
                img={c.img}
                comment={c.comment}
              />
            );
          })}
        </div>
        <NewComment />
      </div>
    </div>
  );
};

export default PostPage;
