import Selector from "./components/Selector";
import Searchbar from "./components/Searchbar";
import Card from "./components/Card";
import Pagination from "./components/Pagination"

type Props = {};
const sortOptions: string[] = ["ล่าสุด", "เก่าสุด"];
const typeOptions: string[] = [
  "ทั้งหมด",
  "ความรู้ธรรมะ",
  "หลักคำสอน",
  "สถานที่ธรรมะ",
];

function testClick() {
  console.log("test");
}

const HomePage = (props: Props) => {
  // for line 8, 9 is my template (for resposive and get content inside)-> copy 2 lines to your page and edit "content"
  return (
    <div className="container mx-auto">
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  px-2"
        style={{ minHeight: "calc(100vh - 88px)" }}
      >
        {/* content start*/}
        {/* Banner */}
        <div className="border-4 border-red-200 w-full h-60">banner</div>

        {/* TopBar start*/}
        <div className="my-6 border-0 border-red-200 w-full flex flex-row gap-x-5 items-center">
          {/* Searchbar */}
          <Searchbar onClick={testClick} />
          {/* Sort by */}
          <Selector title="เรียงตาม:" options={sortOptions} />
          {/* Types */}
          <Selector title="หมวดหมู่:" options={typeOptions} />
        </div>
        {/* TopBar end*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>

        <Pagination/>


        {/* content end */}
      </div>
    </div>
  );
};

export default HomePage;
