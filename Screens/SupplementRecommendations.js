export default function SupplementRecommendations({ data }) {
  return (
    <View>
      <Text>Deficiency: {data.deficiency}</Text>
      <Text>Recommended Supplements:</Text>
      {data.supplements.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
      <Text>Food Sources:</Text>
      {data.foods.map((food) => (
        <Text key={food}>{food}</Text>
      ))}
    </View>
  );
}
