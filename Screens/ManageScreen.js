import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { RefillContext } from "../Entity/Services/RefillContext";
import { getAuth } from "firebase/auth";
import styles from "../Layout/ManageScreenStyles";

const ManageScreen = ({ navigation }) => {
  const { refillDataList } = useContext(RefillContext);
  const Firebase_auth = getAuth();

  // Modal visibility state for Refill Reminders
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>

        {/* Refill Reminders Button */}
        <TouchableOpacity
          style={styles.refillRemindersButton}
          onPress={toggleModal}
        >
          <Text style={styles.refillRemindersText}>Refill Reminders</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Modal to show refill reminders */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Refill Reminders</Text>
              <ScrollView style={styles.modalScroll}>
                {refillDataList.length === 0 ? (
                  <Text>No refill reminders set yet.</Text>
                ) : (
                  refillDataList.map((refill, index) => {
                    const isAlertPoint =
                      refill.currentQuantity === refill.alertQuantity;
                    const isLow =
                      refill.currentQuantity <= refill.alertQuantity;

                    return (
                      <View key={index} style={styles.refillReminderItem}>
                        <Text style={styles.refillName}>
                          {refill.supplementName}
                        </Text>
                        <Text>Current: {refill.currentQuantity}</Text>
                        <Text>Alert At: {refill.alertQuantity}</Text>

                        {isAlertPoint && (
                          <Text style={styles.alertText}>
                            ⚠️ Reorder point reached!
                          </Text>
                        )}
                      </View>
                    );
                  })
                )}
              </ScrollView>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ManageScreen;
