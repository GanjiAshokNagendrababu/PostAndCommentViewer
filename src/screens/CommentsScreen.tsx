import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchComments } from '../store/slices/commentsSlice';
import CommentItem from '../components/CommentItem';
import Loader from '../components/Loader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Comment } from '../types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Comments'>;

const CommentsScreen = ({ route, navigation }: Props) => {
  const { postId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, error } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleEditComment = (comment: Comment) => {
    navigation.navigate('EditComment', { comment });
  };

  if (loading && comments.length === 0) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            onEdit={() => handleEditComment(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CommentsScreen;
