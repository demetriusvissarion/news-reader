import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCommentsForArticleId = createAsyncThunk(
  "comments/fetchAllComments",
  async (id) => {
    const response = await fetch(`api/articles/${id}/comments`);
    const json = await response.json();
    return json;
  }
);

// Create postCommentForArticleId here.

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
  },
  extraReducers: {
    [loadCommentsForArticleId.pending]: (state, action) => {
      state.isLoadingComments = true;
      state.failedToLoadComments = false;
    },

    [loadCommentsForArticleId.fulfilled]: (state, action) => {
      state.byArticleId = {
        [action.payload.articleId]: action.payload.comments,
      };
      state.isLoadingComments = false;
      state.failedToLoadComments = false;
    },

    [loadCommentsForArticleId.rejected]: (state, action) => {
      state.isLoadingComments = false;
      state.failedToLoadComments = true;
    },

    // postCommmentForArticleId
    // [postCommentForArticleId.pending]: (state, action) => {
    //   state.createCommentIsPending = true;
    //   state.failedToCreateComment = false;
    // },

    // [postCommentForArticleId.fulfilled]: (state, action) => {
    //   const articleId = action.payload.articleId;
    //   state.byArticleId[articleId].push(action.payload);

    //   state.createCommentIsPending = false;
    //   state.failedToCreateComment = false;
    // },

    // [postCommentForArticleId.rejected]: (state, action) => {
    //   state.createCommentIsPending = false;
    //   state.failedToCreateComment = true;
    // },
  },
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) =>
  state.comments.createCommentIsPending;

export default commentsSlice.reducer;
