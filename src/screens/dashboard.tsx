import React, { FC, useEffect, useState } from "react";
import firebase from "firebase";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { ApprovalRender, Button } from "../components";
import { FlatList } from "react-native-gesture-handler";

const App: FC = (props) => {
  const [posts, setPosts] = useState<any>(null);

  const fetchPendingPosts = async () => {
    firebase
      .firestore()
      .collection("posts")
      .where("approved", "==", false)
      .onSnapshot((querySnapShot) => {
        const documents = querySnapShot.docs;
        setPosts(documents);
      });
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const onApprove = async (id: string) => {
    const posts = await firebase.firestore().collection("posts").doc(id).get();
    posts.ref.set({ approved: true }, { merge: true });
  };
  const onReject = async (id: string) => {
    await firebase.firestore().collection("posts").doc(id).delete();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="back"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text>Dashboard</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <ApprovalRender
            message={item.data().msg}
            timestamp={item.data().timestamp}
            approved={item.data().approved}
            onApprove={() => onApprove(item.id)}
            onReject={() => onReject(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
