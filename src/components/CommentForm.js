import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentIsPending } from "../features/comments/commentsSlice";
import { postCommentForArticleId } from "../features/comments/commentsSlice";

export default function CommentForm({ articleId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const isCreatePending = useSelector(createCommentIsPending);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      postCommentForArticleId({ articleId: articleId, comment: comment })
    );
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="comment" className="label">
        Add Comment:
      </label>
      <div id="input-container">
        <input
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          type="text"
        />
        <button className="comment-button" disable={isCreatePending}>
          Submit
        </button>
      </div>
    </form>
  );
}
