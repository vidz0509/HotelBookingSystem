// import Banner from "./components/Banner";
// import General from "./components/General";
// import Notification from "./components/Notification";
// import Project from "./components/Project";
// import Storage from "./components/Storage";
// import Upload from "./components/Upload";
import InputField from "components/fields/InputField";

const ProfileOverview = () => {
  
// import { FcGoogle } from "react-icons/fc";
// import Checkbox from "components/checkbox";

// export default function SignIn() {
  return (
    <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[1vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        {/* <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          My profile
        </h4> */}
        {/* <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p> */}
        {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div> */}
        {/* <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div> */}
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="fullname*"
          placeholder="profilename"
          id="email"
          type="text"
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="phone no*"
          placeholder="phone no"
          id="password"
          type="password"
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            {/* <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p> */}
          </div>
          {/* <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href="/auth/forgot-password"
          >
            Forgot Password?
          </a> */}
        </div>
        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" type="submit">
          Update
        </button>
        {/* <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div> */}
      </div>
    </div>
  );
}

  
  // return (
  //   <div className="flex w-full flex-col gap-5">
  //     <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
  //       <div className="col-span-4 lg:!mb-0">
  //         <Banner />
  //       </div>

  //       <div className="col-span-3 lg:!mb-0">
  //         <Storage />
  //       </div>

  //       <div className="z-0 col-span-5 lg:!mb-0">
  //         <Upload />
  //       </div>
  //     </div>
  //     {/* all project & ... */}

  //     <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
  //       <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
  //         <Project />
  //       </div>
  //       <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
  //         <General />
  //       </div>

  //       <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
  //         <Notification />
  //       </div>
  //     </div>
  //   </div>
  // );


export default ProfileOverview;
