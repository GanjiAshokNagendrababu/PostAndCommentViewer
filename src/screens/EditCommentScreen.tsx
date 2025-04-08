import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { editComment } from '../store/slices/commentsSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Loader from '../components/Loader';

type Props = NativeStackScreenProps<RootStackParamList, 'EditComment'>;

const EditCommentScreen = ({ route, navigation }: Props) => {
  const { comment } = route.params;
  const [body, setBody] = useState(comment.body);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleSubmit = () => {
    dispatch(editComment({ commentId: comment.id, body }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Comment updated successfully');
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert('Error', 'Failed to update comment');
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Comment:</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        value={body}
        onChangeText={setBody}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    minHeight: 100,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditCommentScreen;
