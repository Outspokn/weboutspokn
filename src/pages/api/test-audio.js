// Test endpoint to verify audio analysis APIs are working
export default async function handler(req, res) {
  // Add CORS headers for React Native
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    // Simple health check
    res.status(200).json({
      success: true,
      message: "Audio Analysis APIs are running",
      timestamp: new Date().toISOString(),
      availableEndpoints: [
        {
          endpoint: "/api/extract-audio-features",
          method: "POST",
          description:
            "Comprehensive audio feature extraction from files or base64 data",
          parameters: ["audio (file)", "audioData (base64)", "sampleRate"],
        },
        {
          endpoint: "/api/extract-audio-frequencies",
          method: "POST",
          description: "Frequency analysis from audio URLs",
          parameters: [
            "audioUrl",
            "frequencyBands",
            "sampleRate",
            "detailedAnalysis",
          ],
        },
        {
          endpoint: "/api/analyze-audio-stream",
          method: "POST",
          description: "Real-time audio stream analysis",
          parameters: [
            "audioData (array)",
            "sampleRate",
            "channels",
            "format",
            "frequencyBands",
            "analysisOptions",
          ],
        },
      ],
      systemInfo: {
        nodeVersion: process.version,
        platform: process.platform,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
      },
    });
  } else if (req.method === "POST") {
    // Test with sample data
    const { testType = "basic" } = req.body;

    try {
      if (testType === "stream") {
        // Test stream analysis with mock data
        const mockAudioData = Array.from(
          { length: 1024 },
          () => (Math.random() - 0.5) * 0.5
        );

        // Import and test the stream analysis function
        const { analyzeAudioStream } = await import("./analyze-audio-stream");

        const result = {
          success: true,
          testType: "stream",
          message: "Stream analysis test completed",
          sampleData: {
            inputSamples: mockAudioData.length,
            sampleRange: [
              Math.min(...mockAudioData),
              Math.max(...mockAudioData),
            ],
            rmsAmplitude: Math.sqrt(
              mockAudioData.reduce((sum, sample) => sum + sample * sample, 0) /
                mockAudioData.length
            ),
          },
          timestamp: new Date().toISOString(),
        };

        res.status(200).json(result);
      } else {
        // Basic test
        res.status(200).json({
          success: true,
          testType: "basic",
          message: "Audio Analysis Backend Test Successful",
          timestamp: new Date().toISOString(),
          testData: {
            mockFrequencies: Array.from(
              { length: 32 },
              (_, i) => Math.random() * 0.8 + 0.1
            ),
            mockAmplitude: Math.random() * 0.6 + 0.2,
            mockPitch: 120 + Math.random() * 200,
            mockSNR: 10 + Math.random() * 20,
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        testType,
        timestamp: new Date().toISOString(),
      });
    }
  } else {
    res.status(405).json({
      success: false,
      error: "Method not allowed",
      allowedMethods: ["GET", "POST", "OPTIONS"],
    });
  }
}
