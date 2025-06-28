// pages/api/extract-colors.js (for Pages Router)
// OR app/api/extract-colors/route.js (for App Router)

// API Endpoint for extracting colors from image URLs
// Usage from React Native:
//
// const extractColors = async (imageUrl) => {
//   try {
//     const response = await fetch('http://your-domain.com/api/extract-color', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ imageUrl }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error extracting colors:', error);
//     return null;
//   }
// };
//
// Example response:
// {
//   "success": true,
//   "colors": ["#6c4848", "#9f8585", "#ffaaaa", "#ffffff", "#000000"],
//   "totalColors": 5,
//   "imageUrl": "https://example.com/image.jpg"
// }

import { extractColors } from "extract-colors";
import getPixels from "get-pixels";
import { promisify } from "util";

const getPixelsAsync = promisify(getPixels);

export default async function handler(req, res) {
  // Enable CORS for your React Native app
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let imageUrl = "";

  try {
    const body = req.body;
    imageUrl = body?.imageUrl || "";

    if (!imageUrl) {
      return res.status(400).json({
        error: "Image URL is required",
        success: false,
      });
    }

    console.log("Extracting colors for:", imageUrl);

    // Get pixel data from image URL
    const pixels = await getPixelsAsync(imageUrl);
    const data = [...pixels.data];
    const [width, height] = pixels.shape;

    // Extract colors using the library with pixel data
    const colors = await extractColors(
      { data, width, height },
      {
        pixels: 64000,
        distance: 0.22,
        splitPower: 10,
        colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
        saturationDistance: 0.2,
        lightnessDistance: 0.2,
        hueDistance: 0.083333333,
      }
    );

    // Convert to hex format and get top 5 colors
    const hexColors = colors
      .map((color) => color.hex)
      .filter(
        (color, index, arr) => arr.findIndex((c) => c === color) === index
      )
      .slice(0, 5);

    console.log("Extracted colors:", hexColors);

    return res.status(200).json({
      success: true,
      colors: hexColors,
      totalColors: colors.length,
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Color extraction error:", error);

    // Fallback color generation
    const hash = imageUrl
      ? imageUrl.split("").reduce((a, b) => {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0)
      : Math.random() * 1000;

    const hue = Math.abs(hash) % 360;
    const fallbackColors = [
      `hsl(${hue}, 70%, 40%)`,
      `hsl(${(hue + 30) % 360}, 60%, 50%)`,
      `hsl(${(hue + 60) % 360}, 50%, 60%)`,
      `hsl(${(hue + 90) % 360}, 40%, 70%)`,
      `hsl(${(hue + 120) % 360}, 30%, 80%)`,
    ];

    return res.status(200).json({
      success: true,
      colors: fallbackColors,
      fallback: true,
      error: error.message,
      imageUrl: imageUrl,
    });
  }
}

// If using App Router (app/api/extract-colors/route.js):
/*
export async function POST(request) {
  try {
    const { imageUrl } = await request.json();
    
    // Same logic as above...
    const colors = await extractColors(imageUrl, { ... });
    
    return Response.json({
      success: true,
      colors: hexColors
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
*/
