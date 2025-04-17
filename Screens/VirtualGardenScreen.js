import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
} from "react-native";

const questions = [
  {
    question: "How many hours of sleep does an adult need daily?",
    options: ["4–5", "6–8", "10–12"],
    answer: "6–8",
  },
  {
    question: "Which vitamin is known as the sunshine vitamin?",
    options: ["Vitamin A", "Vitamin D", "Vitamin C"],
    answer: "Vitamin D",
  },
  {
    question: "How much water should you drink daily?",
    options: ["1 liter", "2–3 liters", "5 liters"],
    answer: "2–3 liters",
  },
  {
    question: "Which nutrient helps build muscle?",
    options: ["Carbs", "Protein", "Fats"],
    answer: "Protein",
  },
  {
    question: "What's a good source of healthy fats?",
    options: ["Avocados", "Candy", "White bread"],
    answer: "Avocados",
  },
];

const VirtualGardenQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [sunAnim] = useState(new Animated.Value(0));
  const [rainAnim] = useState(new Animated.Value(0));
  const [backgroundColor, setBackgroundColor] = useState("#eafaf1"); // default good background
  const [plantScale] = useState(new Animated.Value(1)); // default plant size
  const [sunRainToggle, setSunRainToggle] = useState(true); // Used to alternate sun/rain
  const [plantImage, setPlantImage] = useState(require("../assets/Sad.png"));

  const handleAnswer = (option) => {
    const isCorrect = option === questions[currentQ].answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      updatePlantImage(true);
      setFeedback("☀️ Your answer brought sunlight to your soul!");
      triggerSunOrRain();
      setBackgroundColor("#fff9c4"); // Light yellow for correct answer
    } else {
      updatePlantImage(false);
      setFeedback("🌧️ Oops! Your plant is withering. Try harder!");
      setBackgroundColor("#ffcdd2"); // Light red for wrong answer
      Animated.sequence([
        Animated.timing(plantScale, {
          toValue: 0.6,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(plantScale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
        setFeedback("");
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const updatePlantImage = (isCorrect) => {
    if (isCorrect) {
      if (score === 0) {
        setPlantImage(require("../assets/Okay.png"));
      } else if (score === 1) {
        setPlantImage(require("../assets/Happy.png"));
      }
    } else {
      setPlantImage(require("../assets/Sad.png"));
    }
  };

  const triggerSunOrRain = () => {
    // Alternate between sun and rain
    if (sunRainToggle) {
      triggerSun();
    } else {
      triggerRain();
    }
    setSunRainToggle(!sunRainToggle); // Toggle for next answer
  };

  const triggerSun = () => {
    sunAnim.setValue(0);
    Animated.timing(sunAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(sunAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    );
  };

  const triggerRain = () => {
    rainAnim.setValue(0);
    Animated.timing(rainAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(rainAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    );
  };

  const sunStyle = {
    transform: [
      {
        translateX: sunAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
      {
        translateY: sunAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-150, 0],
        }),
      },
    ],
    opacity: sunAnim,
  };

  const rainStyle = {
    transform: [
      {
        translateX: rainAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
      {
        translateY: rainAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-150, 0],
        }),
      },
    ],
    opacity: rainAnim,
  };

  const getPlantImage = () => {
    if (showResult) {
      return score > 3
        ? require("../assets/flower.png") // Bouquet for score > 3
        : require("../assets/dried.png"); // Dried plant if score <= 3
    }
    return plantImage; // during quiz, plant is updated based on answers
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>🌱 Nurture Your Soul Quiz</Text>

      <Animated.Image
        source={require("../assets/sun.png")}
        style={[styles.effectIcon, styles.sun, sunStyle]}
      />
      <Animated.Image
        source={require("../assets/rain.png")}
        style={[styles.effectIcon, styles.rain, rainStyle]}
      />

      <Animated.View style={{ transform: [{ scale: plantScale }] }}>
        <Image source={getPlantImage()} style={styles.plant} />
      </Animated.View>

      {!showResult ? (
        <>
          <Text style={styles.question}>{questions[currentQ].question}</Text>
          {questions[currentQ].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
        </>
      ) : (
        <>
          <Text style={styles.result}>
            You scored {score} / {questions.length} 🌟
          </Text>
          <Text style={styles.tip}>
            {score > 3
              ? "🎉 Yay, you did it! Keep nurturing your growth."
              : "💪 Keep working harder, your plant will thrive next time!"}
          </Text>
          <TouchableOpacity
            style={styles.restartBtn}
            onPress={() => {
              setCurrentQ(0);
              setScore(0);
              setShowResult(false);
              setFeedback("");
              setBackgroundColor("#eafaf1"); // Reset background to default
              setSunRainToggle(true); // Reset sun/rain toggle
              setPlantImage(require("../assets/Sad.png")); // Reset plant image
            }}
          >
            <Text style={styles.restartText}>🔁 Restart Quiz</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e7d32",
    textAlign: "center",
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#388e3c",
  },
  option: {
    backgroundColor: "#a5d6a7",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    width: "90%",
    marginBottom: 1,
  },
  optionText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#1b5e20",
  },
  feedback: {
    fontSize: 16,
    color: "#6a1b9a",
    marginTop: 20,
    textAlign: "center",
  },
  result: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b5e20",
    textAlign: "center",
  },
  tip: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    color: "#4caf50",
    marginVertical: 20,
  },
  restartBtn: {
    backgroundColor: "#ffeb3b",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
  },
  restartText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b5e20",
  },
  plant: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  effectIcon: {
    position: "absolute",
    top: 0,
    width: 60,
    height: 60,
    zIndex: 1,
  },
  sun: {
    left: "50%",
    transform: [{ translateX: -30 }],
  },
  rain: {
    right: "50%",
    transform: [{ translateX: 30 }],
  },
});

export default VirtualGardenQuiz;
