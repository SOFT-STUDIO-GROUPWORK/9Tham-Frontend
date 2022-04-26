import Selector from "./components/Selector";
import Card from "./components/Card";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import MOCK_BANNER from "../../mocks/SildeBanner/sildingBanner.json";
import IPagination, {
  initialPaginationHomePage,
} from "../../interfaces/IPagination";

import {
  getPageArticles,
  getSearchArticles,
  getArticle,
} from "../../services/articlesService";
import { useEffect, useState } from "react";
import IArticle from "../../interfaces/IArticle";
import React from "react";
import Searchbar from "../../components/Searchbar";
import Pagination from "../../components/Pagination";

type Props = {};
const sortOptions: any[] = ["ล่าสุด", "เก่าสุด"];
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
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<IArticle[]>([]);

  

  //pagination
  const [pagination, setPagination] = useState<IPagination>(
    initialPaginationHomePage
  );

  //search
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (pagination.search === "") {
      getPageArticles({
        setIsLoading,
        setArticles,
        pagination,
        setPagination,
      });
    }
  }, [pagination.currentPage, pagination.search]);

  //Pagination
  const handlePagination = (value: number) => {
    setPagination((prev: IPagination) => ({ ...prev, currentPage: value }));
    console.log(pagination);
  };

  const handleSearchFormData = (event: any) => {
    setSearch(event.target.value);
    setPagination((prev: IPagination) => ({
      ...prev,
      search: event.target.value,
    }));
  };

  const handleSearchOnClick = (event: any) => {
    if (pagination.search === "") {
      getPageArticles({ setIsLoading, setArticles, pagination, setPagination });
    } else {
      getSearchArticles({
        setIsLoading,
        setArticles,
        pagination,
        setPagination,
      });
    }
  };

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
                  <img
                    className="object-cover h-60"
                    src={obj.src}
                    alt={obj.src}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>

        {/* TopBar start*/}
        <div className="my-6 border-0 border-red-200 w-full flex flex-row gap-x-5 items-center">
          {/* Searchbar */}
          <Searchbar
            searchData={search}
            handleSearchOnClick={handleSearchOnClick}
            handleOnChange={handleSearchFormData}
          />
          {/* Sort by */}
          <Selector
            title="เรียงตาม:"
            onChange={(e: any) => e.target.value}
            options={sortOptions}
          />
          {/* Types */}
          <Selector
            title="หมวดหมู่:"
            onChange={(e: any) => e.target.value}
            options={typeOptions}
          />
        </div>
        {/* TopBar end*/}
        <div
          className="flex flex-col gap-2 w-full"
          style={{ minHeight: "400px" }}
        >
          {isLoading ? (
            <>Loading</>
          ) : (
            <>
              {articles.length === 0 ? (
                <div className="flex flex-row justify-center items-center m-16">
                  ไม่มีเนื้อหา Post
                </div>
              ) : (
                <>
                  {articles.map((article, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Card article={article} />
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full my-3 shadow">
          <Pagination
            pagination={pagination}
            handleOnClick={handlePagination}
          />
        </div>

        {/* content end */}
      </div>
    </div>
  );
};

export default HomePage;
