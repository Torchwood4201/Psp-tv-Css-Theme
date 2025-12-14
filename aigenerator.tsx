
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { AppConfig } from '../types';
import { GOOGLE_FONTS_OPTIONS, INITIAL_CONFIG } from '../constants';

interface AiGeneratorProps {
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
}

const loadingMessages = [
  'Consulting the design muses...',
  'Weaving CSS magic...',
  'Scripting dynamic experiences...',
  'Painting with pixels...',
  'Aligning style grids...',
  'Compiling creativity...',
  'Brewing a fresh theme...',
];

const AiGenerator: React.FC<AiGeneratorProps> = ({ setConfig }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: number | undefined;
    if (loading) {
      intervalId = window.setInterval(() => {
        setLoadingMessage((currentMessage) => {
          const currentIndex = loadingMessages.indexOf(currentMessage);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2000);
    }
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [loading]);


  const generateTheme = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your theme.');
      return;
    }
    if (!process.env.API_KEY) {
      setError('API_KEY environment variable not found.');
      return;
    }

    setLoading(true);
    setLoadingMessage(loadingMessages[0]);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          fontImportUrl: { type: Type.STRING, description: "A full URL for a CSS @import rule to load a custom font. Can be from fonts.google.com, cdnfonts.com, or other sources. Example: 'https://fonts.cdnfonts.com/css/simpsonfont'. Can be an empty string if no custom font is needed." },
          fontFamilyName: { type: Type.STRING, description: "The exact font-family name to use in CSS, corresponding to the imported font. Example: 'Simpsonfont'. Can be an empty string." },
          foundation: {
            type: Type.OBJECT,
            description: "Core styles for the page layout and elements.",
            properties: {
              bodyBgColor: { type: Type.STRING, description: "Page background color, hex format." },
              messageBufferBgColor: { type: Type.STRING, description: "Background for elements that would normally be behind the (now hidden) chat, hex format." },
              chatTextColor: { type: Type.STRING, description: "Default text color for elements like polls, hex format." },
              linkColor: { type: Type.STRING, description: "Color for hyperlinks, hex format." },
              timestampColor: { type: Type.STRING, description: "Timestamp color for playlist items, hex format." },
              ownerColor: { type: Type.STRING, description: "Username color for channel owner in the userlist (userlist is hidden), hex format." },
              userlistBgColor: { type: Type.STRING, description: "Background color for the userlist area (hidden), hex format." },
              userlistTextColor: { type: Type.STRING, description: "Default text color for the userlist (hidden), hex format." },
              queueActiveBgColor: { type: Type.STRING, description: "Background color for the currently playing item in the playlist, hex format." },
              queueActiveTextColor: { type: Type.STRING, description: "Text color for the currently playing item in the playlist, hex format." },
              pollWellBgColor: { type: Type.STRING, description: "Background for polls. Hex format or 'transparent'." },
              pollWellColor: { type: Type.STRING, description: "Text color for polls, hex format." },
              queueItemBorder: { type: Type.BOOLEAN, description: "Whether to show a border under playlist items." },
              navbarBgColor: { type: Type.STRING, description: "Navbar background color, rgba format for transparency." },
            },
          },
          motd: {
            type: Type.OBJECT,
            description: "Message of the Day (MOTD) banner content and styling. You may provide a URL for a background image.",
            properties: {
              backgroundImageUrl: { type: Type.STRING, description: "A URL for a background image for the MOTD banner. Should be thematically appropriate. Can be an empty string if no image is desired." },
              title: { type: Type.STRING, description: "A short, catchy main title for the MOTD." },
              subtitle: { type: Type.STRING, description: "A secondary subtitle for the MOTD." },
              titleColor: { type: Type.STRING, description: "Color for the main title text, hex format." },
              titleFontSize: { type: Type.STRING, description: "Font size for the main title (e.g., '100px')." },
              titleTextShadow: { type: Type.STRING, description: "CSS text-shadow for the main title (e.g., '2px 2px 8px #000000')." },
              subtitleColor: { type: Type.STRING, description: "Color for the subtitle text, hex format." },
              subtitleFontSize: { type: Type.STRING, description: "Font size for the subtitle (e.g., '50px')." },
              subtitleTextShadow: { type: Type.STRING, description: "CSS text-shadow for the subtitle (e.g., '2px 2px 4px #000000')." },
            },
          },
          cssEffects: {
            type: Type.OBJECT,
            description: "A set of boolean flags to enable or disable specific, pre-defined CSS visual effects. Use them to enhance the theme's atmosphere.",
            properties: {
              pulsatingVideowrapBorder: { type: Type.BOOLEAN, description: "Adds an animated, glowing border around the video player." },
              animatedBackground: { type: Type.BOOLEAN, description: "Adds a slow, shifting gradient animation to the page background. Overrides bodyBgColor." },
              customScrollbars: { type: Type.BOOLEAN, description: "Applies a custom style to browser scrollbars." },
              videowrapTvScanlines: { type: Type.BOOLEAN, description: "Overlays the video with faint, flickering scanlines, simulating a vintage CRT monitor." },
              videowrapVhsGlitch: { type: Type.BOOLEAN, description: "Adds a chaotic 'glitch' effect to the video border, mimicking a damaged VHS tape." },
              videowrapFloatingFrame: { type: Type.BOOLEAN, description: "Makes the video player appear to float above the page." },
              videowrapFilmBorder: { type: Type.BOOLEAN, description: "Adds an animated border that looks like a classic film strip." },
              pulsatingMotdBackground: { type: Type.BOOLEAN, description: "Adds a subtle pulsating glow animation to the MOTD banner." },
              animatedQueue: { type: Type.BOOLEAN, description: "Adds a subtle glow animation to the currently active video in the playlist." },
              cinematicBlackBars: { type: Type.BOOLEAN, description: "Adds permanent black bars to the top and bottom of the screen." },
              animatedBackgroundFloatingBlobs: { type: Type.BOOLEAN, description: "Adds large, colorful, slowly morphing blobs that drift in the background for a modern, fluid aesthetic." },
              animatedQueueNowPlaying: { type: Type.BOOLEAN, description: "Adds an animated equalizer-style bar to the active playlist item, indicating it's 'Now Playing'." },
              playlistHoverGlitchText: { type: Type.BOOLEAN, description: "Makes the text of a playlist item glitch when the user hovers over it. Great for tech or cyberpunk themes." },
              videowrapCrtEffect: { type: Type.BOOLEAN, description: "Applies a barrel distortion and vignette effect to the video player, mimicking the look of a vintage curved CRT screen." },
              videowrapSignalInterference: { type: Type.BOOLEAN, description: "Periodically shows a rolling bar of static over the video, simulating TV signal interference." },
            },
          },
          javascript: {
            type: Type.OBJECT,
            description: "A set of boolean flags to enable or disable specific JavaScript features.",
            properties: {
              welcomeMessage: { type: Type.STRING, description: "A welcome message to show in an alert. Keep it short and related to the theme. Can be empty string." },
              enableCinematicMode: { type: Type.BOOLEAN, description: "Enables a button to toggle a 'cinematic' viewing mode." },
              enableMouseFollower: { type: Type.BOOLEAN, description: "Enables a decorative element that follows the cursor." },
              enableRandomThemeButton: { type: Type.BOOLEAN, description: "Adds a button to randomize theme colors. Probably should be false unless requested." },
              enableMatrixRain: { type: Type.BOOLEAN, description: "Creates a 'Matrix' style digital rain effect in the background. Excellent for hacker, cyberpunk, or tech themes. It is performance-intensive." },
              enableVideowrapShake: { type: Type.BOOLEAN, description: "Enables a feature that randomly and briefly shakes the video player for a jarring, impactful effect." },
            }
          },
          advancedCss: {
            type: Type.STRING,
            description: "A block of raw, advanced CSS to inject. Use this for complex animations, keyframes, or selectors not covered by other options. The CSS should be valid and minified. Can be an empty string."
          }
        },
      };

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a complete theme configuration for a Cytube channel based on the following description. Adhere strictly to the provided JSON schema. The chat and userlist are permanently hidden, so do not generate any styles for them. Make the theme creative and cohesive. Description: "${prompt}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema,
        },
      });

      const jsonStr = response.text.trim();
      let newConfig;

      try {
        newConfig = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error("Failed to parse AI response:", jsonStr);
        setError("The AI returned an invalid theme structure. Please try again.");
        return;
      }

      if (typeof newConfig !== 'object' || newConfig === null) {
        setError("The AI returned an invalid theme structure. Please try again.");
        return;
      }

      const fullConfig: AppConfig = {
        ...INITIAL_CONFIG,
        fontImportUrl: newConfig.fontImportUrl ?? INITIAL_CONFIG.fontImportUrl,
        fontFamilyName: newConfig.fontFamilyName ?? INITIAL_CONFIG.fontFamilyName,
        advancedCss: newConfig.advancedCss ?? INITIAL_CONFIG.advancedCss,
        foundation: {
          ...INITIAL_CONFIG.foundation,
          ...(newConfig.foundation || {}),
        },
        motd: {
          ...INITIAL_CONFIG.motd,
          ...(newConfig.motd || {}),
        },
        javascript: {
          ...INITIAL_CONFIG.javascript,
          ...(newConfig.javascript || {}),
        },
        cssEffects: {
          ...INITIAL_CONFIG.cssEffects,
          ...(newConfig.cssEffects || {}),
        },
      };

      setConfig(fullConfig);

    } catch (e) {
      if (e instanceof Error) {
        setError(`An error occurred: ${e.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900/40 backdrop-blur-lg border border-gray-700/50 rounded-lg mb-8 shadow-2xl shadow-black/20">
      <h3 className="text-lg font-semibold text-indigo-400 mb-4">✨ AI Theme Generator</h3>
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the theme you want, e.g., 'a retro 80s vaporwave theme' or 'a cozy anime cafe at night'"
          className="w-full h-24 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm resize-none"
          disabled={loading}
        />
        <button
          onClick={generateTheme}
          disabled={loading}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {loadingMessage}
            </>
          ) : (
            'Generate with AI'
          )}
        </button>
        {error && <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-md">{error}</p>}
      </div>
    </div>
  );
};

export default AiGenerator;