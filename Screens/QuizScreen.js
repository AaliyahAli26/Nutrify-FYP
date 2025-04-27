import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  ImageBackground,
} from "react-native";
import styles from "../Layout/QuizScreenStyles";
import { questionsData } from "../Entity/Components/QuizQuestions";

const QuizScreen = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [plantHealth] = useState(new Animated.Value(0));

  const handleAnswer = (key, value) => {
    const updatedAnswers = { ...answers, [key]: value.toLowerCase() };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuiz(updatedAnswers);
    }
  };

  const submitQuiz = (userAnswers) => {
    let suggested = [];
    let tests = [];

    // Energy/Fatigue
    if (
      userAnswers.energy === "yes, daily" &&
      userAnswers.sleep === "poor (wake up tired)"
    ) {
      suggested.push({
        name: "Magnesium + B-Complex",
        reason: "Helps convert food to energy and improves sleep quality",
        tests: [
          "Vitamin D",
          "Ferritin (iron stores)",
          "Thyroid panel (TSH, Free T3/T4)",
        ],
      });
    }

    // Stress/Mood
    if (userAnswers.stress === "daily" || userAnswers.mood === "often") {
      suggested.push({
        name: "Ashwagandha + Omega-3",
        reason: "Reduces cortisol and supports brain function",
        tests: ["Cortisol (saliva test)", "Omega-3 Index", "Homocysteine"],
      });
    }

    // Vitamin Deficiencies
    if (userAnswers.diet === "0-1" || userAnswers.sun === "rarely") {
      suggested.push({
        name: "Multivitamin + Vitamin D3",
        reason: "Fills nutritional gaps from poor diet/sun exposure",
        tests: ["Vitamin D 25-OH", "B12", "Magnesium RBC"],
      });
    }

    // Hair/Skin/Nails
    if (userAnswers.hair === "yes" || userAnswers.skin === "yes") {
      suggested.push({
        name: "Biotin + Zinc",
        reason: "Supports keratin production and skin health",
        tests: ["Zinc plasma", "Ferritin", "Thyroid antibodies"],
      });
    }

    // Gut Health
    if (userAnswers.digestion === "often") {
      suggested.push({
        name: "Probiotic + Digestive Enzymes",
        reason: "Improves gut flora and nutrient absorption",
        tests: ["GI-MAP stool test", "SIBO breath test"],
      });
    }

    setSuggestions(suggested);
    setQuizCompleted(true);
    Animated.timing(plantHealth, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSuggestions([]);
    setQuizCompleted(false);
    plantHealth.setValue(0);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <ImageBackground
        source={require("../assets/quiz.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.startContainer}>
            <Text style={styles.title}>NUTRIFY QUIZ</Text>
            <Text style={styles.subtitle}>
              Discover Your Personalized Supplement Needs
            </Text>

            <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
              <Text style={styles.startButtonText}>START QUIZ</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Your answers will help us recommend the best supplements for your
              needs
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/quiz.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {!quizCompleted ? (
          <View style={styles.quizCard}>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                {currentQuestionIndex + 1}/{questionsData.length}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        ((currentQuestionIndex + 1) / questionsData.length) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
            </View>

            <Text style={styles.questionText}>
              {questionsData[currentQuestionIndex].question}
            </Text>

            <View style={styles.optionsContainer}>
              {questionsData[currentQuestionIndex].options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionButton}
                  onPress={() =>
                    handleAnswer(
                      questionsData[currentQuestionIndex].key,
                      option
                    )
                  }
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.resultContainer}>
            <Text style={styles.resultTitle}>
              Your Supplement Reccomendations
            </Text>

            {suggestions.length > 0 ? (
              suggestions.map((supp, i) => (
                <View key={i} style={styles.supplementCard}>
                  <Text style={styles.supplementName}>{supp.name}</Text>
                  <Text style={styles.reason}>{supp.reason}</Text>

                  <Text style={styles.testHeader}>Recommended Tests:</Text>
                  {supp.tests.map((test, j) => (
                    <Text key={j} style={styles.testItem}>
                      • {test}
                    </Text>
                  ))}
                </View>
              ))
            ) : (
              <View style={styles.supplementCard}>
                <Text style={styles.supplementName}>
                  No supplements needed!
                </Text>
                <Text style={styles.reason}>
                  Your current lifestyle seems balanced. Consider these general
                  tests:
                </Text>
                <Text style={styles.testItem}>• Vitamin D 25-OH</Text>
                <Text style={styles.testItem}>
                  • CBC (Complete Blood Count)
                </Text>
                <Text style={styles.testItem}>• Basic Metabolic Panel</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.restartButton}
              onPress={restartQuiz}
            >
              <Text style={styles.restartText}>Retake Quiz</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

export default QuizScreen;
