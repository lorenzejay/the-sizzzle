import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";
import PaddingWrapper from "../components/paddingWrapper";
import UploaderProfileBar from "../components/uploaderProfileBar";
import { getUploadDetails, updateUpload } from "../redux/Actions/uploadActions";
import * as Showdown from "showdown";
import dompurify from "dompurify";
import RichTextEditor from "../components/richTextEditor";
import ErrorMessage from "../components/errorMessage";
import Button from "../components/button";

const EditUpload = ({ location }) => {
  const dispatch = useDispatch();
  const path = location.pathname;
  const uploadIdFromPath = path.substring(11, path.length);

  const uploadDetails = useSelector((state) => state.uploadDetails);
  const { details, loading, error } = uploadDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sanitizer = dompurify.sanitize;
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [updateError, setUpdateError] = useState("");
  useEffect(() => {
    if (userInfo) {
      dispatch(getUploadDetails(uploadIdFromPath));
    }
  }, [dispatch]);

  useEffect(() => {
    if (details) {
      setDescription(details.description);
      setCaption(details.caption);
      setTitle(details.title);
    }
  }, [details]);

  //convert markdown to html function
  const [mdToHtml, setMdToHtml] = useState();

  useEffect(() => {
    if (details) {
      var html = details && converter.makeHtml(details.description);
      setMdToHtml(html);
    }
  }, [details]);

  const convertDate = (date) => {
    // return new Date(date).toString().slice(4, 15).replaceAt(6, ", ");
    return new Date(date).toLocaleString().slice(0, 8);
  };

  const updateUploadPost = (e) => {
    e.preventDefault();
    if (title !== "" && caption !== "" && description !== "") {
      dispatch(updateUpload(title, caption, description, uploadIdFromPath));
      setUpdateError("");
      window.location.reload();
    } else {
      setUpdateError("Title, caption and description cannot be blank.");
    }
  };

  details && console.log(title);
  return (
    <Layout>
      {details && (
        <PaddingWrapper>
          {updateError && <ErrorMessage>{updateError}</ErrorMessage>}
          <form onSubmit={updateUploadPost}>
            <input
              placeholder="Title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className="border-none text-3xl w-full"
            />
            <div className="flex items-center gap-5">
              <UploaderProfileBar uploaded_by={details.uploaded_by} className="w-full " />
              <p className="my-4 pb-3 text-gray-400">{convertDate(details.created_at)}</p>
            </div>
            <img src={details.image_url} className="relative object-cover max-h-screen w-full" />

            <div className=" md:px-0">
              <input
                placeholder="caption"
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="border-none text-xl mt-5 mb-2 w-full"
              />
              <div
                dangerouslySetInnerHTML={{ __html: sanitizer(mdToHtml) }}
                className="post-description text-xl"
              ></div>
            </div>
            <RichTextEditor
              className="w-full md:w-full mt-10"
              description={description}
              setDescription={setDescription}
            />
            <Button type="submit">Update</Button>
          </form>
        </PaddingWrapper>
      )}
    </Layout>
  );
};

export default EditUpload;
