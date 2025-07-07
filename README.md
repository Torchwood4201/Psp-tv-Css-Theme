/* Enhanced CSS Base Theme - Concise Version */

:root {
  /* Colors */
  --primary: #1a1a1a;
  --secondary: #f8f9fa;
  --border: #e1e5e9;
  --accent: #6366f1;
  --accent-hover: #4f46e5;
  --bg: #ffffff;
  --surface: #f8f9fa;
  --text: #1a1a1a;
  --text-muted: #6b7280;
  
  /* Button Colors */
  --btn-bg: #f3f4f6;
  --btn-text: #374151;
  --btn-hover: #e5e7eb;
  --btn-active: #d1d5db;
  
  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition: 250ms ease-in-out;
  --transition-fast: 150ms ease-in-out;
  
  /* Typography */
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --primary: #f9fafb;
    --secondary: #1f2937;
    --border: #374151;
    --accent: #8b5cf6;
    --accent-hover: #a855f7;
    --bg: #111827;
    --surface: #1f2937;
    --text: #f9fafb;
    --text-muted: #d1d5db;
    --btn-bg: #374151;
    --btn-text: #f9fafb;
    --btn-hover: #4b5563;
    --btn-active: #6b7280;
  }
}

[data-theme="dark"] {
  --primary: #f9fafb;
  --secondary: #1f2937;
  --border: #374151;
  --accent: #8b5cf6;
  --accent-hover: #a855f7;
  --bg: #111827;
  --surface: #1f2937;
  --text: #f9fafb;
  --text-muted: #d1d5db;
  --btn-bg: #374151;
  --btn-text: #f9fafb;
  --btn-hover: #4b5563;
  --btn-active: #6b7280;
}

/* Base Styles */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  color: var(--text);
  background-color: var(--bg);
  font-family: var(--font);
  font-size: var(--text-base);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Focus Management */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--accent);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: top var(--transition);
}

.skip-link:focus {
  top: 6px;
}

/* Video Container */
#videowrap {
  border: 4px solid var(--border);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  width: 1300px;
  height: relative-px;
  overflow: hidden;
  background: var(--surface);
  margin: 0;
  display: block;
  transition: border-color var(--transition), box-shadow var(--transition);
}

#videowrap:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-xl), 0 0 0 1px var(--accent);
}

/* Input Groups */
.input-group {
  background: var(--surface);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow var(--transition);
}

.input-group:focus-within {
  box-shadow: var(--shadow-lg), 0 0 0 2px var(--accent);
}

.input-group .form-control {
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  padding: var(--space-md);
  font-size: var(--text-base);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.input-group .form-control:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
}

/* Buttons */
.btn-group {
  background: var(--surface);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-full);
  overflow: hidden;
  padding: var(--space-xs) var(--space-sm);
  display: inline-flex;
  gap: var(--space-xs);
  transition: box-shadow var(--transition);
}

.btn-group:focus-within {
  box-shadow: var(--shadow-lg), 0 0 0 2px var(--accent);
}

.btn-group .btn, 
#leftcontrols .btn {
  border-radius: var(--radius-full) !important;
  margin: 0;
  border: 1px solid var(--border);
  background: var(--btn-bg);
  color: var(--btn-text);
  font-size: var(--text-lg);
  padding: var(--space-sm) var(--space-lg);
  transition: all var(--transition);
  box-shadow: var(--shadow-sm);
  outline: none;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-group .btn::before,
#leftcontrols .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left var(--transition);
}

.btn-group .btn:hover::before,
#leftcontrols .btn:hover::before {
  left: 100%;
}

.btn-group .btn:active,
.btn-group .btn.active,
.btn-group .btn:focus,
#leftcontrols .btn:active,
#leftcontrols .btn:focus {
  background: var(--btn-active);
  color: var(--btn-text);
  border-color: var(--accent);
  transform: translateY(1px);
}

.btn-group .btn:hover,
#leftcontrols .btn:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Button Variants */
.btn-group .btn.btn-danger {
  background: var(--error);
  color: white;
  border-color: var(--error);
}

.btn-group .btn.btn-success {
  background: var(--success);
  color: white;
  border-color: var(--success);
}

.btn-group .btn.btn-warning {
  background: var(--warning);
  color: white;
  border-color: var(--warning);
}

/* Logo Container */
.logo-container {
  background: var(--btn-bg);
  box-shadow: var(--shadow-lg);
  border: 2px solid var(--border);
  border-radius: var(--radius-xl);
  transition: all var(--transition);
  cursor: pointer;
}

.logo-container:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
  border-color: var(--accent);
}

/* Hide Elements */
#chatwrap,
.text-muted.credit {
  display: none !important;
}

/* Chat Container */
.chat-container {
  width: 500px;
  min-height: 600px;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  font-family: var(--font);
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  perspective: 1200px;
  perspective-origin: 60% 40%;
  transform-style: preserve-3d;
  transition: all var(--transition);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
}

.chat-container::before {
  display: none;
}

.chat-container:hover,
.chat-container:focus-within {
  box-shadow: var(--shadow-xl), 0 0 0 1px var(--accent);
  transform: translateY(-12px) scale(1.02) rotateX(5deg) rotateY(-2deg);
}

/* Chat Content */
.chat-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg);
  backdrop-filter: blur(4px);
  border-radius: inherit;
  box-shadow: var(--shadow-lg);
  transform-style: preserve-3d;
  transform: translateZ(30px);
}

/* Chat Header */
.chat-header {
  background: var(--surface);
  color: var(--text);
  padding: var(--space-xl) var(--space-xl);
  font-size: var(--text-2xl);
  font-weight: 800;
  border-bottom: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-md);
  transform: translateZ(10px);
  position: relative;
}

.chat-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}

/* Chat Main */
.chat-main {
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: 320px;
  background: transparent;
  transform-style: preserve-3d;
  transform: translateZ(5px);
}

/* User List */
.userlist {
  background: var(--surface);
  backdrop-filter: blur(8px);
  border-right: 2px solid var(--border);
  width: 140px;
  min-width: 100px;
  height: 100%;
  overflow-y: auto;
  padding: var(--space-lg) 0;
  font-size: var(--text-base);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  box-shadow: var(--shadow-md);
  transform: translateZ(8px);
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}

.userlist::-webkit-scrollbar {
  width: 6px;
}

.userlist::-webkit-scrollbar-track {
  background: transparent;
}

.userlist::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: var(--radius-full);
}

.userlist::-webkit-scrollbar-thumb:hover {
  background: var(--accent-hover);
}

/* User List Items */
.userlist_item {
  padding: var(--space-sm) var(--space-lg);
  display: flex;
  align-items: center;
  border-radius: var(--radius-xl);
  background: var(--bg);
  border: none;
  color: var(--text);
  font-weight: 600;
  margin: 0 var(--space-sm) var(--space-sm) var(--space-sm);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition);
  transform: translateZ(4px);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.userlist_item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform var(--transition);
}

.userlist_item:hover::before {
  transform: translateX(100%);
}

.userlist_item:hover {
  background: var(--surface);
  box-shadow: var(--shadow-md);
  transform: translateZ(4px) translateY(-2px);
}

.userlist_owner {
  font-style: italic;
  color: var(--accent);
  margin-left: var(--space-sm);
  font-weight: 700;
}

/* Message Buffer */
.messagebuffer {
  background: transparent;
  padding: var(--space-xl) var(--space-lg);
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  font-size: var(--text-base);
  min-height: 320px;
  transform: translateZ(10px);
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}

.messagebuffer::-webkit-scrollbar {
  width: 6px;
}

.messagebuffer::-webkit-scrollbar-track {
  background: transparent;
}

.messagebuffer::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: var(--radius-full);
}

.messagebuffer::-webkit-scrollbar-thumb:hover {
  background: var(--accent-hover);
}

/* Server Messages */
.server-msg-reconnect {
  text-align: center;
  color: var(--accent);
  font-size: var(--text-sm);
  margin-bottom: var(--space-md);
  font-weight: bold;
  padding: var(--space-sm);
  background: rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

/* Chat Messages */
.chat-msg {
  display: flex;
  align-items: flex-end;
  gap: var(--space-md);
  animation: fadeInUp 0.6s ease-out;
  transform-style: preserve-3d;
  position: relative;
}

@keyframes fadeInUp {
  from { 
    opacity: 0; 
    transform: translateY(20px) scale(0.95);
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1);
  }
}

.chat-msg-in {
  flex-direction: row;
  justify-content: flex-start;
}

.chat-msg-out {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

/* Username */
.username {
  font-weight: 900;
  color: var(--accent);
  margin-right: var(--space-sm);
  font-size: var(--text-lg);
  transition: color var(--transition-fast);
}

.username:hover {
  color: var(--accent-hover);
}

/* Timestamp */
.timestamp {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-right: var(--space-sm);
  font-family: 'Consolas', 'Monaco', monospace;
  opacity: 0.8;
}

/* Message Bubbles */
.msg-bubble {
  background: var(--surface);
  border-radius: var(--radius-2xl) var(--radius-2xl) var(--radius-2xl) var(--radius-sm);
  padding: var(--space-md) var(--space-xl);
  font-size: var(--text-base);
  max-width: 70%;
  word-break: break-word;
  box-shadow: var(--shadow-md);
  display: inline-block;
  transition: all var(--transition);
  transform: translateZ(12px);
  position: relative;
  border: 1px solid var(--border);
}

.msg-bubble::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  transform: scaleX(0);
  transition: transform var(--transition);
}

.msg-bubble:hover::before {
  transform: scaleX(1);
}

.chat-msg-out .msg-bubble {
  background: var(--accent);
  color: white;
  border-radius: var(--radius-2xl) var(--radius-2xl) var(--radius-sm) var(--radius-2xl);
  border-color: var(--accent);
}

.chat-msg-out .msg-bubble::before {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
}

/* Channel Emotes */
.channel-emote {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-lg);
  margin: 0 2px;
  vertical-align: middle;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transform: translateZ(10px);
  transition: all var(--transition);
  cursor: pointer;
}

.channel-emote:hover {
  transform: translateZ(10px) scale(1.1);
  box-shadow: var(--shadow-md);
}

/* Chat Form */
.chat-form {
  background: var(--bg);
  padding: var(--space-lg);
  border-top: 2px solid var(--border);
  display: flex;
  border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
  box-shadow: var(--shadow-md);
  transform: translateZ(8px);
  position: relative;
}

.chat-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}

/* Chat Input */
#chatline {
  border: none;
  border-radius: var(--radius-full);
  padding: var(--space-md) var(--space-xl);
  font-size: var(--text-base);
  background: var(--surface);
  outline: none;
  width: 100%;
  font-family: inherit;
  box-shadow: var(--shadow-sm) inset, var(--shadow-sm);
  transition: all var(--transition);
  transform: translateZ(6px);
  color: var(--text);
}

#chatline::placeholder {
  color: var(--text-muted);
}

#chatline:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), var(--shadow-sm) inset;
  background: var(--bg);
}

/* Responsive Design */
@media (max-width: 768px) {
  .chat-container {
    width: 100vw;
    border-radius: 0;
    margin: 0;
  }
  
  .chat-header {
    border-radius: 0;
    padding: var(--space-lg);
  }
  
  .chat-form {
    border-radius: 0;
  }
  
  .userlist {
    display: none;
  }
  
  .messagebuffer {
    padding: var(--space-lg);
  }
  
  .msg-bubble {
    max-width: 85%;
  }
}

@media (max-width: 480px) {
  .chat-container {
    min-height: 100vh;
  }
  
  .chat-header {
    font-size: var(--text-xl);
    padding: var(--space-md);
  }
  
  .msg-bubble {
    max-width: 90%;
    padding: var(--space-sm) var(--space-lg);
  }
  
  .username {
    font-size: var(--text-base);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .chat-container:hover,
  .chat-container:focus-within {
    transform: none;
  }
  
  .btn-group .btn:hover,
  #leftcontrols .btn:hover {
    transform: none;
  }
  
  .userlist_item:hover {
    transform: none;
  }
  
  .channel-emote:hover {
    transform: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  :root {
    --border: #000000;
    --text: #000000;
    --bg: #ffffff;
    --surface: #ffffff;
  }
  
  .btn-group .btn,
  #leftcontrols .btn {
    border-width: 2px;
  }
  
  .msg-bubble {
    border-width: 2px;
  }
}

/* MOTD Box */
.motd-box {
  background: rgba(99, 102, 241, 0.05);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(99, 102, 241, 0.1);
  margin: var(--space-md) 0;
}

.motd-box img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}

/* Cube Animation */
.cube {
  width: 100px;
  height: 100px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 4s infinite linear, floatSide 3s infinite ease-in-out alternate;
}

@keyframes rotateCube {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

@keyframes floatSide {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-20px); }
}

.face {
  position: absolute;
  width: 100px;
  height: 100px;
  background: var(--accent);
  border: 2px solid var(--bg);
  line-height: 100px;
  font-size: 20px;
  color: white;
  text-align: center;
  border-radius: var(--radius-sm);
}

/* Upscale Container */
.upscale-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.upscale-media {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: inherit;
  transition: transform var(--transition);
}

.upscale-media:hover {
  transform: scale(1.02);
}

/* Loading States */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Print Styles */
@media print {
  .chat-container {
    box-shadow: none;
    border: 1px solid #000;
  }
  
  .btn-group,
  .chat-form {
    display: none;
  }
}



