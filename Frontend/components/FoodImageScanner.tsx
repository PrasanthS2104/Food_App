// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   Image as ImageIcon,
//   CheckCircle,
//   RotateCcw,
//   FileDown,
// } from "lucide-react";

// import ImageUploadBox from "./ImageUploadBox";
// import HealthTimeline from "./HealthTimeline";
// import DietPatternSimulator from "./DietPatternSimulator";
// import SmartAlternatives from "./SmartAlternatives";
// import ExplainableAI from "./ExplainableAI";
// import { AlertTriangle as AlertIcon } from "lucide-react";
// import HealthMeter from "@/components/HealthMeter";

// interface FoodAnalysisResult {
//   foodItems: string[];
//   nutritionDensity: number;
//   confidenceScore: number;
//   healthBenefits?: string[];
//   cautions?: string[];
//   suggestions?: string;
// }

// export default function FoodImageScanner() {
//   const [analyzed, setAnalyzed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [analysisData, setAnalysisData] =
//     useState<FoodAnalysisResult | null>(null);

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // 🔥 STORE BACKEND RESPONSE (IMPORTANT)
//   const [backendResult, setBackendResult] = useState<any>(null);

//   const handleImageSelected = (file: File) => {
//     setSelectedFile(file);
//   };

//   // ✅ ANALYZE IMAGE (UPLOAD ONLY ONCE)
//   const handleAnalyze = async () => {
//     if (!selectedFile) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("image", selectedFile);

//       const response = await fetch("http://127.0.0.1:8000/api/predict/", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to analyze image");
//       }

//       const result = await response.json();

//       // 🔥 SAVE BACKEND RESULT
//       setBackendResult(result);

//       const isFresh = result.condition === "Fresh";

//       const mappedData: FoodAnalysisResult = {
//         foodItems: [result.fruit],
//         nutritionDensity: isFresh ? 85 : 30,
//         confidenceScore: result.confidence_percent || 80,
//         healthBenefits: isFresh
//           ? [
//               `${result.fruit} is rich in vitamins`,
//               "Supports immune health",
//               "Low calorie",
//             ]
//           : [],
//         cautions: !isFresh
//           ? ["Spoiled fruit", "Avoid eating"]
//           : [],
//         suggestions: isFresh
//           ? `This ${result.fruit} is fresh and safe`
//           : `This ${result.fruit} is rotten`,
//       };

//       setAnalysisData(mappedData);
//       setAnalyzed(true);

//       setTimeout(() => {
//         document
//           .getElementById("image-results")
//           ?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     } catch (err) {
//       setError("Failed to analyze image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ DOWNLOAD WITHOUT IMAGE (FIXED)
//   const handleDownloadReport = async () => {
//     if (!backendResult) return;

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/api/download-report/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(backendResult), // 🔥 KEY FIX
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Download failed");
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "fruit_report.pdf";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     } catch (err) {
//       alert("Download failed");
//     }
//   };

//   const data = analysisData;

//   return (
//     <div className="space-y-8">
//       <div className="text-center space-y-3">
//         <h2 className="text-3xl font-bold">Food Image Scanner</h2>
//         <p className="text-muted-foreground">
//           Upload a fruit image to detect freshness
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* LEFT SIDE */}
//         <div className="space-y-4">
//           <ImageUploadBox
//             icon={<ImageIcon className="h-12 w-12 text-primary" />}
//             title="Upload Image"
//             description="Upload fruit image"
//             onImageSelected={handleImageSelected}
//             isLoading={loading}
//           />

//           {selectedFile && !analyzed && (
//             <Button onClick={handleAnalyze} className="w-full">
//               {loading ? "Analyzing..." : "Analyze Image"}
//             </Button>
//           )}

//           {analyzed && (
//             <>
//               <div className="bg-green-100 p-6 text-center rounded-lg">
//                 <CheckCircle className="mx-auto mb-2" />
//                 <p>{data?.foodItems[0]} Analysis Complete</p>
//               </div>

//               <Button
//                 onClick={() => {
//                   setAnalyzed(false);
//                   setSelectedFile(null);
//                   setAnalysisData(null);
//                   setBackendResult(null);
//                 }}
//                 variant="outline"
//                 className="w-full"
//               >
//                 <RotateCcw className="mr-2" />
//                 Analyze Again
//               </Button>
//             </>
//           )}

//           {error && <Card className="p-4 text-red-500">{error}</Card>}
//         </div>

//         {/* RIGHT SIDE */}
//         {analyzed && data && (
//           <div id="image-results" className="space-y-4">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold mb-3">Detected Fruit</h3>

//               <span className="bg-primary/20 px-3 py-1 rounded">
//                 {data.foodItems[0]}
//               </span>

//               <div className="mt-4">
//                 <HealthMeter
//                   freshnessScore={data.nutritionDensity}
//                   confidenceScore={data.confidenceScore}
//                 />
//               </div>

//               {/* 🔥 DOWNLOAD BUTTON */}
//               <div className="mt-6 text-center">
//                 <Button
//                   onClick={handleDownloadReport}
//                   disabled={!backendResult}
//                   className="flex items-center gap-2"
//                 >
//                   <FileDown className="h-4 w-4" />
//                   Download Report
//                 </Button>
//               </div>
//             </Card>

//             <HealthTimeline
//               nutritionDensity={data.nutritionDensity}
//               isFoodHealthy={data.nutritionDensity >= 75}
//             />

//             <DietPatternSimulator
//               nutritionDensity={data.nutritionDensity}
//               isHealthy={data.nutritionDensity >= 75}
//             />

//             <SmartAlternatives
//               foodItems={data.foodItems}
//               nutritionDensity={data.nutritionDensity}
//               isHealthy={data.nutritionDensity >= 75}
//             />

//             <ExplainableAI
//               phase="phase2"
//               triggers={[
//                 {
//                   icon: <AlertIcon className="h-4 w-4" />,
//                   label: "Freshness",
//                   value:
//                     data.nutritionDensity >= 75 ? "Fresh" : "Rotten",
//                   description: data.suggestions || "",
//                   color:
//                     data.nutritionDensity >= 75 ? "emerald" : "orange",
//                 },
//               ]}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   Image as ImageIcon,
//   CheckCircle,
//   RotateCcw,
//   FileDown,
// } from "lucide-react";

// import ImageUploadBox from "./ImageUploadBox";
// import HealthTimeline from "./HealthTimeline";
// import DietPatternSimulator from "./DietPatternSimulator";
// import SmartAlternatives from "./SmartAlternatives";
// import ExplainableAI from "./ExplainableAI";
// import { AlertTriangle as AlertIcon } from "lucide-react";
// import HealthMeter from "@/components/HealthMeter";

// interface FoodAnalysisResult {
//   foodItems: string[];
//   nutritionDensity: number;
//   confidenceScore: number;
//   healthBenefits?: string[];
//   cautions?: string[];
//   suggestions?: string;
// }

// export default function FoodImageScanner() {
//   const [analyzed, setAnalyzed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [analysisData, setAnalysisData] =
//     useState<FoodAnalysisResult | null>(null);

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // 🔥 NEW: FOOD / FRUIT TYPE
//   const [analysisType, setAnalysisType] = useState<
//     "food" | "fruit" | null
//   >(null);

//   const [backendResult, setBackendResult] = useState<any>(null);

//   const handleImageSelected = (file: File) => {
//     setSelectedFile(file);
//     setAnalyzed(false);
//     setAnalysisData(null);
//     setBackendResult(null);
//   };

//   // ✅ ANALYZE IMAGE
//   const handleAnalyze = async () => {
//     if (!selectedFile || !analysisType) {
//       setError("Please select Food or Fruit");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("image", selectedFile);

//       // 🔥 API SWITCH
//       const endpoint =
//         analysisType === "food"
//           ? "http://127.0.0.1:8000/api/predict_food/"
//           : "http://127.0.0.1:8000/api/predict/";

//       const response = await fetch(endpoint, {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to analyze image");
//       }

//       const result = await response.json();

//       setBackendResult(result);

//       // 🔥 FOOD RESULT
//       if (analysisType === "food") {
//         const mappedData: FoodAnalysisResult = {
//           foodItems: [result.food],
//           nutritionDensity: 70,
//           confidenceScore: result.confidence_food * 100,
//           suggestions: `Detected ${result.food}`,
//         };

//         setAnalysisData(mappedData);
//       }

//       // 🔥 FRUIT RESULT
//       else {
//         const isFresh = result.condition === "Fresh";

//         const mappedData: FoodAnalysisResult = {
//           foodItems: [result.fruit],
//           nutritionDensity: isFresh ? 85 : 30,
//           confidenceScore: result.confidence_fruit * 100,
//           healthBenefits: isFresh
//             ? [
//                 `${result.fruit} is rich in vitamins`,
//                 "Supports immune health",
//                 "Low calorie",
//               ]
//             : [],
//           cautions: !isFresh
//             ? ["Spoiled fruit", "Avoid eating"]
//             : [],
//           suggestions: `${result.condition} ${result.fruit}`,
//         };

//         setAnalysisData(mappedData);
//       }

//       setAnalyzed(true);

//       setTimeout(() => {
//         document
//           .getElementById("image-results")
//           ?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     } catch (err) {
//       setError("Failed to analyze image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ DOWNLOAD REPORT (uses stored backend result)
//   const handleDownloadReport = async () => {
//     if (!backendResult) return;

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/api/download-report/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(backendResult),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Download failed");
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "report.pdf";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     } catch (err) {
//       alert("Download failed");
//     }
//   };

//   const data = analysisData;

//   return (
//     <div className="space-y-8">
//       <div className="text-center space-y-3">
//         <h2 className="text-3xl font-bold">Food Image Scanner</h2>
//         <p className="text-muted-foreground">
//           Upload a food or fruit image
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* LEFT SIDE */}
//         <div className="space-y-4">
//           <ImageUploadBox
//             icon={<ImageIcon className="h-12 w-12 text-primary" />}
//             title="Upload Image"
//             description="Upload food or fruit image"
//             onImageSelected={handleImageSelected}
//             isLoading={loading}
//           />

//           {/* 🔥 TYPE SELECTION */}
//           <div className="flex gap-4">
//             <Button
//               variant={analysisType === "fruit" ? "default" : "outline"}
//               onClick={() => setAnalysisType("fruit")}
//               className="w-full"
//             >
//               Fruit 🍎
//             </Button>

//             <Button
//               variant={analysisType === "food" ? "default" : "outline"}
//               onClick={() => setAnalysisType("food")}
//               className="w-full"
//             >
//               Food 🍔
//             </Button>
//           </div>

//           {!analysisType && (
//             <p className="text-red-500 text-sm text-center">
//               Please select Food or Fruit
//             </p>
//           )}

//           {selectedFile && analysisType && !analyzed && (
//             <Button onClick={handleAnalyze} className="w-full">
//               {loading ? "Analyzing..." : "Analyze Image"}
//             </Button>
//           )}

//           {analyzed && (
//             <>
//               <div className="bg-green-100 p-6 text-center rounded-lg">
//                 <CheckCircle className="mx-auto mb-2" />
//                 <p>{data?.foodItems[0]} Analysis Complete</p>
//               </div>

//               <Button
//                 onClick={() => {
//                   setAnalyzed(false);
//                   setSelectedFile(null);
//                   setAnalysisType(null);
//                   setAnalysisData(null);
//                   setBackendResult(null);
//                 }}
//                 variant="outline"
//                 className="w-full"
//               >
//                 <RotateCcw className="mr-2" />
//                 Analyze Again
//               </Button>
//             </>
//           )}

//           {error && <Card className="p-4 text-red-500">{error}</Card>}
//         </div>

//         {/* RIGHT SIDE */}
//         {analyzed && data && (
//           <div id="image-results" className="space-y-4">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold mb-3">
//                 Detected {analysisType === "food" ? "Food" : "Fruit"}
//               </h3>

//               <span className="bg-primary/20 px-3 py-1 rounded">
//                 {data.foodItems[0]}
//               </span>

//               <div className="mt-4">
//                 <HealthMeter
//                   freshnessScore={data.nutritionDensity}
//                   confidenceScore={data.confidenceScore}
//                 />
//               </div>

//               <div className="mt-6 text-center">
//                 <Button
//                   onClick={handleDownloadReport}
//                   disabled={!backendResult}
//                   className="flex items-center gap-2"
//                 >
//                   <FileDown className="h-4 w-4" />
//                   Download Report
//                 </Button>
//               </div>
//             </Card>

//             <HealthTimeline
//               nutritionDensity={data.nutritionDensity}
//               isFoodHealthy={data.nutritionDensity >= 75}
//             />

//             <DietPatternSimulator
//               nutritionDensity={data.nutritionDensity}
//               isHealthy={data.nutritionDensity >= 75}
//             />

//             <SmartAlternatives
//               foodItems={data.foodItems}
//               nutritionDensity={data.nutritionDensity}
//               isHealthy={data.nutritionDensity >= 75}
//             />

//             <ExplainableAI
//               phase="phase2"
//               triggers={[
//                 {
//                   icon: <AlertIcon className="h-4 w-4" />,
//                   label:
//                     analysisType === "food"
//                       ? "Food Detection"
//                       : "Freshness",
//                   value:
//                     analysisType === "food"
//                       ? "Detected"
//                       : data.nutritionDensity >= 75
//                       ? "Fresh"
//                       : "Rotten",
//                   description: data.suggestions || "",
//                   color:
//                     data.nutritionDensity >= 75
//                       ? "emerald"
//                       : "orange",
//                 },
//               ]}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Image as ImageIcon,
  RotateCcw,
  FileDown,
} from "lucide-react";
import { AlertTriangle as AlertIcon } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ImageUploadBox from "./ImageUploadBox";
import HealthTimeline from "./HealthTimeline";
import DietPatternSimulator from "./DietPatternSimulator";
import SmartAlternatives from "./SmartAlternatives";
import ExplainableAI from "./ExplainableAI";
import HealthMeter from "@/components/HealthMeter";

interface FruitAnalysis {
  name: string;
  nutritionDensity: number;
  confidence: number;
  suggestions: string;
}

export default function FoodImageScanner() {
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisType, setAnalysisType] = useState<"food" | "fruit" | null>(null);

  const [backendResult, setBackendResult] = useState<any>(null);
  const [analysisData, setAnalysisData] = useState<FruitAnalysis | null>(null);

  const handleImageSelected = (file: File) => {
    setSelectedFile(file);
    setAnalyzed(false);
    setBackendResult(null);
    setAnalysisData(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !analysisType) {
      setError("Select Food or Fruit");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const endpoint =
        analysisType === "food"
          ? "http://127.0.0.1:8000/api/predict_food/"
          : "http://127.0.0.1:8000/api/predict/";

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      setBackendResult(result);

      if (analysisType === "fruit") {
        const isFresh = result.condition === "Fresh";

        setAnalysisData({
          name: result.fruit,
          nutritionDensity: isFresh ? 85 : 30,
          confidence: result.confidence_fruit * 100,
          suggestions: `${result.condition} ${result.fruit}`,
        });
      }

      setAnalyzed(true);
    } catch {
      setError("Failed to analyze");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!backendResult) return;

    const res = await fetch("http://127.0.0.1:8000/api/download-report/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendResult),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.pdf";
    a.click();
  };

  // 🔥 Format food name nicely
  const formattedFood =
    backendResult?.food?.replace(/_/g, " ").toUpperCase();

  // 🔥 Chart data
  const chartData = backendResult?.nutrition
    ? [
        { name: "Calories", value: backendResult.nutrition.calories || 0 },
        { name: "Protein", value: backendResult.nutrition.protein || 0 },
        { name: "Fat", value: backendResult.nutrition.fat || 0 },
        { name: "Carbs", value: backendResult.nutrition.carbs || 0 },
      ]
    : [];

  const isFresh = (analysisData?.nutritionDensity ?? 0) >= 75;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          🍔 AI Food & Fruit Scanner
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-4">
          <ImageUploadBox
            icon={<ImageIcon className="h-12 w-12 text-primary" />}
            title="Upload Image"
            description="Upload food or fruit"
            onImageSelected={handleImageSelected}
            isLoading={loading}
          />

          <div className="flex gap-4">
            <Button
              onClick={() => setAnalysisType("fruit")}
              variant={analysisType === "fruit" ? "default" : "outline"}
              className="w-full"
            >
              Fruit 🍎
            </Button>

            <Button
              onClick={() => setAnalysisType("food")}
              variant={analysisType === "food" ? "default" : "outline"}
              className="w-full"
            >
              Food 🍔
            </Button>
          </div>

          {selectedFile && analysisType && !analyzed && (
            <Button onClick={handleAnalyze} className="w-full">
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
          )}

          {analyzed && (
            <Button
              onClick={() => {
                setAnalyzed(false);
                setSelectedFile(null);
                setBackendResult(null);
                setAnalysisData(null);
              }}
              variant="outline"
              className="w-full"
            >
              <RotateCcw /> Reset
            </Button>
          )}

          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* RIGHT */}
        {analyzed && (
          <div className="space-y-4">

            {/* 🍔 FOOD UI */}
            {analysisType === "food" && (
              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Detected Food</h3>

                <p className="text-lg font-semibold">{formattedFood}</p>

                <p className="text-sm text-gray-500">
                  Confidence: {(backendResult?.confidence_food * 100).toFixed(2)}%
                </p>

                {/* 🔥 HEALTH BADGE */}
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    backendResult?.health === "Healthy"
                      ? "bg-green-500"
                      : backendResult?.health === "Moderate"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {backendResult?.health}
                </span>

                {/* 🔥 RECOMMENDATION */}
                {/* 🧠 GUT HEALTH */}
                <Card className="p-6 space-y-5 shadow-lg rounded-2xl border">

                {/* HEADER */}
                <div>
                  <h3 className="text-xl font-bold">🍔 Detected Food</h3>
                  <p className="text-2xl font-semibold mt-1">{formattedFood}</p>
                  <p className="text-sm text-gray-500">
                    Confidence: {(backendResult?.confidence_food * 100).toFixed(2)}%
                  </p>
                </div>

                {/* HEALTH BADGE */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-4 py-1 rounded-full text-white text-sm font-medium ${
                      backendResult?.health === "Healthy"
                        ? "bg-green-500"
                        : backendResult?.health === "Moderate"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {backendResult?.health}
                  </span>

                  <span className="text-sm text-gray-600">
                    {backendResult?.recommendation}
                  </span>
                </div>

                {/* 🧠 GUT + SCORE BOX */}
                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">Gut Health</p>
                    <p
                      className={`text-lg font-semibold ${
                        backendResult?.gut_health === "Good"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {backendResult?.gut_health}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">Health Score</p>
                    <p className="text-lg font-semibold">
                      {backendResult?.health_score}/100
                    </p>
                  </div>

                </div>

                {/* ⚠️ ISSUES */}
                {backendResult?.gut_issues?.length > 0 && (
                  <div className="bg-red-50 p-4 rounded-xl">
                    <p className="text-sm font-semibold text-red-600 mb-1">
                      ⚠️ Gut Issues
                    </p>
                    <ul className="text-sm text-gray-700">
                      {backendResult.gut_issues.map((item: string, i: number) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 🔥 NUTRITION GRID */}
                {backendResult?.nutrition && (
                  <div className="grid grid-cols-2 gap-3 text-sm">

                    <div className="bg-orange-50 p-3 rounded-lg">
                      🔥 Calories
                      <p className="font-semibold">
                        {backendResult.nutrition.calories} kcal
                      </p>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      💪 Protein
                      <p className="font-semibold">
                        {backendResult.nutrition.protein} g
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-lg">
                      🥑 Fat
                      <p className="font-semibold">
                        {backendResult.nutrition.fat} g
                      </p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      🍞 Carbs
                      <p className="font-semibold">
                        {backendResult.nutrition.carbs} g
                      </p>
                    </div>

                  </div>
                )}

                {/* 📊 CHART */}
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* DOWNLOAD */}
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Report
                </Button>

              </Card>
                <p className="text-sm mt-2">
                  🧠 Gut Health:
                  <span
                    className={`ml-2 font-semibold ${
                      backendResult?.gut_health === "Good"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {backendResult?.gut_health || "N/A"}
                  </span>
                </p>

                {/* 📊 HEALTH SCORE */}
                <p className="text-sm">
                  📊 Health Score:
                  <span className="ml-2 font-semibold">
                    {backendResult?.health_score ?? "--"} / 100
                  </span>
                </p>

                {/* ⚠️ GUT ISSUES */}
                {backendResult?.gut_issues?.length > 0 && (
                  <ul className="text-sm text-gray-600 mt-2">
                    {backendResult.gut_issues.map((item: string, i: number) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
)}
                {backendResult?.nutrition && (
                  <>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>🔥 {backendResult.nutrition.calories ?? "N/A"} kcal</p>
                      <p>💪 {backendResult.nutrition.protein ?? 0} g</p>
                      <p>🥑 {backendResult.nutrition.fat ?? 0} g</p>
                      <p>🍞 {backendResult.nutrition.carbs ?? 0} g</p>
                    </div>

                    {/* 📊 CHART */}
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}

                <Button onClick={handleDownloadReport}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </Card>
            )}

            {/* 🍎 FRUIT UI */}
            {analysisType === "fruit" && analysisData && (
              <>
                <Card className="p-6">
                  <h3 className="text-xl font-bold">
                    {analysisData.name}
                  </h3>

                  <HealthMeter
                    freshnessScore={analysisData.nutritionDensity}
                    confidenceScore={analysisData.confidence}
                  />
                </Card>

                <HealthTimeline
                  nutritionDensity={analysisData.nutritionDensity}
                  isFoodHealthy={analysisData.nutritionDensity >= 75}
                />

                <DietPatternSimulator
                  nutritionDensity={analysisData.nutritionDensity}
                  isHealthy={analysisData.nutritionDensity >= 75}
                />

                <SmartAlternatives
                  foodItems={[analysisData.name]}
                  nutritionDensity={analysisData.nutritionDensity}
                  isHealthy={analysisData.nutritionDensity >= 75}
                />

                <ExplainableAI
                  phase="phase2"
                  triggers={[
                    {
                      icon: <AlertIcon className="h-4 w-4" />,
                      label: "Freshness",
                      value: isFresh ? "Fresh" : "Rotten",
                      description: analysisData.suggestions,
                      color: isFresh ? "emerald" : "orange",
                    },
                  ]}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

