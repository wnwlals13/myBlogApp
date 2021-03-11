import React, { createRef, useEffect } from "react";

const Comments = ({ postsId }) => {
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
  }, []);
  return <div className="comments" ref={commentRef}></div>;
};
export default Comments;
