import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostItem from '../PostItem';
import { Post } from '../../types/types';

const mockPost: Post = {
  id: 1,
  userId: 1,
  title: 'Test Post',
  body: 'This is a test post body',
};

describe('PostItem', () => {
  it('renders correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<PostItem post={mockPost} onPress={mockOnPress} />);
    
    expect(getByText('Test Post')).toBeTruthy();
    expect(getByText('This is a test post body')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<PostItem post={mockPost} onPress={mockOnPress} />);
    
    fireEvent.press(getByText('Test Post'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
