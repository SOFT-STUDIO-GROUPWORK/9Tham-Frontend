import React from "react";

type Props = {};

const HomePage = (props: Props) => {
  // for line 8, 9 is my template (for resposive and get content inside)-> copy 2 lines to your page and edit "content"
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center mx-auto w-3/4 bg-slate-50" style={{height: "calc(100vh - 88px)"}}>

        {/* content start*/}
        <h1 className="text-2xl font-semibold mt-28">This is a Homepage</h1>
        <img
          src="https://i.makeagif.com/media/10-17-2017/OdqCXi.gif"
          className="my-10"
          alt=""
        />
        {/* content end */}

      </div>
    </div>
  );
};

export default HomePage;
