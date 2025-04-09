import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CommentItem from '../src/components/CommentItem';
import { Comment } from '../src/types/types';

const mockComment: Comment = {
  id: 1,
  postId: 1,
  name: 'Test User',
  email: 'test@example.com',
  body: 'This is a test comment',
};

describe('CommentItem', () => {
  it('renders correctly', () => {
    const mockOnEdit = jest.fn();
    const { getByText } = render(<CommentItem comment={mockComment} onEdit={mockOnEdit} />);

    expect(getByText('Test User')).toBeTruthy();
    expect(getByText('test@example.com')).toBeTruthy();
    expect(getByText('This is a test comment')).toBeTruthy();
    expect(getByText('Edit')).toBeTruthy();
  });

  it('calls onEdit when edit button is pressed', () => {
    const mockOnEdit = jest.fn();
    const { getByText } = render(<CommentItem comment={mockComment} onEdit={mockOnEdit} />);

    fireEvent.press(getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalled();
  });
});
