import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

function Projects() {
  const { workspaceId } = useParams();
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [pageTitle, setPageTitle] = useState("Workspace 1");
  const inputRef = useRef(null);
  // spaces
  const [w1, setW1] = useState(null);
  //   const [myWorkSpaces, setMyWorkSpaces] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("upfront_user");
    localStorage.removeItem("upfront_user_name");
    localStorage.removeItem("upfront_ws");
    localStorage.removeItem("mycollaborations");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  // page title
  useEffect(() => {
    const getme = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getme`, {
          params: { email: userEmail },
        });
        // console.log(response)
      } catch (error) {
        // console.log(error)
        if (error.response.status == 401) {
          handleLogout();
        }
      }
    };
    const getmyProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getmyprojects`, {
          params: { email: userEmail },
        });
        setMyProjects(response.data.projects);
        setFetchingProjects(false);
      } catch (error) {
        // console.log(error)
        if (error.response.status == 401) {
          handleLogout();
        }
      }
    };
    getmyProjects();
    getme();
  }, []);

  const handleScroll = () => {
    const content = contentRef.current;
    if (content) {
      setCanScrollLeft(content.scrollLeft > 0);

      // Adjust the calculation to ensure precision
      const isAtEnd =
        Math.ceil(content.scrollLeft + content.clientWidth) >=
        content.scrollWidth;

      setCanScrollRight(!isAtEnd);
    }
  };

  const scrollLeft = () => {
    contentRef.current?.scrollBy({
      left: -200, // Adjust scroll distance as needed
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    contentRef.current?.scrollBy({
      left: 200, // Adjust scroll distance as needed
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Initial check for scrollable buttons
    handleScroll();
  }, []);

  return (
    <div className="w-full dark:bg-dark-body dark:text-[#b8b8b8] flex items-start justify-start relative">
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          className: "",
          duration: 2300,
          style: {
            background: "#252525da",
            color: "#d4d4d4",
            fontSize: "14px",
            fontWeight: "500",
            padding: "7px",
            borderRadius: "12px",
            backdropFilter: "blur(5px)",
            border: "1px solid #32323230",
          },
          success: {
            style: {
              padding: "7px 7px 7px 12px",
            },
            iconTheme: {
              primary: "#3b883e",
              secondary: "#fff",
            },
          },
          error: {
            style: {
              padding: "7px 7px 7px 12px",
            },
          },
        }}
      />
      <Sidebar
        username={username}
        userEmail={userEmail}
        w1={w1}
        setW1={setW1}
      />
      <div
        className={`w-full h-full min-h-svh flex-1 text-text-color bg-stone-50 dark:bg-dark-body transition-all duration-500 ease-in-out z-10 overflow-clip flex items-start justify-start p-1`}
      >
        {/* Left Button */}
        {canScrollLeft && (
          <div className="nextSpace w-[80px] h-full absolute top-0 left-5 max-xl:left-0 bg-gradient-to-r max-xl:pl-2 from-white via-white to-transparent z-20 flex items-center justify-start">
            <button
              onClick={scrollLeft}
              className="h-[30px] w-auto aspect-square ring-1 ring-stone-200 hover:ring-stone-400 flex items-center justify-center rounded-full"
            >
              <LuChevronLeft className="text-xl" />
            </button>
          </div>
        )}
        {/* Right Button */}
        {canScrollRight && (
          <div className="prevSpace w-[80px] h-full absolute top-0 right-5 max-xl:right-0 bg-gradient-to-l max-xl:pr-2 from-white via-white to-transparent z-20 flex items-center justify-end">
            <button
              onClick={scrollRight}
              className="h-[30px] w-auto aspect-square ring-1 ring-stone-200 hover:ring-stone-400 flex items-center justify-center rounded-full"
            >
              <LuChevronRight className="text-xl" />
            </button>
          </div>
        )}
        {/* content */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className={`flex-1 w-auto h-fit bg-red-200 flex gap-5 pt-4 pb-1 hidden_scrollbar `}
        >
          {[...Array(25)].map((space, index) => (
            <button
              key={index}
              // onClick={() => handleChooseSpace(space.type)}
              className={` outline-none min-w-fit w-fit h-fit relative`}
            >
              <div className="group w-full h-full flex flex-col justify-center items-center gap-2 relative cursor-pointer pb-2">
                <div className="text-xl">icon</div>
                <h1 className="min-w-[60px] text-center text-sm tracking-tight leading-4 max-md:text-xs font-medium mb-0 whitespace-nowrap">
                  type
                </h1>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Projects;
