# React Native Audio Analysis Backend API Guide

This guide explains how to integrate your React Native application with the audio analysis backend APIs.

## 🎯 Available Endpoints

### 1. `/api/extract-audio-features` - Comprehensive Audio Analysis

**Purpose**: Full audio feature extraction from files or base64 audio data  
**Best for**: Uploaded audio files, recorded audio clips

### 2. `/api/extract-audio-frequencies` - URL-based Frequency Analysis

**Purpose**: Analyze audio from URLs  
**Best for**: Remote audio files, streaming content

### 3. `/api/analyze-audio-stream` - Real-time Stream Analysis

**Purpose**: Real-time analysis of audio stream data  
**Best for**: Live microphone input, continuous audio monitoring

---

## 📱 React Native Integration Examples

### Basic Setup

```javascript
// config.js
export const API_BASE_URL = "https://your-nextjs-app.vercel.app";
// or for development: 'http://localhost:3000'

export const AUDIO_API_ENDPOINTS = {
  EXTRACT_FEATURES: "/api/extract-audio-features",
  EXTRACT_FREQUENCIES: "/api/extract-audio-frequencies",
  ANALYZE_STREAM: "/api/analyze-audio-stream",
};
```

### 1. Real-time Stream Analysis (Recommended for React Native)

```javascript
// audioAnalysisService.js
import { API_BASE_URL, AUDIO_API_ENDPOINTS } from "./config";

export class AudioAnalysisService {
  static async analyzeAudioStream(audioData, options = {}) {
    const {
      sampleRate = 16000,
      channels = 1,
      format = "float32",
      frequencyBands = 32,
      analysisOptions = {
        enableVoiceDetection: true,
        enablePitchDetection: true,
        enableSpectralAnalysis: true,
        enableNoiseReduction: false,
      },
    } = options;

    try {
      const response = await fetch(
        `${API_BASE_URL}${AUDIO_API_ENDPOINTS.ANALYZE_STREAM}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audioData,
            sampleRate,
            channels,
            format,
            frequencyBands,
            analysisOptions,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          data: result.data,
          metadata: result.metadata,
        };
      } else {
        throw new Error(result.error || "Analysis failed");
      }
    } catch (error) {
      console.error("Audio stream analysis error:", error);
      return {
        success: false,
        error: error.message,
        fallback: true,
      };
    }
  }

  static async analyzeAudioFile(audioUri, options = {}) {
    const { sampleRate = 16000, frequencyBands = 32 } = options;

    try {
      const formData = new FormData();
      formData.append("audio", {
        uri: audioUri,
        type: "audio/wav",
        name: "audio.wav",
      });
      formData.append("sampleRate", sampleRate.toString());

      const response = await fetch(
        `${API_BASE_URL}${AUDIO_API_ENDPOINTS.EXTRACT_FEATURES}`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Audio file analysis error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  static async analyzeAudioUrl(audioUrl, options = {}) {
    const {
      sampleRate = 16000,
      frequencyBands = 32,
      detailedAnalysis = false,
    } = options;

    try {
      const response = await fetch(
        `${API_BASE_URL}${AUDIO_API_ENDPOINTS.EXTRACT_FREQUENCIES}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audioUrl,
            sampleRate,
            frequencyBands,
            analysisType: "realtime",
            detailedAnalysis,
          }),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Audio URL analysis error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
```

### 2. React Native Audio Recording Integration

```javascript
// AudioRecorder.js
import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { AudioAnalysisService } from "./audioAnalysisService";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());

  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      console.log("Recording started:", result);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);

      // Analyze the recorded audio
      const analysis = await AudioAnalysisService.analyzeAudioFile(result, {
        sampleRate: 16000,
        frequencyBands: 32,
      });

      setAudioAnalysis(analysis);
      console.log("Recording stopped and analyzed:", result);
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />

      {audioAnalysis && (
        <View style={{ marginTop: 20 }}>
          <Text>Analysis Results:</Text>
          <Text>
            Amplitude: {(audioAnalysis.data?.amplitude * 100)?.toFixed(1)}%
          </Text>
          <Text>Duration: {audioAnalysis.data?.duration?.toFixed(2)}s</Text>
          <Text>
            Speech Detected: {audioAnalysis.data?.speechFeatures?.voiceActivity}
          </Text>
          <Text>
            Quality: {audioAnalysis.data?.qualityMetrics?.recommendation}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AudioRecorder;
```

### 3. Real-time Audio Streaming Component

```javascript
// RealtimeAudioAnalyzer.js
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import { AudioAnalysisService } from "./audioAnalysisService";

const RealtimeAudioAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState([]);
  const intervalRef = useRef(null);

  // Simulate receiving audio data (replace with actual audio stream)
  const simulateAudioStream = () => {
    const chunkSize = 1024; // Number of samples per chunk
    const sampleRate = 16000;

    // Generate mock audio data (replace with real audio capture)
    const audioChunk = Array.from(
      { length: chunkSize },
      () => (Math.random() - 0.5) * 0.5 // Simulate audio samples
    );

    return audioChunk;
  };

  const startRealtimeAnalysis = () => {
    setIsAnalyzing(true);

    intervalRef.current = setInterval(async () => {
      try {
        // Get audio chunk (replace with actual audio capture)
        const audioChunk = simulateAudioStream();

        // Analyze the chunk
        const analysis = await AudioAnalysisService.analyzeAudioStream(
          audioChunk,
          {
            sampleRate: 16000,
            channels: 1,
            format: "float32",
            frequencyBands: 32,
            analysisOptions: {
              enableVoiceDetection: true,
              enablePitchDetection: true,
              enableSpectralAnalysis: true,
            },
          }
        );

        if (analysis.success) {
          setCurrentAnalysis(analysis.data);
        }
      } catch (error) {
        console.error("Real-time analysis error:", error);
      }
    }, 100); // Analyze every 100ms
  };

  const stopRealtimeAnalysis = () => {
    setIsAnalyzing(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button
        title={isAnalyzing ? "Stop Analysis" : "Start Real-time Analysis"}
        onPress={isAnalyzing ? stopRealtimeAnalysis : startRealtimeAnalysis}
      />

      {currentAnalysis && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Live Audio Analysis
          </Text>

          <Text>
            Amplitude: {(currentAnalysis.amplitude * 100).toFixed(1)}%
          </Text>
          <Text>Peak: {(currentAnalysis.peakAmplitude * 100).toFixed(1)}%</Text>
          <Text>SNR: {currentAnalysis.signalToNoise?.toFixed(1)} dB</Text>

          {currentAnalysis.voiceAnalysis && (
            <View>
              <Text>
                Voice Activity: {currentAnalysis.voiceAnalysis.activity}
              </Text>
              <Text>
                Speech Confidence:{" "}
                {(currentAnalysis.voiceAnalysis.confidence * 100).toFixed(1)}%
              </Text>
            </View>
          )}

          {currentAnalysis.pitch && (
            <Text>Pitch: {currentAnalysis.pitch.frequency.toFixed(1)} Hz</Text>
          )}

          {currentAnalysis.qualityMetrics && (
            <View>
              <Text>
                Quality:{" "}
                {currentAnalysis.qualityMetrics.overallQuality.toFixed(0)}/100
              </Text>
              <Text>
                Recommendation: {currentAnalysis.qualityMetrics.recommendation}
              </Text>
            </View>
          )}

          <Text>Processing Time: {currentAnalysis.processingTime}ms</Text>
        </View>
      )}
    </View>
  );
};

export default RealtimeAudioAnalyzer;
```

### 4. Frequency Visualization Component

```javascript
// FrequencyVisualizer.js
import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg";

const FrequencyVisualizer = ({ frequencies = [], height = 200 }) => {
  const { width } = Dimensions.get("window");
  const barWidth = width / frequencies.length;

  return (
    <View style={{ height, backgroundColor: "#000" }}>
      <Svg height={height} width={width}>
        {frequencies.map((frequency, index) => {
          const barHeight = frequency * height * 0.8;
          const x = index * barWidth;
          const y = height - barHeight;

          // Color based on frequency band (blue to red)
          const hue = (index / frequencies.length) * 240;
          const color = `hsl(${hue}, 70%, 50%)`;

          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={barWidth - 1}
              height={barHeight}
              fill={color}
            />
          );
        })}
      </Svg>
    </View>
  );
};

export default FrequencyVisualizer;
```

---

## 📊 API Response Formats

### Real-time Stream Analysis Response

```json
{
  "success": true,
  "data": {
    "amplitude": 0.45,
    "peakAmplitude": 0.78,
    "frequencies": [0.1, 0.2, 0.3, ...],
    "totalBands": 32,
    "signalToNoise": 15.5,
    "dynamicRange": 35.2,
    "duration": 0.064,
    "sampleCount": 1024,
    "spectralFeatures": {
      "centroid": 1200.5,
      "rolloff": 2500.0,
      "flatness": 0.25,
      "flux": 45.2,
      "bandwidth": 800.3
    },
    "voiceAnalysis": {
      "activity": "speech",
      "confidence": 0.85,
      "energy": 0.35,
      "zeroCrossingRate": 0.12,
      "spectralCentroid": 1200.5,
      "isSpeech": true
    },
    "pitch": {
      "frequency": 180.5,
      "confidence": 0.75,
      "magnitude": 0.6
    },
    "qualityMetrics": {
      "overallQuality": 82.5,
      "clarity": 78.0,
      "stability": 85.0,
      "recommendation": "Excellent audio quality"
    },
    "processingTime": 15
  },
  "metadata": {
    "timestamp": 1640995200000,
    "processingTimeMs": 15,
    "sampleRate": 16000,
    "channels": 1,
    "inputSamples": 1024,
    "format": "float32"
  }
}
```

### File Analysis Response

```json
{
  "success": true,
  "data": {
    "amplitude": 0.52,
    "frequencies": [0.1, 0.2, 0.3, ...],
    "detailedFrequencies": [0.05, 0.1, 0.15, ...],
    "pitch": 165.2,
    "spectralCentroid": 1100.8,
    "speechFeatures": {
      "zeroCrossingRate": 0.08,
      "energy": 0.28,
      "voiceActivity": "speech",
      "snrEstimate": 18.5,
      "confidence": 0.9
    },
    "audioMetrics": {
      "spectralRolloff": 2200.0,
      "spectralFlatness": 0.15,
      "dynamicRange": 42.5,
      "peakFrequency": 1100.8,
      "bandwidth": 2400.0
    },
    "totalSamples": 48000,
    "duration": 3.0,
    "metadata": {
      "processingTime": 1640995200000,
      "sampleRate": 16000,
      "inputFormat": "file",
      "audioSize": 96000
    }
  }
}
```

---

## 🔧 Configuration Options

### Analysis Options

```javascript
const analysisOptions = {
  // Voice detection
  enableVoiceDetection: true,

  // Pitch detection
  enablePitchDetection: true,

  // Detailed spectral analysis
  enableSpectralAnalysis: true,

  // FFT window size (power of 2)
  windowSize: 2048,

  // Noise reduction (experimental)
  enableNoiseReduction: false,

  // Mix multiple channels to mono
  mixChannels: true,
};
```

### Audio Formats

```javascript
// Supported input formats
const SUPPORTED_FORMATS = {
  FLOAT32: "float32", // Range: -1.0 to 1.0
  INT16: "int16", // Range: -32768 to 32767
  INT32: "int32", // Range: -2147483648 to 2147483647
};

// Recommended settings
const RECOMMENDED_SETTINGS = {
  sampleRate: 16000, // Good balance of quality and performance
  channels: 1, // Mono audio
  format: "float32", // Best precision
  frequencyBands: 32, // Good for visualization
};
```

---

## 🚀 Performance Tips

### 1. Optimize for Real-time

```javascript
// Use smaller chunks for real-time analysis
const REALTIME_CHUNK_SIZE = 1024; // ~64ms at 16kHz
const UPDATE_INTERVAL = 100; // Update every 100ms
```

### 2. Batch Processing

```javascript
// For file analysis, use larger chunks
const BATCH_CHUNK_SIZE = 4096; // ~256ms at 16kHz
```

### 3. Error Handling

```javascript
const analyzeWithFallback = async (audioData) => {
  try {
    const result = await AudioAnalysisService.analyzeAudioStream(audioData);
    return result.success ? result.data : generateLocalFallback();
  } catch (error) {
    console.warn("Server analysis failed, using fallback:", error);
    return generateLocalFallback();
  }
};
```

---

## 📱 React Native Dependencies

Add these to your React Native project:

```bash
npm install react-native-audio-recorder-player
npm install react-native-svg
npm install react-native-fs
```

---

## 🔒 Security & Best Practices

### 1. API Security

```javascript
// Use environment variables for API URLs
const API_BASE_URL = __DEV__
  ? "http://localhost:3000"
  : "https://your-production-api.com";
```

### 2. Rate Limiting

```javascript
// Implement client-side rate limiting
class RateLimiter {
  constructor(maxRequests = 10, windowMs = 1000) {
    this.requests = [];
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);
    return this.requests.length < this.maxRequests;
  }

  recordRequest() {
    this.requests.push(Date.now());
  }
}
```

### 3. Data Privacy

```javascript
// Ensure sensitive audio data is handled securely
const secureAnalyze = async (audioData) => {
  try {
    const result = await analyzeAudio(audioData);
    // Clear sensitive data from memory
    audioData.fill(0);
    return result;
  } catch (error) {
    // Always clear data on error
    audioData.fill(0);
    throw error;
  }
};
```

This backend is now optimized specifically for React Native integration, providing real-time audio analysis capabilities with comprehensive frequency analysis and speech detection features.
