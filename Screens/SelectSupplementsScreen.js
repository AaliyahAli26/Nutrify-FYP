import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import styles from "../Layout/SelectSupplementScreenStyles";

const SelectSupplementsScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackText}>{"< Back"}</Text>
      </TouchableOpacity>

      <Image
        source={require("../assets/fyp9.png")}
        style={styles.SuppIconImage}
      />

      <Text style={styles.heading}>Supplement Name</Text>
      <Text style={styles.heading1}>
        What supplement would you like to add?
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your supplement name"
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("DosageScreen", { supplementName: query })
          }
        >
          <Text style={styles.addButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectSupplementsScreen;
