import formidable from "formidable";
import fs from "fs";
import path from "path";
import { FFT } from "fft-js";

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "temp"),
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024, // 50MB
    });

    // Ensure temp directory exists
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const [fields, files] = await form.parse(req);

    let audioData,
      sampleRate = 16000,
      format = "file";

    if (files.audio && files.audio[0]) {
      // File upload
      const audioFile = files.audio[0];
      audioData = fs.readFileSync(audioFile.filepath);
      format = "file";
    } else if (fields.audioData && fields.audioData[0]) {
      // Base64 data
      audioData = Buffer.from(fields.audioData[0], "base64");
      format = "base64";
    } else {
      throw new Error("No audio data provided");
    }

    if (fields.sampleRate && fields.sampleRate[0]) {
      sampleRate = parseInt(fields.sampleRate[0]);
    }

    console.log("Audio analysis request received");
    console.log("Sample rate:", sampleRate);
    console.log("Data length:", audioData.length);
    console.log("Format:", format);

    // Analyze audio features
    const features = await analyzeAudioFeatures(audioData, sampleRate);

    // Clean up uploaded file if it exists
    if (files.audio && files.audio[0]) {
      try {
        fs.unlinkSync(files.audio[0].filepath);
      } catch (cleanupError) {
        console.warn("Failed to cleanup temp file:", cleanupError);
      }
    }

    res.json({
      success: true,
      ...features,
      processingTime: Date.now(),
      sampleRate: sampleRate,
    });
  } catch (error) {
    console.error("Audio analysis error:", error);
    res.json({
      success: false,
      error: error.message,
      fallback: true,
    });
  }
}

async function analyzeAudioFeatures(audioBuffer, sampleRate) {
  try {
    // Convert audio buffer to samples (assuming 16-bit PCM)
    const samples = [];
    for (let i = 0; i < audioBuffer.length; i += 2) {
      if (i + 1 < audioBuffer.length) {
        const sample = audioBuffer.readInt16LE(i);
        samples.push(sample);
      }
    }

    if (samples.length === 0) {
      throw new Error("No audio samples found");
    }

    // Perform audio analysis
    const features = performAudioAnalysis(samples, sampleRate);
    return features;
  } catch (error) {
    console.error("Audio feature analysis error:", error);
    // Return fallback analysis
    return generateFallbackFeatures(sampleRate);
  }
}

function performAudioAnalysis(samples, sampleRate) {
  console.log("Analyzing", samples.length, "audio samples");

  // Normalize samples
  const normalizedSamples = samples.map((sample) => sample / 32768);

  // Calculate RMS amplitude
  const rms = Math.sqrt(
    normalizedSamples.reduce((sum, sample) => sum + sample * sample, 0) /
      normalizedSamples.length
  );

  // Perform FFT for frequency analysis
  const fftSize = Math.min(2048, nearestPowerOfTwo(normalizedSamples.length));
  const fftInput = normalizedSamples.slice(0, fftSize);

  // Pad with zeros if necessary
  while (fftInput.length < fftSize) {
    fftInput.push(0);
  }

  // Apply windowing (Hanning window)
  const windowed = fftInput.map((sample, i) => {
    const windowValue = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (fftSize - 1)));
    return sample * windowValue;
  });

  // Perform FFT
  const fftResult = FFT(windowed);

  // Extract magnitude spectrum
  const magnitudes = fftResult.map((complex) =>
    Math.sqrt(complex[0] * complex[0] + complex[1] * complex[1])
  );

  // Extract frequency bands (32 bands for visualization)
  const numBands = 32;
  const frequencies = extractFrequencyBands(magnitudes, numBands);

  // Detect pitch
  const pitch = detectPitch(magnitudes, sampleRate);

  // Calculate spectral centroid
  const spectralCentroid = calculateSpectralCentroid(magnitudes, sampleRate);

  // Detect speech characteristics
  const speechFeatures = analyzeSpeechFeatures(normalizedSamples, sampleRate);

  return {
    amplitude: rms,
    frequencies: frequencies,
    pitch: pitch,
    spectralCentroid: spectralCentroid,
    features: speechFeatures,
    totalSamples: samples.length,
    duration: samples.length / sampleRate,
  };
}

function nearestPowerOfTwo(n) {
  return Math.pow(2, Math.floor(Math.log2(n)));
}

function extractFrequencyBands(magnitudes, numBands) {
  const bands = [];
  const bandSize = Math.floor(magnitudes.length / 2 / numBands);

  for (let i = 0; i < numBands; i++) {
    const start = i * bandSize;
    const end = start + bandSize;
    const bandMagnitude =
      magnitudes.slice(start, end).reduce((sum, mag) => sum + mag, 0) /
      bandSize;

    // Normalize to 0-1 range
    bands.push(Math.min(1, Math.max(0.05, bandMagnitude / 100)));
  }

  return bands;
}

function detectPitch(magnitudes, sampleRate) {
  // Find the frequency with maximum magnitude (fundamental frequency)
  const maxIndex = magnitudes
    .slice(1, magnitudes.length / 2)
    .reduce(
      (maxIdx, magnitude, index) =>
        magnitude > magnitudes[maxIdx] ? index + 1 : maxIdx,
      1
    );

  const frequency = (maxIndex * sampleRate) / magnitudes.length;

  // Filter out noise (typical speech range: 80-300 Hz for fundamental)
  return frequency >= 80 && frequency <= 800 ? frequency : null;
}

function calculateSpectralCentroid(magnitudes, sampleRate) {
  let weightedSum = 0;
  let magnitudeSum = 0;

  for (let i = 0; i < magnitudes.length / 2; i++) {
    const frequency = (i * sampleRate) / magnitudes.length;
    weightedSum += frequency * magnitudes[i];
    magnitudeSum += magnitudes[i];
  }

  return magnitudeSum > 0 ? weightedSum / magnitudeSum : 0;
}

function analyzeSpeechFeatures(samples, sampleRate) {
  // Zero crossing rate (indicator of voiced vs unvoiced speech)
  let zeroCrossings = 0;
  for (let i = 1; i < samples.length; i++) {
    if (samples[i] >= 0 !== samples[i - 1] >= 0) {
      zeroCrossings++;
    }
  }
  const zeroCrossingRate = zeroCrossings / samples.length;

  // Energy (related to loudness)
  const energy =
    samples.reduce((sum, sample) => sum + sample * sample, 0) / samples.length;

  // Speech/silence detection
  const isSpeech = energy > 0.001 && zeroCrossingRate < 0.3;

  return {
    zeroCrossingRate,
    energy,
    isSpeech,
    confidence: isSpeech ? Math.min(1, energy * 10) : 0,
  };
}

function generateFallbackFeatures(sampleRate) {
  const numBands = 32;
  const frequencies = [];
  const time = Date.now() / 1000;

  for (let i = 0; i < numBands; i++) {
    const position = i / numBands;
    let amplitude;

    if (position < 0.3) {
      amplitude = 0.3 + Math.sin(time * 2 + position * Math.PI) * 0.2;
    } else if (position < 0.7) {
      amplitude = 0.5 + Math.sin(time * 3 + position * Math.PI * 2) * 0.3;
    } else {
      amplitude = 0.2 + Math.sin(time * 4 + position * Math.PI * 3) * 0.15;
    }

    amplitude += (Math.random() - 0.5) * 0.1;
    frequencies.push(Math.max(0.05, Math.min(1, amplitude)));
  }

  return {
    amplitude: 0.5,
    frequencies: frequencies,
    pitch: 150, // Typical speech pitch
    spectralCentroid: 1000,
    features: {
      zeroCrossingRate: 0.1,
      energy: 0.3,
      isSpeech: true,
      confidence: 0.8,
    },
    totalSamples: sampleRate * 2, // 2 seconds
    duration: 2,
    fallback: true,
  };
}
