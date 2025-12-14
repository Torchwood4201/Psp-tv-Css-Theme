
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './sidebar';
import OutputPanel from './outputpanel';
import { AppConfig } from './types';
import { INITIAL_CONFIG } from './constants';

/**
 * A simple CSS formatter to make the AI-generated CSS more readable.
 * It adds indentation and newlines to a minified CSS string.
 * @param css The raw CSS string.
 * @returns A formatted CSS string.
 */
const formatAdvancedCss = (css: string): string => {
    if (!css) return '';
    let formatted = css;
    // Add new lines for structure. This makes each selector, rule, and brace its own line.
    formatted = formatted.replace(/\s*([{};])\s*/g, '$1\n');
    // Remove any blank lines that might have been created.
    formatted = formatted.replace(/^\s*[\r\n]/gm, '');

    const lines = formatted.split('\n');
    let indentLevel = 0;
    const indent = '  '; // 2-space indentation
    let result = '';

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        // Decrease indent level for closing braces BEFORE printing the line.
        if (trimmed.startsWith('}')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        result += indent.repeat(indentLevel) + trimmed + '\n';
        
        // Increase indent level for opening braces AFTER printing the line.
        if (trimmed.endsWith('{')) {
            indentLevel++;
        }
    }
    // Add a final newline for spacing in the output panel.
    return result + '\n';
};


const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [motdHtml, setMotdHtml] = useState('');

  useEffect(() => {
    // This effect runs once on component mount (i.e., page load).
    // It explicitly resets the configuration to its initial, default state.
    // This ensures that any state potentially preserved by the browser (like Fast Refresh in dev environments
    // or session restoration) is cleared, providing a fresh start every time.
    setConfig(INITIAL_CONFIG);
  }, []);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to their default values?')) {
      setConfig(INITIAL_CONFIG);
    }
  };

  const generateMotdHtml = useMemo((): string => {
    const { motd } = config;
    const hasMotdContent = motd.title || motd.subtitle;

    if (!hasMotdContent) {
        return '<!-- No MOTD content configured. -->';
    }
    
    const cleanTitle = motd.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cleanSubtitle = motd.subtitle.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return `
<center>
    <br />
    <div id="motd-container">
        <h2 id="motd-subtitle">${cleanSubtitle}</h2>
        <h1 id="motd-title">${cleanTitle}</h1>
    </div>
</center>
    `.trim();
  }, [config.motd]);

  const generateCss = useMemo((): string => {
    const { fontImportUrl, fontFamilyName, foundation, advancedCss, javascript, motd, cssEffects, userStyles } = config;
    let css = '';

    // Font import
    if (fontImportUrl) {
      css += `@import url('${fontImportUrl}');\n\n`;
    }

    const hasMotdContent = motd.title || motd.subtitle;
    if (hasMotdContent) {
        css += '/* --- MOTD Banner --- */\n\n';
        
        if (cssEffects.pulsatingMotdBackground) {
            css += `@keyframes pulsate-motd-glow {
    0% { box-shadow: 0 0 15px 0px rgba(167, 139, 250, 0.4); }
    50% { box-shadow: 0 0 25px 8px rgba(167, 139, 250, 0.7); }
    100% { box-shadow: 0 0 15px 0px rgba(167, 139, 250, 0.4); }
}\n\n`;
        }

        let motdContainerCss = `#motd-container {\n` +
          `    position: relative;\n` +
          `    text-align: center;\n` +
          `    color: white;\n` +
          `    max-width: 1500px;\n` +
          `    margin: 0 auto;\n`;

        if (motd.backgroundImageUrl) {
            const safeUrl = motd.backgroundImageUrl.replace(/'/g, "\\'");
            motdContainerCss += `    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${safeUrl}');\n`;
        }
        
        motdContainerCss += `    background-size: cover;\n` +
          `    background-position: center;\n` +
          `    min-height: 300px; /* Give it some height */\n` +
          `    display: flex;\n` +
          `    flex-direction: column;\n` +
          `    justify-content: center;\n` +
          `    align-items: center;\n` +
          `    border-radius: 12px;\n` +
          `    overflow: hidden;\n`;

        if (cssEffects.pulsatingMotdBackground) {
            motdContainerCss += `    animation: pulsate-motd-glow 4s infinite ease-in-out;\n`;
        }
          
        motdContainerCss += `}\n\n`;
        css += motdContainerCss;

        css += `#motd-subtitle {
    margin: 0;
    color: ${motd.subtitleColor};
    font-size: ${motd.subtitleFontSize};
    text-shadow: ${motd.subtitleTextShadow};
    order: 2;
}\n\n`;
        css += `#motd-title {
    margin: 0;
    color: ${motd.titleColor};
    font-size: ${motd.titleFontSize};
    text-shadow: ${motd.titleTextShadow};
    order: 1;
}\n\n`;
    }

    // Foundation
    css += '/* --- Foundation --- */\n\n';
    css += `body {\n`;
    css += `    background-color: ${foundation.bodyBgColor};\n`;
    if (fontFamilyName) {
        css += `    font-family: '${fontFamilyName}', sans-serif;\n`;
    }
    css += `}\n\n`;
    css += `#messagebuffer {\n    background-color: ${foundation.messageBufferBgColor};\n    color: ${foundation.chatTextColor};\n}\n\n`;
    css += `#messagebuffer a {\n    color: ${foundation.linkColor};\n}\n\n`;
    css += `.timestamp {\n    color: ${foundation.timestampColor};\n}\n\n`;
    css += `#userlist {\n`;
    css += `    background-color: ${foundation.userlistBgColor};\n`
    css += `    color: ${foundation.userlistTextColor} !important;\n`
    css += `}\n\n`
    css += `.userlist_owner {\n    color: ${foundation.ownerColor} !important;\n}\n\n`;
    css += `#pollwrap .well {\n    background: ${foundation.pollWellBgColor === 'transparent' ? 'none' : foundation.pollWellBgColor} !important;\n    color: ${foundation.pollWellColor};\n    border: solid 1px ${foundation.pollWellColor};\n    border-radius: 10px;\n}\n\n`;
    css += `#queue>li {\n    background: none;\n    border-style: none;\n`
    if (foundation.queueItemBorder) {
      css += `    border-bottom: solid 0.5px !important;\n`;
    }
    css += `}\n\n`;
    css += `#queue li.queue_active {\n    background-color: ${foundation.queueActiveBgColor} !important;\n    color: ${foundation.queueActiveTextColor} !important;\n}\n\n`;
    css += `.navbar {\n    background: ${foundation.navbarBgColor} !important;\n}\n\n`;

    // User Styles
    if (userStyles && userStyles.length > 0) {
      css += '/* --- Custom User Styles --- */\n\n';
      userStyles.forEach(style => {
        if (!style.username) return;

        const cleanUsername = style.username.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        const selector = `.chat-msg-${cleanUsername} .username`;
        
        if (style.hideOriginal && style.customName) {
          css += `${selector} {\n`;
          css += `    font-size: 0 !important;\n`;
          css += `}\n\n`;
          
          css += `${selector}::before {\n`;
          css += `    content: '${style.customName.replace(/'/g, "\\'")}';\n`;
          css += `    font-size: 1rem; /* Reset font size to be visible */\n`;
          if (style.color) css += `    color: ${style.color} !important;\n`;
          if (style.fontFamily) css += `    font-family: '${style.fontFamily}', sans-serif !important;\n`;
          css += `}\n\n`;
        } 
        else {
          let mainStyles = '';
          if (style.color) mainStyles += `    color: ${style.color} !important;\n`;
          if (style.fontFamily) mainStyles += `    font-family: '${style.fontFamily}', sans-serif !important;\n`;
          
          if (mainStyles) {
            css += `${selector} {\n${mainStyles}}\n\n`;
          }
          
          if (style.customName) {
            css += `${selector}::before {\n`;
            css += `    content: '${style.customName.replace(/'/g, "\\'")}';\n`;
            css += `}\n\n`;
          }
        }
      });
    }

    // Layout
    css += `/* --- Permanent Layout: Chat Hidden --- */\n/* This permanently hides the chat and expands the video area. */\n\n`;
    css += `#rightpane, #chatwrap, #chatline { \n    display: none !important;\n}\n\n`;
    css += `#leftpane {\n    width: 100% !important;\n}\n\n`;

    // CSS Effects
    const anyCssEffects = Object.values(cssEffects).some(e => e);
    if (anyCssEffects) {
      css += '/* --- Visual Effects --- */\n\n';

      let videowrapCss = '';
      if (cssEffects.pulsatingVideowrapBorder) { videowrapCss += `@keyframes pulsate-border { 0% { box-shadow: 0 0 10px 0px rgba(79, 70, 229, 0.5); } 50% { box-shadow: 0 0 20px 5px rgba(129, 140, 248, 0.8); } 100% { box-shadow: 0 0 10px 0px rgba(79, 70, 229, 0.5); } } #videowrap { border: 2px solid rgba(129, 140, 248, 0.5); border-radius: 10px; animation: pulsate-border 3s infinite ease-in-out; }\n\n`; }
      if (cssEffects.videowrapTvScanlines) { videowrapCss += `#videowrap { position: relative; overflow: hidden; } #videowrap::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px); opacity: 0.5; pointer-events: none; z-index: 1001; animation: scanline-flicker 0.2s linear infinite; } @keyframes scanline-flicker { 0% { opacity: 0.4; transform: translateY(0); } 50% { opacity: 0.6; transform: translateY(1px); } 100% { opacity: 0.4; transform: translateY(0); } }\n\n`; }
      if (cssEffects.videowrapVhsGlitch) { videowrapCss += `@keyframes vhs-glitch-1 { 0%, 100% { clip-path: inset(5% 0 90% 0); } 10% { clip-path: inset(95% 0 2% 0); } 30% { clip-path: inset(30% 0 50% 0); } 50% { clip-path: inset(5% 0 80% 0); } 80% { clip-path: inset(80% 0 5% 0); } } @keyframes vhs-glitch-2 { 0%, 100% { clip-path: inset(80% 0 10% 0); transform: translateX(-5px); } 25% { clip-path: inset(10% 0 75% 0); transform: translateX(5px); } 55% { clip-path: inset(60% 0 30% 0); transform: translateX(3px); } 85% { clip-path: inset(25% 0 60% 0); transform: translateX(-3px); } } #videowrap { position: relative; } #videowrap::before, #videowrap::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: inherit; z-index: 1000; } #videowrap::before { animation: vhs-glitch-2 1s steps(2, end) infinite; background: #f0f; mix-blend-mode: screen; } #videowrap::after { animation: vhs-glitch-1 1.5s steps(2, end) infinite; background: #0ff; mix-blend-mode: screen; }\n\n`; }
      if (cssEffects.videowrapFloatingFrame) { videowrapCss += `@keyframes float-frame { 0% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45); } 50% { transform: translateY(-8px); box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.55); } 100% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45); } } #videowrap { animation: float-frame 6s ease-in-out infinite; border-radius: 12px; }\n\n`; }
      if (cssEffects.videowrapFilmBorder) { videowrapCss += `@keyframes scroll-filmstrip { from { background-position: 0 0; } to { background-position: 0 -30px; } } #videowrap { position: relative; padding: 0 30px; background-color: #000; border: 1px solid #333; } #videowrap::before, #videowrap::after { content: ''; position: absolute; top: 0; bottom: 0; width: 25px; background: repeating-linear-gradient(#000, #000 10px, #fff 10px, #fff 20px, #000 20px); background-size: 100% 30px; background-repeat: repeat-y; animation: scroll-filmstrip 0.75s linear infinite; } #videowrap::before { left: 0; } #videowrap::after { right: 0; }\n\n`; }
      if (cssEffects.videowrapSepiaFilm) { videowrapCss += `@keyframes film-grain { 0%, 100% { transform: translate(0, 0); } 10% { transform: translate(-1%, -1%); } 20% { transform: translate(1%, 1%); } 30% { transform: translate(-2%, 2%); } 40% { transform: translate(2%, -2%); } 50% { transform: translate(-1%, 2%); } 60% { transform: translate(2%, 1%); } 70% { transform: translate(-2%, -1%); } 80% { transform: translate(1%, -2%); } 90% { transform: translate(-1%, 1%); } } @keyframes film-flicker { 0% { opacity: 1; } 48% { opacity: 1; } 50% { opacity: 0.8; } 52% { opacity: 1; } 98% { opacity: 1; } 100% { opacity: 0.9; } } #videowrap { position: relative; overflow: hidden; filter: sepia(0.6) contrast(1.1) brightness(0.9); animation: film-flicker 3s infinite linear; } #videowrap::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: repeating-linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%), repeating-radial-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%); opacity: 0.3; pointer-events: none; z-index: 1001; animation: film-grain 0.2s infinite; }\n\n`; }
      if (cssEffects.videowrapNightVision) { videowrapCss += `#videowrap { position: relative; overflow: hidden; filter: brightness(1.2) contrast(1.5); } #videowrap::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle, rgba(0, 255, 0, 0.2) 40%, rgba(0, 50, 0, 0.8) 110%); mix-blend-mode: screen; z-index: 1001; pointer-events: none; } #videowrap::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(0deg, rgba(0, 100, 0, 0.2) 0, rgba(0, 100, 0, 0.2) 1px, transparent 1px, transparent 3px); opacity: 0.6; z-index: 1002; pointer-events: none; }\n\n`; }
      if (cssEffects.videowrapSecurityCamera) { videowrapCss += `@keyframes rec-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } } #ytapiplayer { filter: contrast(1.2) grayscale(0.5); } #videowrap { position: relative; overflow: hidden; background: #000; } #videowrap::before { content: '● REC'; position: absolute; top: 15px; left: 15px; font-family: 'Courier New', monospace; font-size: 18px; color: #ff0000; text-shadow: 0 0 5px #ff0000; z-index: 1001; animation: rec-blink 1.5s infinite; } #videowrap::after { content: 'CAM-01'; position: absolute; bottom: 15px; right: 15px; font-family: 'Courier New', monospace; font-size: 16px; color: rgba(255, 255, 255, 0.7); background: rgba(0, 0, 0, 0.5); padding: 2px 5px; z-index: 1001; }\n\n`; }
      if (cssEffects.videowrapHolographic) { videowrapCss += `@keyframes holo-flicker { 0% { opacity: 0.8; } 5% { opacity: 0.7; } 10% { opacity: 0.8; } 20% { opacity: 0.8; } 25% { opacity: 0.6; } 30% { opacity: 0.8; } 100% { opacity: 0.8; } } @keyframes holo-scanline-scroll { from { transform: translateY(-10px); } to { transform: translateY(0); } } #videowrap { position: relative; border: none; box-shadow: 0 0 15px 5px rgba(0, 255, 255, 0.3), inset 0 0 10px 2px rgba(0, 255, 255, 0.2); background-color: transparent; animation: holo-flicker 5s infinite; } #ytapiplayer { opacity: 0.8; mix-blend-mode: screen; } #videowrap::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(0deg, rgba(0, 200, 255, 0.1) 0px, rgba(0, 200, 255, 0.2) 2px, transparent 4px); z-index: 1001; pointer-events: none; animation: holo-scanline-scroll 0.5s linear infinite; }\n\n`; }
      if (cssEffects.videowrapStaticNoise) { videowrapCss += `@keyframes static-noise-anim { 0% { transform: translate(0, 0); } 10% { transform: translate(-5%, -10%); } 20% { transform: translate(-15%, 5%); } 30% { transform: translate(7%, -25%); } 40% { transform: translate(-5%, 25%); } 50% { transform: translate(-15%, 10%); } 60% { transform: translate(15%, 0%); } 70% { transform: translate(0%, 15%); } 80% { transform: translate(3%, 35%); } 90% { transform: translate(-10%, 10%); } 100% { transform: translate(0, 0); } } #videowrap { position: relative; overflow: hidden; } #videowrap::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4yIi8+PC9zdmc+'); opacity: 0.15; pointer-events: none; z-index: 1002; animation: static-noise-anim 0.2s infinite linear; }\n\n`; }
      if (cssEffects.videowrapGlitchEffect) { videowrapCss += `@keyframes digital-glitch-anim-1 { 0% { clip: rect(79px, 9999px, 81px, 0); } 10% { clip: rect(32px, 9999px, 83px, 0); } 20% { clip: rect(6px, 9999px, 69px, 0); } 30% { clip: rect(25px, 9999px, 98px, 0); } 40% { clip: rect(4px, 9999px, 89px, 0); } 50% { clip: rect(3px, 9999px, 66px, 0); } 60% { clip: rect(62px, 9999px, 85px, 0); } 70% { clip: rect(5px, 9999px, 63px, 0); } 80% { clip: rect(8px, 9999px, 73px, 0); } 90% { clip: rect(88px, 9999px, 7px, 0); } 100% { clip: rect(74px, 9999px, 61px, 0); } } @keyframes digital-glitch-anim-2 { 0% { clip: rect(7px, 9999px, 91px, 0); } 10% { clip: rect(23px, 9999px, 3px, 0); } 20% { clip: rect(10px, 9999px, 2px, 0); } 30% { clip: rect(22px, 9999px, 6px, 0); } 40% { clip: rect(81px, 9999px, 70px, 0); } 50% { clip: rect(48px, 9999px, 2px, 0); } 60% { clip: rect(8px, 9999px, 57px, 0); } 70% { clip: rect(9px, 9999px, 98px, 0); } 80% { clip: rect(5px, 9999px, 77px, 0); } 90% { clip: rect(16px, 9999px, 9px, 0); } 100% { clip: rect(2px, 9999px, 91px, 0); } } #videowrap { position: relative; } #ytapiplayer { animation: digital-glitch-anim-1 2s infinite linear alternate-reverse; } #videowrap::before, #videowrap::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: inherit; z-index: 1000; } #videowrap::before { animation: digital-glitch-anim-2 1.5s infinite linear alternate-reverse; transform: translateX(10px); } #videowrap::after { animation: digital-glitch-anim-1 1s infinite linear alternate-reverse; transform: translateX(-10px); }\n\n`; }
      if (cssEffects.videowrapFilmGrain) { videowrapCss += `@keyframes film-grain-anim { 0%, 100% { transform: translate(0, 0); } 10% { transform: translate(-2%, -2%); } 20% { transform: translate(2%, 2%); } 30% { transform: translate(-3%, 3%); } 40% { transform: translate(3%, -3%); } 50% { transform: translate(-2%, 3%); } 60% { transform: translate(3%, 2%); } 70% { transform: translate(-3%, -2%); } 80% { transform: translate(2%, -3%); } 90% { transform: translate(-2%, 2%); } } #videowrap { position: relative; overflow: hidden; } #videowrap::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4yIi8+PC9zdmc+'); opacity: 0.1; pointer-events: none; z-index: 1002; animation: film-grain-anim 0.3s steps(5, end) infinite; }\n\n`; }
      if (cssEffects.videowrapCrtEffect) { videowrapCss += `#videowrap { border-radius: 25px; overflow: hidden; box-shadow: inset 0 0 20px 10px rgba(0,0,0,0.5); } #videowrap::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, rgba(255,255,255,0) 50%, rgba(0,0,0,0.4) 100%); z-index: 1001; pointer-events: none; border-radius: 25px; }\n\n`; }
      if (cssEffects.videowrapSignalInterference) { videowrapCss += `@keyframes signal-interference { 0% { transform: translateY(-100%); opacity: 0; } 5% { transform: translateY(0%); opacity: 0.3; } 6% { transform: translateY(100%); opacity: 0; } 100% { transform: translateY(100%); opacity: 0; } } #videowrap::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 10%; background: linear-gradient(rgba(0,0,0,0.1) 50%, rgba(255,255,255,0.1) 50%); background-size: 100% 4px; z-index: 1002; pointer-events: none; animation: signal-interference 8s infinite steps(10); }\n\n`; }
      if (cssEffects.videowrapPulsatingGlow) { videowrapCss += `@keyframes pulsate-glow { 0% { box-shadow: 0 0 20px 0px rgba(129, 140, 248, 0.4); } 50% { box-shadow: 0 0 35px 10px rgba(129, 140, 248, 0.7); } 100% { box-shadow: 0 0 20px 0px rgba(129, 140, 248, 0.4); } } #videowrap { animation: pulsate-glow 4s infinite ease-in-out; border-radius: 12px; }\n\n`; }
      if (cssEffects.videowrapOldTVStartup) { videowrapCss += `@keyframes tv-startup-line { 0% { clip-path: inset(50% 0 50% 0); } 20% { clip-path: inset(0 0 0 0); } } @keyframes tv-startup-flash { 0%, 100% { opacity: 0; } 15% { opacity: 0; } 20% { opacity: 1; } 25% { opacity: 0; } } #videowrap { animation: tv-startup-line 1s cubic-bezier(0.76, 0, 0.24, 1) forwards; } #videowrap::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 1002; pointer-events: none; animation: tv-startup-flash 1s linear forwards; }\n\n`; }
      if(videowrapCss) css += '/* --- Videowrap & Frame Effects --- */\n' + videowrapCss;
      
      let backgroundCss = '';
      if (cssEffects.animatedBackground) { backgroundCss += `body { background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #111827); background-size: 400% 400%; animation: gradient-animation 15s ease infinite; } @keyframes gradient-animation { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }\n\n`; }
      if (cssEffects.animatedBackgroundNebula) { backgroundCss += `.nebula { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100vh; background: radial-gradient(ellipse at 70% 30%, rgba(108, 92, 231, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(74, 222, 128, 0.25) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 60%); mix-blend-mode: screen; animation: nebula-drift 120s infinite linear alternate; z-index: -2; } @keyframes nebula-drift { from { transform: rotate(0deg) scale(1.5); } to { transform: rotate(360deg) scale(2); } }\n\n`; }
      if (cssEffects.animatedBackgroundPulsatingGrid) { backgroundCss += `@keyframes pulsate-grid { 0%, 100% { border-color: rgba(139, 92, 246, 0.1); } 50% { border-color: rgba(167, 139, 250, 0.4); } } .plane { animation: pulsate-grid 8s infinite ease-in-out; }\n\n`; }
      if (cssEffects.staticNoiseBackground) { backgroundCss += `@keyframes static-noise-anim-bg { 0% { transform: translate(0, 0); } 10% { transform: translate(-2%, -5%); } 20% { transform: translate(-7%, 2%); } 30% { transform: translate(3%, -10%); } 40% { transform: translate(-2%, 10%); } 50% { transform: translate(-7%, 5%); } 60% { transform: translate(7%, 0%); } 70% { transform: translate(0%, 7%); } 80% { transform: translate(1%, 15%); } 90% { transform: translate(-5%, 5%); } 100% { transform: translate(0, 0); } } body::after { content: ''; position: fixed; top: -50%; left: -50%; width: 200%; height: 200%; background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4yIi8+PC9zdmc+'); opacity: 0.05; pointer-events: none; z-index: -1; animation: static-noise-anim-bg 0.2s infinite linear; }\n\n`; }
      if (cssEffects.animatedBackgroundFloatingBlobs) { backgroundCss += `body { overflow: hidden; } @keyframes move-blob-1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30vw, -20vh) scale(1.2); } } @keyframes move-blob-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-25vw, 25vh) scale(0.9); } } body::before, body::after { content: ''; position: fixed; z-index: -2; top: 20vh; left: 10vw; width: 30vw; height: 30vw; background: radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%); border-radius: 50%; animation: move-blob-1 30s infinite ease-in-out; filter: blur(50px); } body::after { top: 50vh; left: 60vw; width: 25vw; height: 25vw; background: radial-gradient(circle, rgba(219, 39, 119, 0.4) 0%, transparent 70%); animation: move-blob-2 40s infinite ease-in-out; }\n\n`; }
      if(backgroundCss) css += '/* --- Background Effects --- */\n' + backgroundCss;
      
      let playlistCss = '';
      if (cssEffects.animatedQueue) { playlistCss += `@keyframes active-queue-glow { 0% { box-shadow: inset 0 0 10px 0 rgba(255, 255, 255, 0.2); } 50% { box-shadow: inset 0 0 20px 5px rgba(255, 255, 255, 0.4); } 100% { box-shadow: inset 0 0 10px 0 rgba(255, 255, 255, 0.2); } } #queue li.queue_active { animation: active-queue-glow 3s infinite ease-in-out; }\n\n`; }
      if (cssEffects.animatedQueueNowPlaying) { playlistCss += `@keyframes sound-bar { 0%, 100% { transform: scaleY(0.2); } 20% { transform: scaleY(1); } 40% { transform: scaleY(0.5); } 60% { transform: scaleY(0.8); } 80% { transform: scaleY(0.3); } } #queue li.queue_active::before { content: ''; position: absolute; left: 5px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; background: linear-gradient(to right, #4ade80 2px, transparent 2px), linear-gradient(to right, #4ade80 2px, transparent 2px), linear-gradient(to right, #4ade80 2px, transparent 2px); background-size: 4px 100%; background-position: 0 0, 5px 0, 10px 0; background-repeat: no-repeat; } #queue li.queue_active::before > * { animation: sound-bar 1.5s infinite ease-in-out; } #queue li.queue_active::before { display: flex; justify-content: space-between; align-items: flex-end; } #queue li.queue_active::before { content: ''; width: 12px; height: 10px; } #queue li.queue_active::before::after { content: ''; display: block; width: 2px; height: 100%; background-color: #4ade80; animation: sound-bar 1.2s infinite ease-out; box-shadow: 5px 0 0 0 #4ade80, 10px 0 0 0 #4ade80; animation-delay: -0.2s; }\n\n`; }
      if (cssEffects.playlistHoverGlitchText) { playlistCss += `@keyframes text-glitch { 0% { text-shadow: 0.05em 0 0 #00fffc, -0.05em 0 0 #ff00ff; } 15% { text-shadow: 0.05em 0 0 #00fffc, -0.05em 0 0 #ff00ff; } 16% { text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.025em 0 #ff00ff; } 49% { text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.025em 0 #ff00ff; } 50% { text-shadow: 0.025em 0.05em 0 #00fffc, 0.05em 0 0 #ff00ff; } 99% { text-shadow: 0.025em 0.05em 0 #00fffc, 0.05em 0 0 #ff00ff; } 100% { text-shadow: -0.025em 0 0 #00fffc, -0.025em -0.05em 0 #ff00ff; } } #queue li:hover .qe_title { animation: text-glitch 0.65s infinite; }\n\n`; }
      if (cssEffects.playlistSlideInOnLoad) { 
        playlistCss += `@keyframes playlist-slide-in { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }\n#queue > li { animation: playlist-slide-in 0.5s ease-out both; }\n`;
        for (let i = 1; i <= 20; i++) {
          playlistCss += `#queue > li:nth-child(${i}) { animation-delay: ${i * 0.05}s; }\n`;
        }
        playlistCss += '\n';
      }
      if (cssEffects.playlistItemSpotlight) { playlistCss += `@keyframes spotlight-sweep { 0% { background-position: -100% 50%; } 100% { background-position: 200% 50%; } } #queue > li:hover { background: linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.1) 50%, transparent 80%) !important; background-size: 200% 100%; animation: spotlight-sweep 1.5s linear infinite; }\n\n`; }
      if(playlistCss) css += '/* --- Playlist Effects --- */\n' + playlistCss;

      let layoutCss = '';
      if (cssEffects.cinematicBlackBars) { layoutCss += `/* Cinematic Black Bars */\nbody::before, body::after { content: ''; position: fixed; left: 0; right: 0; height: 10vh; background: #000; z-index: 9998; pointer-events: none; } body::before { top: 0; } body::after { bottom: 0; }\n\n`; }
      if (cssEffects.customScrollbars) { layoutCss += `::-webkit-scrollbar { width: 10px; } ::-webkit-scrollbar-track { background: #1f2937; } ::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 5px; } ::-webkit-scrollbar-thumb:hover { background: #6366f1; }\n\n`; }
      if(layoutCss) css += '/* --- Layout & Utility Effects --- */\n' + layoutCss;
    }

    let themedGimmicksCss = '';
    if (cssEffects.simpsonsCloudBackground) {
        themedGimmicksCss += `/* --- Simpsons Cloud Background --- */
/* This will override other background settings */
@import url('https://fonts.cdnfonts.com/css/simpsonfont');

body {
  background: linear-gradient(to bottom, #62cff4 0%, #2c67f2 100%);
  font-family: 'Simpsonfont', cursive, 'Comic Sans MS', cursive, Arial, sans-serif;
  color: #fdd835;
}

body::before {
  content: "";
  position: fixed;
  width: 100%;
  height: 250px;
  bottom: 0;
  left: 0;
  z-index: 1;
  background:
    radial-gradient(circle 60px at 20% 70%, #fff 98%, transparent 99%),
    radial-gradient(circle 50px at 31% 55%, #fff 98%, transparent 99%),
    radial-gradient(circle 40px at 40% 70%, #fff 98%, transparent 99%),
    radial-gradient(circle 55px at 55% 65%, #fff 98%, transparent 99%),
    radial-gradient(circle 45px at 65% 65%, #fff 98%, transparent 99%),
    radial-gradient(circle 60px at 80% 70%, #fff 98%, transparent 99%);
  background-repeat: repeat-x;
  background-size: 200px 120px;
  opacity: 0.18;
  pointer-events: none;
}\n\n`;
    }
    if (cssEffects.simpsonsTvFrame) {
        themedGimmicksCss += `/* --- Simpsons TV Videowrap --- */
/* This may conflict with other videowrap effects */
#videowrap {
  background-color: #1a1a1a;
  border: 7px solid #8b4513; /* wood-like frame */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.7), 0 0 25px rgba(0,0,0,0.5);
  transform: rotateX(2deg) rotateY(-2deg) scale(1.02);
  transition: transform 0.5s ease-in-out;
}\n\n`;
    }
    if(themedGimmicksCss) css += '/* --- Themed Gimmick Effects --- */\n' + themedGimmicksCss;

    let weirdSpookyCss = '';
     if (cssEffects.invertColors) { weirdSpookyCss += `/* Invert Colors */ body { filter: invert(1); background-color: #fff; } img, video, #ytapiplayer { filter: invert(1); }\n\n`; }
    if (cssEffects.creepyTextShadow) { weirdSpookyCss += `/* Creepy Text Shadow */ body { text-shadow: 0 0 3px rgba(255, 0, 0, 0.4), 1px 1px 1px rgba(0,0,0,0.8), -1px -1px 1px rgba(0,0,0,0.8); }\n\n`; }
    if (cssEffects.dramaticLighting) { weirdSpookyCss += `/* Dramatic Lighting */ body { background-color: #000 !important; } body::after { content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent 80px, rgba(0,0,0,0.95) 200px); pointer-events: none; z-index: 9997; }\n\n`; }
    if (cssEffects.spookyFogOverlay) {
        weirdSpookyCss += `@keyframes fog-drift { 0% { transform: translateX(-10%); opacity: 0; } 50% { opacity: 0.6; } 100% { transform: translateX(10%); opacity: 0; } }
body::before {
    content: '';
    position: fixed;
    top: 0; left: 0; width: 200%; height: 100%;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAEICAYAAABaQn1GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAXkSURBVHhe7d1NcpswDAbgpv//0tkhM5SUiGIfsC2lzo5sN2cAhbY+Dj8IIwgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjCCMIowgjBD-9sI90vQAAAABJRU5ErkJggg==');
    background-size: 200%;
    mix-blend-mode: overlay;
    z-index: 10;
    pointer-events: none;
    animation: fog-drift 40s infinite linear alternate;
}\n\n`;
    }
    if(weirdSpookyCss) css += '/* --- Weird & Spooky Gimmicks --- */\n' + weirdSpookyCss;

    let christmasCss = '';
    if (cssEffects.christmasLightsHeader) {
      christmasCss += `@keyframes light-blink { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }
.navbar { position: relative; overflow: visible !important; }
.navbar::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 15px;
    background-image: 
        radial-gradient(circle at center, #ff0 4px, transparent 5px), 
        radial-gradient(circle at center, #f00 4px, transparent 5px), 
        radial-gradient(circle at center, #0f0 4px, transparent 5px), 
        radial-gradient(circle at center, #00f 4px, transparent 5px);
    background-size: 60px 15px;
    background-position: 0 0, 15px 0, 30px 0, 45px 0;
    animation: light-blink 1.5s infinite linear;
    z-index: 100;
}\n\n`;
    }
    if (cssEffects.letItSnow) {
      christmasCss += `@keyframes snowfall {
  0% { background-position: 0 0; }
  100% { background-position: 200px 1000px, 400px 1000px, 600px 1500px; }
}
body::before {
  content: '';
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9990;
  pointer-events: none;
  background-image: 
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADdSURBVDiNpdK9LkRBFADg5zdlE4kEEonE0kjUChcQgUUoFA6h8AhaYfACb0K4BK1UKoVEI3Eb8x5mZ3b25mY7yTtn7j/Z+c4LaAh8iW+c4Bq/cIZ3XGFdE4w7u+ASl3iAF3zgu8aL/DBHeY0L3OKb+i5/8Lw/wTP+cYMf/IcHWMAVPnCFh73zEc4wY8E91phgK/fAKe7xgp8Y4dO3GMEkzvCBp3zh+0Y4w29cYIk3GMEW3nCDdzxgjS8Y4xVmMIZbjHCVH+AEn3jBHx4xwhf8AV02j5gLegCPAAAAAElFTkSuQmCC'),
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAD3SURBVDiNlZKxCsJgEEX7s7tLW1kE8Qq2HYpgk13sIs7iBawewUPSLbCwsBB7UWsbKxELGwtpD/c+fudGkPDBg4UHPtg5474PmMIEVrGCnbzBFMZxixZc4QhTGEETxmkJrnCJS3zhHyYxjWO4xTVW8YgVbOAOf5jBFaZYxSzW8IYhTGEMr3jG/xYnHONZ+xJgB1tYxQpmMIE5LGEFK5jCCjYwhSkcYQZzmMER/mU0o3iNI7zhHec4wQPGMIeevo03fOAbG/hO0I4StnHBC17wiBsc4QZf+MIPpnCBD5zhD9d4wQ2e8Yv/DPwA74k/Am4hL2gAAAAASUVORK5CYII='),
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEGSURBVDiNpdKxSgJRFADg5z+oB1gUQbBEEA1BEARBEATNImiCaJqgCEYQC8MiWKgERUFQQbBEEA0xuwzD7sws3/zDw+H+33e490M0YgT/OIEPXvCIgxxjCsc4wT2e8Ig3fOEVg/jE+xrjjF/4wAFeMIN73GEH23hK+xowhBmc4BRzGEEJJnCEGVzhCS94wRNeMIN13GEFP/hE+x7ghCsc4wZn+MgR/vGJT3ziEic4wS9+8YcnPOMdv/jCH7zhDf/Yx6/xDGe4wSkmsYcVLGEMbznDBj5wgjP84BH3+Mcf/vCBD/ziNzZYxhkecIZv/OMUv/jBFs5xg3N8YQ9/2MMV/gED0CXfY14V4wAAAABJRU5ErkJggg==');
  animation: snowfall 10s linear infinite;
}\n\n`;
    }
    if(christmasCss) css += '/* --- Christmas & Festive Gimmicks --- */\n' + christmasCss;

    // Static stuff from example
    css += '/* --- Miscellaneous --- */\n\n';
    css += `#footer {\n    background-color: rgba(0, 0, 0, 0.5) !important;\n    color: #FFFFFF !important;\n}\n\n`;
    css += `.btn {\n    background: rgba(0, 0, 0, 0.6);\n}\n\n`;
    
    if (Object.values(javascript).some(e => e)) {
      css += '/* --- CSS for JS Features --- */\n\n';

      if (javascript.enableCinematicMode) {
          css += `/* Styles for Cinematic Mode Toggle Button */
.cinematic-toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
}
.cinematic-toggle-btn:hover {
    transform: scale(1.1);
}
body.cinematic-mode .cinematic-toggle-btn {
    background-color: #4f46e5 !important;
    color: #fff !important;
}

/* Styles for Cinematic Mode Overlay */
body.cinematic-mode::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 9990; /* High, but below video/button */
    transition: background-color 0.5s ease;
    pointer-events: all; /* Block clicks to underlying elements */
}
body.cinematic-mode #videowrap {
    position: relative; /* Needed to apply z-index */
    z-index: 9995; /* Bring video above the overlay */
}\n\n`;
      }

      if (javascript.enableMouseFollower) {
        css += `/* Styles for Mouse Follower */
#mouse-follower {
    position: fixed;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(79, 70, 229, 0.5);
    border: 2px solid rgba(129, 140, 248, 0.5);
    z-index: 10000;
    pointer-events: none; /* Important: allows clicking through the element */
    transition: transform 0.1s ease-out, width 0.3s ease, height 0.3s ease;
    mix-blend-mode: screen;
}\n\n`;
      }

      if (javascript.enableVideowrapShake) {
        css += `/* Styles for Videowrap Shake */
@keyframes videowrap-shake {
  0%, 100% { transform: translate(0, 0) rotate(0); }
  10% { transform: translate(-2px, -3px) rotate(-0.5deg); }
  20% { transform: translate(3px, 1px) rotate(0.5deg); }
  30% { transform: translate(-4px, 2px) rotate(-0.5deg); }
  40% { transform: translate(2px, -1px) rotate(0.5deg); }
  50% { transform: translate(-1px, 3px) rotate(-0.5deg); }
  60% { transform: translate(-3px, 1px) rotate(0.5deg); }
  70% { transform: translate(4px, 2px) rotate(-0.5deg); }
  80% { transform: translate(-1px, -2px) rotate(0.5deg); }
  90% { transform: translate(2px, 3px) rotate(0); }
}
.shake-video {
  animation: videowrap-shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}\n\n`;
      }
    }

    // Advanced CSS from AI
    if (advancedCss && advancedCss.trim()) {
        css += '/* --- Advanced AI Generated CSS --- */\n\n';
        css += formatAdvancedCss(advancedCss.trim());
    }

    return css.trim();
  }, [config]);

  const generateJs = useMemo((): string => {
    const { javascript } = config;

    const hasJs = Object.values(javascript).some(val => val);

    if (!hasJs) {
      return '// No JavaScript features enabled.';
    }

    let script = `/*
  Cytube Theme Script
  Generated by Cytube CSS Generator
*/

(function() {
  'use strict';

  // Wait for the window to load to ensure all elements are present
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }

  /*
   * =================================================================================
   * Main Initialization Function
   * =================================================================================
   */
  function init() {
`;

    if (javascript.welcomeMessage) {
      script += `
    // --- Welcome Alert ---
    // Displays a welcome message when the script loads.
    alert('${javascript.welcomeMessage.replace(/'/g, "\\'")}');
`;
    }

    // Group feature creation functions together
    let featureCreationCalls = '';
    if (javascript.enableCinematicMode) { featureCreationCalls += '    createCinematicToggleButton();\n'; }
    if (javascript.enableMouseFollower) { featureCreationCalls += '    createMouseFollower();\n'; }
    if (javascript.enableRandomThemeButton) { featureCreationCalls += '    createRandomThemeButton();\n'; }
    if (javascript.enableVideowrapShake) { featureCreationCalls += '    setupVideowrapShake();\n'; }
    if (javascript.enableVideoFollowCursor) { featureCreationCalls += '    setupVideoFollowCursor();\n'; }
    
    if(featureCreationCalls) {
        script += `
    // --- Initializing UI Features ---
${featureCreationCalls}`;
    }

    if (javascript.enableGlowyGrid) {
      script += `
    // --- Feature: Interactive Glowy Grid ---
    // Creates a high-tech grid background that reacts to the user's mouse.
    (function setupGlowyGrid() {
      const canvas = document.createElement('canvas');
      canvas.id = 'glowy-grid-canvas';
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '-1',
        opacity: '0.7'
      });
      
      let width, height, mouse;
      const gridSize = 30;
      
      function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resize);
      resize();

      mouse = { x: width / 2, y: height / 2 };
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });
      
      function draw() {
        ctx.clearRect(0, 0, width, height);
        
        for (let x = 0; x < width + gridSize; x += gridSize) {
            for (let y = 0; y < height + gridSize; y += gridSize) {
                const dist = Math.sqrt(Math.pow(mouse.x - x, 2) + Math.pow(mouse.y - y, 2));
                const opacity = Math.max(0, 0.5 - dist / 500);
                
                // Draw grid points
                ctx.fillStyle = \`rgba(167, 139, 250, \${opacity * 1.5})\`;
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
                ctx.fill();

                // Draw connecting lines
                if (x > 0) {
                    ctx.strokeStyle = \`rgba(139, 92, 246, \${opacity})\`;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x - gridSize, y);
                    ctx.stroke();
                }
                if (y > 0) {
                    ctx.strokeStyle = \`rgba(139, 92, 246, \${opacity})\`;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y - gridSize);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
      }
      draw();
    })();
`;
    }

    if (javascript.enableMatrixRain) {
        script += `
    // --- Feature: Matrix Rain ---
    // Creates a Matrix-style digital rain effect on a canvas background.
    (function setupMatrixRain() {
      const canvas = document.createElement('canvas');
      canvas.id = 'matrix-canvas';
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '-1',
        opacity: '0.6'
      });
      
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      
      const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const charactersArray = characters.split('');
      const fontSize = 14;
      const columns = Math.floor(width / fontSize);
      const drops = Array.from({ length: columns }).fill(1);

      function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
          const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      
      let animationInterval = setInterval(draw, 33);

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        const newColumns = Math.floor(width / fontSize);
        drops.length = 0; // Clear the old array
        for(let i = 0; i < newColumns; i++) {
          drops.push(1);
        }
      });
    })();
`;
    }


    if (javascript.enableFloatingImages) {
        script += `
    // --- Feature: Floating Images ---
    // Creates a canvas background with animated floating images.
    (function setupFloatingImages() {
      const imageUrls = ${JSON.stringify(javascript.floatingImageUrls.split(/[\n,]+/).map(u => u.trim()).filter(Boolean))};
      if (imageUrls.length === 0) {
        console.log('Cytube Theme Script: No image URLs provided for floating images.');
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.id = 'multi-image-canvas';
      document.body.appendChild(canvas);
      Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '-1',
      });

      const ctx = canvas.getContext('2d');
      let width, height;
      const dpr = window.devicePixelRatio || 1;

      function resize() {
        width = canvas.width = window.innerWidth * dpr;
        height = canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      window.addEventListener('resize', resize);
      resize();

      const images = [];
      let loadedCount = 0;

      imageUrls.forEach((url, i) => {
        images[i] = new Image();
        images[i].crossOrigin = "Anonymous";
        images[i].src = url;
        images[i].onload = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            startAnimation();
          }
        };
        images[i].onerror = () => {
          console.error('Failed to load image:', url);
          loadedCount++; // Still count it to not block animation
           if (loadedCount === imageUrls.length) {
            startAnimation();
          }
        };
      });

      class AnimatedObj {
        constructor(img) {
          this.img = img;
          this.x = Math.random() * (window.innerWidth / dpr);
          this.baseY = Math.random() * (window.innerHeight / dpr);
          this.y = this.baseY;
          this.speedX = 0.3 + Math.random() * 0.5;
          this.width = 100;
          this.height = 100;
          if (img.complete && img.naturalWidth && img.naturalHeight) {
            this.height = (img.naturalHeight / img.naturalWidth) * this.width;
          }
          this.animType = Math.floor(Math.random() * 3); // 0=linear,1=sine wave,2=zigzag
          this.amplitude = 30 + Math.random() * 40;
          this.frequency = 0.005 + Math.random() * 0.015;
          this.phase = Math.random() * 2 * Math.PI;
          this.zigzagDirection = 1;
        }

        update() {
          const scaledWidth = window.innerWidth / dpr;
          const scaledHeight = window.innerHeight / dpr;

          this.x += this.speedX;
          if (this.x > scaledWidth + this.width) {
            this.x = -this.width;
            this.baseY = Math.random() * scaledHeight;
          }
          switch (this.animType) {
            case 0:
              this.y = this.baseY;
              break;
            case 1:
              this.y = this.baseY + this.amplitude * Math.sin(this.frequency * this.x + this.phase);
              break;
            case 2:
              this.y += this.zigzagDirection * 1.5;
              if (this.y > this.baseY + this.amplitude || this.y < this.baseY - this.amplitude) {
                this.zigzagDirection *= -1;
              }
              break;
          }
          this.y = Math.max(0, Math.min(this.y, scaledHeight - this.height));
        }

        draw() {
          if (this.img.complete && this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
          }
        }
      }

      const animatedObjects = [];

      function startAnimation() {
        images.forEach(img => {
          if (img.complete && img.naturalWidth > 0) {
            for (let i = 0; i < 4; i++) { // Reduced from 8 to be less chaotic
              animatedObjects.push(new AnimatedObj(img));
            }
          }
        });
        animate();
      }

      function animate() {
        ctx.clearRect(0, 0, width, height);
        animatedObjects.forEach(obj => {
          obj.update();
          obj.draw();
        });
        requestAnimationFrame(animate);
      }
    })();
`;
    }

    if (javascript.enableSimpsonsGame) {
      script += `
    // --- Feature: Simpsons Arcade Game ---
    // Embeds the Simpsons arcade game in the corner of the screen.
    (function setupSimpsonsGame() {
      let gameContainer = document.createElement('div');
      gameContainer.id = 'simpsons-game-container';
      document.body.appendChild(gameContainer);

      Object.assign(gameContainer.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '600px',
        height: '450px',
        border: '2px solid #555',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        backgroundColor: '#000',
        borderRadius: '10px',
        overflow: 'hidden',
        zIndex: '1000',
        display: 'block',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        transform: 'scale(1)',
        opacity: '1'
      });
      
      const gameIframe = document.createElement('iframe');
      gameIframe.src = 'https://www.retrogames.cc/embed/10442-the-simpsons-4-players-world-set-2.html';
      gameIframe.setAttribute('frameborder', 'no');
      gameIframe.setAttribute('allowfullscreen', 'true');
      gameIframe.setAttribute('scrolling', 'no');
      Object.assign(gameIframe.style, {
        width: '100%',
        height: '100%',
        border: 'none',
      });
      gameContainer.appendChild(gameIframe);

      let toggleButton = document.createElement('button');
      toggleButton.id = 'simpsons-game-toggle-button';
      toggleButton.textContent = 'Hide Game';
      document.body.appendChild(toggleButton);
      
      Object.assign(toggleButton.style, {
        position: 'fixed',
        bottom: '480px', // 450px height + 20px bottom + 10px gap
        right: '20px',
        zIndex: '1100',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '8px',
        border: '2px solid #555',
        backgroundColor: '#fdd835',
        color: '#000',
        boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
        fontFamily: 'sans-serif' // A safe fallback
      });

      toggleButton.onclick = function() {
        const isVisible = gameContainer.style.opacity === '1';
        if (isVisible) {
          gameContainer.style.opacity = '0';
          gameContainer.style.transform = 'scale(0.95)';
          toggleButton.textContent = 'Show Game';
           setTimeout(() => { gameContainer.style.display = 'none'; }, 300);
        } else {
          gameContainer.style.display = 'block';
          setTimeout(() => { // Timeout to allow display property to apply before transition
             gameContainer.style.opacity = '1';
             gameContainer.style.transform = 'scale(1)';
          }, 10);
          toggleButton.textContent = 'Hide Game';
        }
      };
    })();
`;
    }
    
    if (config.cssEffects.dramaticLighting) {
        script += `
    // --- JS for Dramatic Lighting ---
    // Updates CSS variables with mouse coordinates for the spotlight effect.
    window.addEventListener('mousemove', e => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });
`;
    }

    if (javascript.enableChristmasSnow) {
      script += `
    // --- Feature: Christmas Snow (Canvas) ---
    // Renders a more advanced, layered snow effect on a canvas.
    (function setupSnowCanvas() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      document.body.appendChild(canvas);

      Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '9991'
      });
      
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      const flakes = [];

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      function addFlake() {
        flakes.push({
          x: Math.random() * width,
          y: -10,
          radius: 2 + Math.random() * 3, // radius between 2 and 5
          speed: 1 + Math.random() * 2,
          swing: Math.random() * 0.03 - 0.015,
          angle: Math.random() * Math.PI * 2
        });
      }

      function drawFlakes() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        
        for (let i = 0; i < flakes.length; i++) {
          const flake = flakes[i];
          flake.y += flake.speed;
          flake.angle += flake.swing;
          flake.x += Math.sin(flake.angle) * 0.5;

          if (flake.y > height + 10) {
            flakes.splice(i, 1);
            i--;
            continue;
          }
// FIX: The original file was truncated here. The flake drawing logic is now complete.
          ctx.moveTo(flake.x, flake.y);
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        }
        ctx.fill();

        if (flakes.length < 200) {
            addFlake();
        }

        requestAnimationFrame(drawFlakes);
      }
      
      drawFlakes();
    })();
`;
    }

    script += `
  } // End of init()
})(); // End of main IIFE
`;
    return script;
  }, [config]);
// FIX: The component needs to update its state when the generated code changes.
  useEffect(() => {
    setCssCode(generateCss);
    setJsCode(generateJs);
    setMotdHtml(generateMotdHtml);
  }, [generateCss, generateJs, generateMotdHtml]);

// FIX: The component was missing a return statement, causing a compilation error.
  return (
    <div className="grid grid-cols-[450px_1fr] h-screen bg-gray-800 text-gray-200 font-sans">
      <Sidebar config={config} setConfig={setConfig} onReset={handleReset} />
      <OutputPanel cssCode={cssCode} jsCode={jsCode} motdHtml={motdHtml} />
    </div>
  );
};
// FIX: Added default export to fix module resolution error in index.tsx.
export default App;
