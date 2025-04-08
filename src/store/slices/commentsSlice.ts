import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/types';
import { getComments, updateComment } from '../../api/endpoints';

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await getComments(postId);
    return response.data;
  }
);

export const editComment = createAsyncThunk(
  'comments/editComment',
  async ({ commentId, body }: { commentId: number; body: string }) => {
    const response = await updateComment(commentId, { body });
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(editComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComment = action.payload;
        state.comments = state.comments.map(comment =>
          comment.id === updatedComment.id ? updatedComment : comment
        );
      })
      .addCase(editComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update comment';
      });
  },
});

export default commentsSlice.reducer;
