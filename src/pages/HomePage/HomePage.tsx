import Selector from "./components/Selector";
import Searchbar from "./components/Searchbar";
import Card from "./components/Card";
import Pagination from "./components/Pagination";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import MOCK_BANNER from "../../mocks/SildeBanner/sildingBanner.json";

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
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        {/* content start*/}
        {/* Banner */}
        <div className="border-0 border-red-200 w-full h-60 mt-24">
          <Carousel
            autoPlay
            infiniteLoop
            swipeable
            emulateTouch
            showThumbs={false}
            showStatus={false}
          >
            {MOCK_BANNER.map((obj) => {
              return (
                <div className="h-60">
                  <img className="object-cover h-60" src={obj.src} alt={obj.src} />
                </div>
              );
            })}
          </Carousel>
        </div>

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
          <Card
            title="เข้าวัดทำบุญ ได้อะไร"
            description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
            type="ความรู้ธรรมะ"
          />
          <Card
            title="เข้าวัดทำบุญ ได้อะไร"
            description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
            type="ความรู้ธรรมะ"
          />
          <Card
            title="เข้าวัดทำบุญ ได้อะไร"
            description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
            type="ความรู้ธรรมะ"
          />
          <Card
            title="เข้าวัดทำบุญ ได้อะไร"
            description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
            type="ความรู้ธรรมะ"
          />
          <Card
            title="เข้าวัดทำบุญ ได้อะไร"
            description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
            type="ความรู้ธรรมะ"
          />
          <Card
            title="เข้าวัดทำบุญ ได้อะไร"
            description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
            type="ความรู้ธรรมะ"
          />
          <Card
            title="เข้าวัดทำบุญ ได้อะไร"
            description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
            type="ความรู้ธรรมะ"
          />
          <Card
            title="เข้าวัดทำบุญ ได้อะไร"
            description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
            type="ความรู้ธรรมะ"
          />
        </div>

        <div className="w-full my-3 shadow">
          <Pagination />
        </div>

        {/* content end */}
      </div>
    </div>
  );
};

export default HomePage;
