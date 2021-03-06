import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from ".";

const { width, height } = Dimensions.get("screen");

interface Props {
  message: string;
  approved: boolean;
  timestamp: number;
}

const formatTime = (timeStamp: number): string => {
  const calculatedTime = Date.now() - timeStamp;
  if (calculatedTime > 1000) return `${calculatedTime / 1000} s`;
  if (calculatedTime / 1000 > 60) return `${calculatedTime / 1000 / 60} min`;
  if (calculatedTime / 1000 / 60 > 60)
    return `${calculatedTime / 1000 / 60 / 60} hour`;
  else return `${calculatedTime / 1000 / 60 / 60 / 24}d`;
};
const App: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.message}>{props.message}</Text>
        <Text style={styles.time}>{formatTime(props.timestamp)}</Text>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: "#ccc",
    shadowOpacity: 0.9,
  },
  message: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  time: {
    textAlign: "center",
    marginVertical: 5,
  },
  buttonBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
