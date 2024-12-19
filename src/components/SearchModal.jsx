import React from "react";
import { LuSearch } from "react-icons/lu";

function SearchModal() {
  return (
    <div className="w-[810px] h-[409px] p-5 flex flex-col">
      <div className="flex items-center justify-start gap-3 h-[35px] px-1 text-[#a1a1a1]">
        <div>
          <LuSearch className="text-xl text-white" />
        </div>
        <input type="text" autoFocus={true} className="tracking-tight bg-transparent w-full text-lg text-white placeholder:text-[#a1a1a1]" placeholder="Project name, Task name, Template name or Keywords..." />
      </div>
      <div className="w-full flex-1 mt-5 flex items-start justify-start gap-5">
        <div className="w-1/3 h-full flex">
        </div>
        <div className="w-2/3 h-full bg-green-500"></div>
      </div>
    </div>
  );
}

export default SearchModal;
