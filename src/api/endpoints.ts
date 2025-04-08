import client from './client';

export const getPosts = () => client.get('/posts');
export const getComments = (postId: number) => client.get(`/posts/${postId}/comments`);
export const updateComment = (commentId: number, data: { body: string }) =>
  client.put(`/comments/${commentId}`, data);
