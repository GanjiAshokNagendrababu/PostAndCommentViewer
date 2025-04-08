import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsScreen from '../screens/PostsScreen';
import CommentsScreen from '../screens/CommentsScreen';
import EditCommentScreen from '../screens/EditCommentScreen';
import { Comment } from '../types/types';

export type RootStackParamList = {
  Posts: undefined;
  Comments: { postId: number };
  EditComment: { comment: Comment };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Posts" component={PostsScreen} options={{ title: 'Posts' }} />
      <Stack.Screen name="Comments" component={CommentsScreen} options={{ title: 'Comments' }} />
      <Stack.Screen
        name="EditComment"
        component={EditCommentScreen}
        options={{ title: 'Edit Comment' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
