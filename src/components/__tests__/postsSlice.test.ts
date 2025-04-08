import postsReducer, { fetchPosts } from '../postsSlice';
import { Post } from '../../../types/types';

describe('postsSlice', () => {
  const initialState = {
    posts: [],
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(postsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchPosts.pending', () => {
    const action = { type: fetchPosts.pending.type };
    const state = postsReducer(initialState, action);
    expect(state).toEqual({
      posts: [],
      loading: true,
      error: null,
    });
  });

  it('should handle fetchPosts.fulfilled', () => {
    const mockPosts: Post[] = [
      { id: 1, userId: 1, title: 'Test Post', body: 'Test Body' },
    ];
    const action = { type: fetchPosts.fulfilled.type, payload: mockPosts };
    const state = postsReducer(initialState, action);
    expect(state).toEqual({
      posts: mockPosts,
      loading: false,
      error: null,
    });
  });

  it('should handle fetchPosts.rejected', () => {
    const error = 'Failed to fetch posts';
    const action = { type: fetchPosts.rejected.type, error: { message: error } };
    const state = postsReducer(initialState, action);
    expect(state).toEqual({
      posts: [],
      loading: false,
      error: error,
    });
  });
});