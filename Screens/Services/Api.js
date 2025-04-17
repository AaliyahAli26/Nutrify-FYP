// Simple mock API for your mood tracker
export const getHistory = () => {
  return Promise.resolve([
    {
      id: "1",
      mood: { emoji: "😊", label: "Happy" },
      symptoms: ["Energetic"],
      timestamp: new Date().toISOString(),
    },
  ]);
};

export const saveMoodEntry = (entry) => {
  console.log("Mock save:", entry);
  return Promise.resolve(entry);
};
