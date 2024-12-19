import React from "react";
import { LuSearch } from "react-icons/lu";

function SearchModal() {
  return (
    <div className="w-[810px] h-[409px] p-4 flex flex-col">
      <div className="flex items-center justify-start gap-3 h-[45px] px-3">
        <div>
          <LuSearch className="text-2xl" />
        </div>
        <input type="text" className="bg-transparent w-full text-lg text-white placeholder:text-[#9b9b9b]" placeholder="Project name, Task name, Template name or Keywords..." />
      </div>
    </div>
  );
}

export default SearchModal;
