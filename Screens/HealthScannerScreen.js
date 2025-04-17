import { analyzeLabReport } from "../utils/labAnalysis"; // Your OCR/AI logic

export default function HealthScannerScreen() {
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    const deficiencies = await analyzeLabReport(uploadedImage);
    setResult(deficiencies);
  };

  return (
    <View>
      <Button title="Upload Lab Report" onPress={handleScan} />
      {result && <SupplementRecommendations data={result} />}
    </View>
  );
}
