import React from "react";
import { useEffect, useState } from "react";
import { getAnnouncement } from "../AnnoucementFormPage/services/announcementServices";
type Props = {};

const AnnoucementPage = (props: Props) => {
  const [banners, setBanners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLoading === false) {
      getAnnouncement({ setIsLoading }).then((res) => {
        if (res !== null) {
          setBanners(res);
        }
      });
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  px-2"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="border-0 border-red-200 w-full mt-24"></div>
        <h2 className="w-full pt-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600">
          ประชาสัมพันธ์
        </h2>
        <div className="flex flex-col gap-5">
          {banners.map((banner: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <h4 className="mt-7">ประชาสัมพันธ์ที่ {index + 1}</h4>
                <img src={banner.imageUrl} alt="annoucement" />
                <div className="w-full" style={{ minHeight: "200px" }}>
                  {banner.content}
                </div>
                <hr />
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default AnnoucementPage;
