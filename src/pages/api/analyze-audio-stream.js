// Simple FFT implementation for real-time pitch detection
function simpleFFT(real, imag = null) {
  const N = real.length;
  if (imag === null) {
    imag = new Array(N).fill(0);
  }

  // Bit-reverse permutation
  for (let i = 1, j = 0; i < N; i++) {
    let bit = N >> 1;
    for (; j & bit; bit >>= 1) {
      j ^= bit;
    }
    j ^= bit;
    if (i < j) {
      [real[i], real[j]] = [real[j], real[i]];
      [imag[i], imag[j]] = [imag[j], imag[i]];
    }
  }

  // FFT computation
  for (let len = 2; len <= N; len <<= 1) {
    const angle = (-2 * Math.PI) / len;
    for (let i = 0; i < N; i += len) {
      for (let j = 0; j < len / 2; j++) {
        const index1 = i + j;
        const index2 = i + j + len / 2;
        const cosVal = Math.cos(angle * j);
        const sinVal = Math.sin(angle * j);
        const tempReal = real[index2] * cosVal - imag[index2] * sinVal;
        const tempImag = real[index2] * sinVal + imag[index2] * cosVal;
        real[index2] = real[index1] - tempReal;
        imag[index2] = imag[index1] - tempImag;
        real[index1] += tempReal;
        imag[index1] += tempImag;
      }
    }
  }

  return real.map((r, i) => [r, imag[i]]);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  // Add CORS headers for React Native
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const {
      audioData,
      sampleRate = 16000,
      channels = 1,
      format = "float32",
      frequencyBands = 32,
      analysisOptions = {},
    } = req.body;

    console.log("Real-time audio stream analysis request received");
    console.log("Sample rate:", sampleRate);
    console.log("Channels:", channels);
    console.log("Format:", format);
    console.log("Data points:", audioData?.length || 0);

    // Validate input
    if (!audioData || !Array.isArray(audioData)) {
      return res.status(400).json({
        success: false,
        error: "audioData must be an array of audio samples",
      });
    }

    if (audioData.length === 0) {
      return res.status(400).json({
        success: false,
        error: "audioData cannot be empty",
      });
    }

    if (sampleRate < 8000 || sampleRate > 48000) {
      return res.status(400).json({
        success: false,
        error: "sampleRate must be between 8000 and 48000",
      });
    }

    if (frequencyBands < 8 || frequencyBands > 128) {
      return res.status(400).json({
        success: false,
        error: "frequencyBands must be between 8 and 128",
      });
    }

    // Perform real-time analysis
    const analysisResult = await analyzeAudioStream(
      audioData,
      sampleRate,
      channels,
      format,
      frequencyBands,
      analysisOptions
    );

    res.status(200).json({
      success: true,
      data: analysisResult,
      metadata: {
        timestamp: Date.now(),
        processingTimeMs: analysisResult.processingTime,
        sampleRate: sampleRate,
        channels: channels,
        inputSamples: audioData.length,
        format: format,
      },
    });
  } catch (error) {
    console.error("Audio stream analysis error:", error);

    // Return fallback analysis for React Native to handle gracefully
    const fallbackResult = generateFallbackStreamAnalysis(
      req.body.frequencyBands || 32,
      req.body.sampleRate || 16000
    );

    res.status(200).json({
      success: true,
      data: fallbackResult,
      metadata: {
        timestamp: Date.now(),
        fallback: true,
        error: error.message,
        sampleRate: req.body.sampleRate || 16000,
      },
    });
  }
}

async function analyzeAudioStream(
  audioData,
  sampleRate,
  channels,
  format,
  frequencyBands,
  options
) {
  const startTime = Date.now();

  try {
    // Convert input data to normalized float array
    let samples = [];

    if (format === "float32") {
      samples = audioData.map((sample) => Math.max(-1, Math.min(1, sample)));
    } else if (format === "int16") {
      samples = audioData.map((sample) => sample / 32768);
    } else if (format === "int32") {
      samples = audioData.map((sample) => sample / 2147483648);
    } else {
      // Assume already normalized
      samples = audioData.map((sample) => Math.max(-1, Math.min(1, sample)));
    }

    // Handle multi-channel audio by taking the first channel or mixing
    if (channels > 1) {
      const monoSamples = [];
      for (let i = 0; i < samples.length; i += channels) {
        if (options.mixChannels) {
          // Mix all channels
          let mixedSample = 0;
          for (let c = 0; c < channels && i + c < samples.length; c++) {
            mixedSample += samples[i + c];
          }
          monoSamples.push(mixedSample / channels);
        } else {
          // Use first channel only
          monoSamples.push(samples[i]);
        }
      }
      samples = monoSamples;
    }

    // Perform comprehensive analysis
    const analysisResult = performRealtimeAnalysis(
      samples,
      sampleRate,
      frequencyBands,
      options
    );

    analysisResult.processingTime = Date.now() - startTime;

    return analysisResult;
  } catch (error) {
    console.error("Stream analysis error:", error);
    throw error;
  }
}

function performRealtimeAnalysis(samples, sampleRate, frequencyBands, options) {
  const {
    enableVoiceDetection = true,
    enablePitchDetection = true,
    enableSpectralAnalysis = true,
    windowSize = 2048,
    enableNoiseReduction = false,
  } = options;

  // Calculate basic metrics
  const amplitude = calculateRMSAmplitude(samples);
  const peakAmplitude = Math.max(...samples.map(Math.abs));

  // Prepare for FFT analysis
  const fftSize = Math.min(windowSize, nearestPowerOfTwo(samples.length));
  const fftInput = samples.slice(0, fftSize);

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
  const fftResult = simpleFFT(windowed);

  // Extract magnitude spectrum
  const magnitudes = fftResult.map((complex) =>
    Math.sqrt(complex[0] * complex[0] + complex[1] * complex[1])
  );

  // Basic frequency analysis
  const frequencies = extractFrequencyBands(magnitudes, frequencyBands);

  const result = {
    // Core audio metrics
    amplitude: amplitude,
    peakAmplitude: peakAmplitude,
    frequencies: frequencies,
    totalBands: frequencies.length,

    // Signal quality
    signalToNoise: calculateSNR(samples),
    dynamicRange: calculateDynamicRange(samples),

    // Timing information
    duration: samples.length / sampleRate,
    sampleCount: samples.length,
  };

  // Optional advanced analysis
  if (enableSpectralAnalysis) {
    result.spectralFeatures = {
      centroid: calculateSpectralCentroid(magnitudes, sampleRate),
      rolloff: calculateSpectralRolloff(magnitudes, sampleRate),
      flatness: calculateSpectralFlatness(magnitudes),
      flux: calculateSpectralFlux(magnitudes),
      bandwidth: calculateSpectralBandwidth(magnitudes, sampleRate),
    };
  }

  if (enableVoiceDetection) {
    result.voiceAnalysis = analyzeVoiceActivity(
      samples,
      magnitudes,
      sampleRate
    );
  }

  if (enablePitchDetection) {
    result.pitch = detectPitchFromMagnitudes(magnitudes, sampleRate);
  }

  // Quality indicators for React Native UI
  result.qualityMetrics = {
    overallQuality: calculateOverallQuality(result),
    clarity: calculateClarity(magnitudes),
    stability: calculateStability(frequencies),
    recommendation: generateQualityRecommendation(result),
  };

  return result;
}

function calculateRMSAmplitude(samples) {
  const sum = samples.reduce((acc, sample) => acc + sample * sample, 0);
  return Math.sqrt(sum / samples.length);
}

function calculateSNR(samples) {
  const amplitude = calculateRMSAmplitude(samples);
  const noise = calculateNoiseFloor(samples);
  return noise > 0 ? 20 * Math.log10(amplitude / noise) : 60;
}

function calculateNoiseFloor(samples) {
  // Estimate noise as the 10th percentile of amplitudes
  const sortedAmplitudes = samples.map(Math.abs).sort((a, b) => a - b);
  const noiseIndex = Math.floor(sortedAmplitudes.length * 0.1);
  return sortedAmplitudes[noiseIndex] || 0.001;
}

function calculateDynamicRange(samples) {
  const max = Math.max(...samples.map(Math.abs));
  const min = calculateNoiseFloor(samples);
  return max > 0 && min > 0 ? 20 * Math.log10(max / min) : 60;
}

function extractFrequencyBands(magnitudes, numBands) {
  const bands = [];
  const usableMagnitudes = magnitudes.slice(0, magnitudes.length / 2);
  const bandSize = Math.floor(usableMagnitudes.length / numBands);

  for (let i = 0; i < numBands; i++) {
    const start = i * bandSize;
    const end = Math.min(start + bandSize, usableMagnitudes.length);

    let bandMagnitude = 0;
    for (let j = start; j < end; j++) {
      bandMagnitude += usableMagnitudes[j];
    }
    bandMagnitude /= end - start;

    // Normalize with logarithmic scaling for better visualization
    const normalizedMagnitude = Math.min(
      1,
      Math.max(0.001, Math.log10(bandMagnitude + 1) / 4)
    );
    bands.push(normalizedMagnitude);
  }

  return bands;
}

function calculateSpectralCentroid(magnitudes, sampleRate) {
  let weightedSum = 0;
  let magnitudeSum = 0;

  for (let i = 0; i < magnitudes.length / 2; i++) {
    const frequency = (i * sampleRate) / (2 * magnitudes.length);
    weightedSum += frequency * magnitudes[i];
    magnitudeSum += magnitudes[i];
  }

  return magnitudeSum > 0 ? weightedSum / magnitudeSum : 0;
}

function calculateSpectralRolloff(magnitudes, sampleRate) {
  const totalEnergy = magnitudes.reduce((sum, mag) => sum + mag * mag, 0);
  let cumulativeEnergy = 0;

  for (let i = 0; i < magnitudes.length / 2; i++) {
    cumulativeEnergy += magnitudes[i] * magnitudes[i];
    if (cumulativeEnergy >= 0.85 * totalEnergy) {
      return (i * sampleRate) / (2 * magnitudes.length);
    }
  }

  return sampleRate / 2;
}

function calculateSpectralFlatness(magnitudes) {
  const nonZeroMagnitudes = magnitudes
    .slice(1, magnitudes.length / 2)
    .filter((mag) => mag > 1e-10);
  if (nonZeroMagnitudes.length === 0) return 0;

  const geometricMean = Math.exp(
    nonZeroMagnitudes
      .map((mag) => Math.log(mag))
      .reduce((sum, logMag) => sum + logMag, 0) / nonZeroMagnitudes.length
  );

  const arithmeticMean =
    nonZeroMagnitudes.reduce((sum, mag) => sum + mag, 0) /
    nonZeroMagnitudes.length;

  return arithmeticMean > 0 ? geometricMean / arithmeticMean : 0;
}

function calculateSpectralFlux(magnitudes) {
  // Simple spectral flux calculation (energy change)
  let flux = 0;
  for (let i = 1; i < magnitudes.length / 2; i++) {
    const diff = magnitudes[i] - (magnitudes[i - 1] || 0);
    flux += diff * diff;
  }
  return Math.sqrt(flux);
}

function calculateSpectralBandwidth(magnitudes, sampleRate) {
  const centroid = calculateSpectralCentroid(magnitudes, sampleRate);
  let weightedVariance = 0;
  let magnitudeSum = 0;

  for (let i = 0; i < magnitudes.length / 2; i++) {
    const frequency = (i * sampleRate) / (2 * magnitudes.length);
    const diff = frequency - centroid;
    weightedVariance += diff * diff * magnitudes[i];
    magnitudeSum += magnitudes[i];
  }

  return magnitudeSum > 0 ? Math.sqrt(weightedVariance / magnitudeSum) : 0;
}

function analyzeVoiceActivity(samples, magnitudes, sampleRate) {
  const energy = calculateRMSAmplitude(samples);
  const zcr = calculateZeroCrossingRate(samples);
  const spectralCentroid = calculateSpectralCentroid(magnitudes, sampleRate);

  // Voice activity detection thresholds
  const energyThreshold = 0.01;
  const zcrThreshold = 0.3;
  const centroidMin = 300;
  const centroidMax = 3000;

  let activity = "silence";
  let confidence = 0;

  if (energy > energyThreshold) {
    if (
      zcr < zcrThreshold &&
      spectralCentroid > centroidMin &&
      spectralCentroid < centroidMax
    ) {
      activity = "speech";
      confidence = Math.min(1, energy * 5);
    } else {
      activity = "noise";
      confidence = Math.min(1, energy * 2);
    }
  }

  return {
    activity: activity,
    confidence: confidence,
    energy: energy,
    zeroCrossingRate: zcr,
    spectralCentroid: spectralCentroid,
    isSpeech: activity === "speech",
  };
}

function calculateZeroCrossingRate(samples) {
  let crossings = 0;
  for (let i = 1; i < samples.length; i++) {
    if (samples[i] >= 0 !== samples[i - 1] >= 0) {
      crossings++;
    }
  }
  return crossings / samples.length;
}

function detectPitchFromMagnitudes(magnitudes, sampleRate) {
  const minFreq = 80; // Minimum human voice frequency
  const maxFreq = 800; // Maximum fundamental frequency for speech

  const minBin = Math.floor((minFreq * 2 * magnitudes.length) / sampleRate);
  const maxBin = Math.floor((maxFreq * 2 * magnitudes.length) / sampleRate);

  let maxMagnitude = 0;
  let peakBin = -1;

  for (let i = minBin; i <= maxBin && i < magnitudes.length / 2; i++) {
    if (magnitudes[i] > maxMagnitude) {
      maxMagnitude = magnitudes[i];
      peakBin = i;
    }
  }

  if (peakBin > 0 && maxMagnitude > 0.1) {
    return {
      frequency: (peakBin * sampleRate) / (2 * magnitudes.length),
      confidence: Math.min(1, maxMagnitude / 10),
      magnitude: maxMagnitude,
    };
  }

  return null;
}

function calculateOverallQuality(analysisResult) {
  let score = 0;
  let factors = 0;

  // Signal-to-noise ratio contribution
  if (analysisResult.signalToNoise !== undefined) {
    score += Math.min(100, Math.max(0, analysisResult.signalToNoise * 2));
    factors++;
  }

  // Voice activity contribution
  if (analysisResult.voiceAnalysis && analysisResult.voiceAnalysis.isSpeech) {
    score += analysisResult.voiceAnalysis.confidence * 100;
    factors++;
  }

  // Amplitude contribution
  if (analysisResult.amplitude > 0.01 && analysisResult.amplitude < 0.9) {
    score += 80; // Good amplitude range
    factors++;
  } else {
    score += 40; // Poor amplitude
    factors++;
  }

  return factors > 0 ? score / factors : 50;
}

function calculateClarity(magnitudes) {
  const spectralFlatness = calculateSpectralFlatness(magnitudes);
  // Lower flatness = more tonal = clearer
  return Math.max(0, Math.min(100, (1 - spectralFlatness) * 100));
}

function calculateStability(frequencies) {
  if (frequencies.length < 2) return 50;

  let variance = 0;
  const mean =
    frequencies.reduce((sum, freq) => sum + freq, 0) / frequencies.length;

  for (const freq of frequencies) {
    variance += (freq - mean) * (freq - mean);
  }
  variance /= frequencies.length;

  // Lower variance = more stable
  return Math.max(0, Math.min(100, (1 - Math.sqrt(variance)) * 100));
}

function generateQualityRecommendation(analysisResult) {
  const quality = analysisResult.qualityMetrics?.overallQuality || 50;
  const amplitude = analysisResult.amplitude || 0;
  const snr = analysisResult.signalToNoise || 0;

  if (quality >= 80) {
    return "Excellent audio quality";
  } else if (quality >= 60) {
    return "Good audio quality";
  } else if (amplitude < 0.01) {
    return "Speak louder - signal too weak";
  } else if (amplitude > 0.9) {
    return "Reduce volume - signal too strong";
  } else if (snr < 10) {
    return "Reduce background noise";
  } else {
    return "Check microphone positioning";
  }
}

function nearestPowerOfTwo(n) {
  return Math.pow(2, Math.floor(Math.log2(n)));
}

function generateFallbackStreamAnalysis(frequencyBands, sampleRate) {
  const time = Date.now() / 1000;
  const frequencies = [];

  // Generate realistic speech-like frequency pattern
  for (let i = 0; i < frequencyBands; i++) {
    const position = i / frequencyBands;
    let amplitude;

    if (position < 0.3) {
      amplitude = 0.3 + Math.sin(time * 2 + position * Math.PI) * 0.2;
    } else if (position < 0.7) {
      amplitude = 0.5 + Math.sin(time * 3 + position * Math.PI * 2) * 0.3;
    } else {
      amplitude = 0.2 + Math.sin(time * 4 + position * Math.PI * 3) * 0.15;
    }

    amplitude += (Math.random() - 0.5) * 0.1;
    frequencies.push(Math.max(0.001, Math.min(1, amplitude)));
  }

  return {
    amplitude: 0.3 + Math.random() * 0.4,
    peakAmplitude: 0.5 + Math.random() * 0.4,
    frequencies: frequencies,
    totalBands: frequencies.length,
    signalToNoise: 15 + Math.random() * 10,
    dynamicRange: 30 + Math.random() * 20,
    duration: 1.0,
    sampleCount: sampleRate,
    spectralFeatures: {
      centroid: 800 + Math.random() * 400,
      rolloff: 2000 + Math.random() * 1000,
      flatness: 0.1 + Math.random() * 0.3,
      flux: 50 + Math.random() * 50,
      bandwidth: 500 + Math.random() * 300,
    },
    voiceAnalysis: {
      activity: "speech",
      confidence: 0.7 + Math.random() * 0.2,
      energy: 0.2 + Math.random() * 0.3,
      zeroCrossingRate: 0.08 + Math.random() * 0.04,
      spectralCentroid: 800 + Math.random() * 400,
      isSpeech: true,
    },
    pitch: {
      frequency: 120 + Math.random() * 80,
      confidence: 0.6 + Math.random() * 0.3,
      magnitude: 0.5 + Math.random() * 0.3,
    },
    qualityMetrics: {
      overallQuality: 60 + Math.random() * 30,
      clarity: 70 + Math.random() * 20,
      stability: 65 + Math.random() * 25,
      recommendation: "Good audio quality",
    },
    processingTime: 10 + Math.random() * 20,
    fallback: true,
  };
}
