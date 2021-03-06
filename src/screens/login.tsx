import React, { FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input, Button } from "../components";

const App: FC = (props) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <Input placeholder="Email" OnChangeText={(text) => setEmail(text)} />
      <Input
        placeholder="Password"
        OnChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={() => alert("pressed")} />
      <View style={styles.loginText}>
        <Text style={{ marginHorizontal: 5 }}>Don't Have an Account?</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("signup")}
          style={{ marginHorizontal: 5 }}
        >
          <Text style={{ color: "blue" }}>Sign up Here</Text>
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
