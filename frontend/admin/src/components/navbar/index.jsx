import React from "react";

import { useState } from "react";
import Dropdown from "components/dropdown";
// import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
// import navbarimage from "assets/img/layout/Navbar.png";
// import { BsArrowBarUp } from "react-icons/bs";
// import { FiSearch } from "react-icons/fi";
// import { RiMoonFill, RiSunFill } from "react-icons/ri";
// import {
//   IoMdNotificationsOutline,
//   IoMdInformationCircleOutline,
// } from "react-icons/io";
import avatar from "assets/img/avatars/th.jpeg";
import { authServices } from "../../services/auth";
// import Dashboard from "views/admin/dashboard";
// import ProfileOverview from "./views/admin/profile";

const Navbar = (props) => {

  const userData = authServices.getCurrentUser();
  const [fullname] = useState(userData.fullname ? userData.fullname : '');

  const { brandText } = props;
  // const [darkmode, setDarkmode] = useState(false);
  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   const currentUser = authServices.getCurrentUser();
  //   setUser(currentUser);
  // }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    await authServices.logout();
  }


  return (
    <nav className="sticky top-0 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        {
          brandText !== "Dashboard" &&

          <div className="h-6 w-[300px] pt-1 flex">
            <a
              className="text-sm font-normal text-navy-700 dark:text-white dark:hover:text-white"
              href="/admin/dashboard "
            >
              Dashboard
              <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                {" "}
                /{" "}
              </span>
            </a>
            {props.isInnerPage && props.innerPageText !== '' ?
              <>
                <a
                  className="text-sm font-normal text-navy-700 dark:text-white dark:hover:text-white"
                  href={props.parentPageUrl}
                >{brandText}</a>
                <p className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                  {" "}
                  /{" "}{props.innerPageText}
                </p>
              </>
              : <p className="text-sm font-normal capitalize text-navy-700 dark:text-white dark:hover:text-white">{brandText}</p>}
          </div>
        }
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>
      <Dropdown
        button={
          <img
            className="h-10 w-10 rounded-full"
            src={userData.profileImg && userData.profileImg !== '' ? userData.profileImg : avatar}
            alt={fullname}
          />
        }
        children={
          <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  👋{fullname}
                </p>{" "}
              </div>
            </div>
            <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

            <div className="flex flex-col p-4">
              <a
                href="/admin/profile"
                className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                My Profile
              </a>
              <a
                href="/admin/change-password"
                className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Change Password
              </a>
              <a
                href=" "
                className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
              >
              </a>
              <a href="./login" onClick={handleLogout} className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"> Log Out </a>
            </div>
          </div>
        }
        classNames={"py-2 top-8 -left-[180px] w-max"}
      />
      {/* // </div> */}
    </nav>
  );
};

export default Navbar;
