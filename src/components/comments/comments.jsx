import React, { createRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Comments = ({ postsId }) => {
  const history = useHistory();
  const commentRef = createRef();
  useEffect(() => {
    const utterances = document.createElement("script");
    const utterancesConfig = {
      src: "https://utteranc.es/client.js",
      repo: "wnwlals13/blog-comment",
      "issue-term": postsId,
      label: "comments",
      theme: "github-light",
      crossorigin: "anonymous",
      async: true,
    };
    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    commentRef.current.appendChild(utterances);
  }, [postsId, commentRef]);
  return <div className="comments" ref={commentRef}></div>;
};
export default Comments;
