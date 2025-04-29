import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { RefillContext } from "../Entity/Services/RefillContext";
import { getAuth } from "firebase/auth";
import styles from "../Layout/ManageScreenStyles";

const ManageScreen = ({ navigation }) => {
  const { refillDataList } = useContext(RefillContext);
  const Firebase_auth = getAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const filteredRefills = refillDataList.filter((refill) =>
    refill.supplementName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage</Text>

      <TouchableOpacity
        style={styles.refillRemindersButton}
        onPress={toggleModal}
      >
        <Text style={styles.refillRemindersText}>Refill Reminders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Refill Reminders</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search Refill Reminders"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />

            <FlatList
              data={filteredRefills}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                const isAlertPoint =
                  item.currentQuantity === item.alertQuantity;
                const isLow = item.currentQuantity <= item.alertQuantity;

                return (
                  <View style={styles.refillReminderItem}>
                    <Text style={styles.refillName}>{item.supplementName}</Text>
                    <Text>Current: {item.currentQuantity}</Text>
                    <Text>Alert At: {item.alertQuantity}</Text>

                    {isAlertPoint && (
                      <Text style={styles.alertText}>
                        ⚠️ Reorder point reached!
                      </Text>
                    )}
                  </View>
                );
              }}
              ListEmptyComponent={<Text>No refill reminders set yet.</Text>}
            />

            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageScreen;
