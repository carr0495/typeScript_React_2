import { useLinkProps } from "@react-navigation/native";
import firebase from "firebase";
import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input, Button } from "../components";

const App: FC = (props) => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const signUp = async () => {
    if (name && email && password) {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        if (user) {
          await firebase
            .firestore()
            .collection("users")
            .doc(user.user?.uid)
            .set({ name, email, password });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Error", "Missing Fields");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <Input placeholder="Name" OnChangeText={(text) => setName(text)} />
      <Input placeholder="Email" OnChangeText={(text) => setEmail(text)} />
      <Input
        placeholder="Password"
        OnChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={signUp} />
      <View style={styles.loginText}>
        <Text style={{ marginHorizontal: 5 }}>Already Have an Account?</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("login")}
          style={{ marginHorizontal: 5 }}
        >
          <Text style={{ color: "blue" }}>Login Here!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    flexDirection: "row",
    marginVertical: 20,
  },
});
