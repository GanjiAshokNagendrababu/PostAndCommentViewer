import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Comment } from '../types/types';

interface CommentItemProps {
  comment: Comment;
  onEdit: () => void;
}

const CommentItem: React.FC<CommentItemProps> = memo(({ comment, onEdit }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{comment.name}</Text>
    <Text style={styles.email}>{comment.email}</Text>
    <Text style={styles.body}>{comment.body}</Text>
    <TouchableOpacity onPress={onEdit} style={styles.editButton}>
      <Text style={styles.editButtonText}>Edit</Text>
    </TouchableOpacity>
  </View>
));

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    marginBottom: 8,
  },
  editButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default CommentItem;
