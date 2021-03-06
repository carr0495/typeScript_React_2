import React, { FC, useEffect, useState } from "react";
import firebase from "firebase";
import { View, Text, StyleSheet, Alert, SafeAreaView } from "react-native";
import { Button, Input, Posts } from "../components";
import { FlatList } from "react-native-gesture-handler";

const App: FC = (props) => {
  const [msg, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any>(null);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const fetchCurrentUser = async () => {
    const uid = firebase.auth().currentUser?.uid;
    const user = await firebase.firestore().collection("users").doc(uid).get();
    setUser({ id: user.id, ...user.data() });
  };

  const fetchPosts = async () => {
    firebase
      .firestore()
      .collection("posts")
      .where("approved", "==", true)
      .onSnapshot((querySnapShot) => {
        const documents = querySnapShot.docs;
        setPosts(documents);
      });
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchPosts();
  }, []);

  const post = async () => {
    if (msg) {
      const data = {
        msg,
        timestamp: Date.now(),
        approved: false,
      };

      try {
        await firebase.firestore().collection("posts").add(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Missing Fields");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      {posts && posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Posts
              message={item.data().msg}
              timestamp={item.data().timestamp}
              approved={item.data().approved}
            />
          )}
        />
      ) : (
        <View>
          <Text>Nothing to Display</Text>
        </View>
      )}
      <Button title="Sign Out" onPress={signOut} />
      <View>
        <Input
          placeholder="write something here"
          OnChangeText={(text) => setMessage(text)}
        />
        <Button title="Post" onPress={post} />
      </View>
      {user ? (
        user.isAdmin ? (
          <View>
            <Button
              title="Dashboard"
              onPress={() => props.navigation.navigate("Dashboard")}
            />
          </View>
        ) : null
      ) : null}
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
