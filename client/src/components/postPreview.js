import React from "react";
import { Link } from "react-router-dom";
import UploaderProfileBar from "./uploaderProfileBar";

const UploadPreview = ({ post }) => {
  const diffTime = (dt1, dt2) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;

    if (Math.abs(Math.round(diff)) < 1) {
      return `${Math.abs(Math.round(diff * 60))} minutes ago`;
    }
    if (Math.abs(Math.round(diff)) < 24) {
      return `${Math.abs(Math.round(diff))} hours ago`;
    }
    var day_difference = (dt2.getTime() - dt1.getTime()) / 1000 / 60 / 60 / 24;
    return `${Math.round(day_difference)} days ago`;
  };
  const dt1 = new Date(post.created_at);
  const dt2 = new Date();
  return (
    <>
      <UploaderProfileBar uploaded_by={post.uploaded_by} />
      <Link to={`/post/${post.upload_id}`} className="mx-auto" key={post.upload_id}>
        <img
          src={post.image_url}
          loading="lazy"
          className="object-cover w-full"
          alt="user upload thumnails"
        />
        <div className=" lg:p-0 mt-3">
          <h3 className="text-xl">{post.title}</h3>
          <h3 className="text-lg">{post.caption}</h3>
          <p className="text-sm text-gray-500">{diffTime(dt1, dt2)} </p>
        </div>
      </Link>
    </>
  );
};

export default UploadPreview;
