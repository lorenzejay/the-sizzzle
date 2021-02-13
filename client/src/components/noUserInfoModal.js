import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiUserCheck } from "react-icons/bi";

export default function NoUserInfoModalPopup({ showModal, setShowModal }) {
  console.log(showModal);
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0  shadow-lg relative flex flex-col items-center justify-center w-full bg-white outline-none focus:outline-none  h-screen sm:h-auto pt-18">
                {/*header*/}
                <div className="flex flex-col justify-between p-6">
                  <h3 className="text-3xl font-semibold text-center">
                    Create an account to save or like this post.
                  </h3>
                  <p className="text-center mt-3">Save posts to your personalized bookmarks.</p>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-5 flex flex-col justify-center items-center gap-4">
                  <Link
                    to="/login"
                    className="border border-opacity-50 border-gray-700 px-12 py-1 w-48 hover:bg-red-200 transition-all duration-500 flex items-center justify-center gap-2"
                  >
                    <span>
                      <BiUserCheck />
                    </span>
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    className="border border-opacity-50 border-gray-700 px-12 py-1 w-48 hover:bg-red-200 transition-all duration-500 flex items-center justify-center gap-2"
                  >
                    <span>
                      <AiOutlineMail />{" "}
                    </span>
                    Sign up
                  </Link>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 ">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
