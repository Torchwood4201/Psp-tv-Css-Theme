import React from 'react';
import { AppConfig, UserStyle } from '../types';
import AiGenerator from './AiGenerator';
import UserStyleEditor from './UserStyleEditor';

interface SidebarProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  onReset: () => void;
}

const ToggleSwitch: React.FC<{
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}> = ({ id, checked, onChange, label }) => (
    <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
            <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={e => onChange(e.target.checked)} />
            <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-4 bg-indigo-400' : ''}`}></div>
        </div>
        <div className="ml-3 text-sm text-gray-300">{label}</div>
    </label>
);


const Sidebar: React.FC<SidebarProps> = ({ config, setConfig, onReset }) => {

  const handleFoundationChange = <K extends keyof AppConfig['foundation']>(key: K, value: AppConfig['foundation'][K]) => {
    setConfig(prev => ({ ...prev, foundation: { ...prev.foundation, [key]: value } }));
  };
  
  const handleMotdChange = <K extends keyof AppConfig['motd']>(key: K, value: AppConfig['motd'][K]) => {
    setConfig(prev => ({ ...prev, motd: { ...prev.motd, [key]: value } }));
  };
  
  const handleJavascriptChange = <K extends keyof AppConfig['javascript']>(key: K, value: AppConfig['javascript'][K]) => {
    setConfig(prev => ({ ...prev, javascript: { ...prev.javascript, [key]: value } }));
  };
  
  const handleCssEffectsChange = <K extends keyof AppConfig['cssEffects']>(key: K, value: AppConfig['cssEffects'][K]) => {
    setConfig(prev => ({ ...prev, cssEffects: { ...prev.cssEffects, [key]: value } }));
  };

  const handleAddUserStyle = () => {
    setConfig(prev => ({
      ...prev,
      userStyles: [
        ...prev.userStyles,
        {
          id: `user-style-${Date.now()}-${Math.random()}`,
          username: '',
          customName: '',
          fontFamily: '',
          color: '#ffffff',
          hideOriginal: false
        }
      ]
    }));
  };

  const handleUserStyleChange = (id: string, updatedStyle: UserStyle) => {
    setConfig(prev => ({
      ...prev,
      userStyles: prev.userStyles.map(style => style.id === id ? updatedStyle : style)
    }));
  };

  const handleRemoveUserStyle = (id: string) => {
    setConfig(prev => ({
      ...prev,
      userStyles: prev.userStyles.filter(style => style.id !== id)
    }));
  };

  const videowrapEffects: (keyof AppConfig['cssEffects'])[] = ['pulsatingVideowrapBorder', 'videowrapPulsatingGlow', 'cinematicBlackBars', 'videowrapFloatingFrame', 'videowrapFilmBorder', 'videowrapTvScanlines', 'videowrapVhsGlitch', 'videowrapSepiaFilm', 'videowrapNightVision', 'videowrapSecurityCamera', 'videowrapHolographic', 'videowrapCrtEffect', 'videowrapSignalInterference', 'videowrapOldTVStartup', 'videowrapStaticNoise', 'videowrapGlitchEffect', 'videowrapFilmGrain'];
  const backgroundEffects: (keyof AppConfig['cssEffects'])[] = ['animatedBackground', 'animatedBackgroundNebula', 'animatedBackgroundPulsatingGrid', 'animatedBackgroundFloatingBlobs', 'staticNoiseBackground'];
  const playlistEffects: (keyof AppConfig['cssEffects'])[] = ['animatedQueue', 'animatedQueueNowPlaying', 'playlistHoverGlitchText', 'playlistSlideInOnLoad', 'playlistItemSpotlight'];
  const generalVisualFlairEffects: (keyof AppConfig['cssEffects'])[] = ['customScrollbars'];
  const themedGimmickEffects: (keyof AppConfig['cssEffects'])[] = ['simpsonsCloudBackground', 'simpsonsTvFrame'];
  const weirdSpookyEffects: (keyof AppConfig['cssEffects'])[] = ['invertColors', 'creepyTextShadow', 'dramaticLighting', 'spookyFogOverlay'];
  const christmasEffects: (keyof AppConfig['cssEffects'])[] = ['christmasLightsHeader', 'letItSnow'];

  const renderEffectToggles = (keys: (keyof AppConfig['cssEffects'])[]) => {
    return keys.map(key => {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      return (
        <ToggleSwitch 
            key={key} 
            id={key}
            checked={config.cssEffects[key]} 
            onChange={(checked) => handleCssEffectsChange(key, checked)}
            label={label}
        />
      );
    });
  };

  return (
    <div className="p-6 bg-gray-900/60 backdrop-blur-xl border-r border-gray-700/50 h-full overflow-y-auto">
      <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Cytube Style Generator</h2>
      
      <AiGenerator setConfig={setConfig} />

      <details className="group" open>
        <summary className="text-lg font-semibold text-indigo-400 cursor-pointer list-none flex items-center justify-between">
            <span>Manual Configuration</span>
            <svg className="w-5 h-5 transform group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </summary>
        <div className="mt-4 border-t border-gray-700/50 pt-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={onReset}
              className="px-3 py-1 text-sm font-semibold text-gray-400 bg-transparent border border-gray-600 rounded-md hover:bg-gray-700/50 hover:text-white transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
          {/* General Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 border-b border-gray-700/50 pb-2">General</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Font Import URL</label>
                <input
                    type="text"
                    value={config.fontImportUrl}
                    onChange={(e) => setConfig({...config, fontImportUrl: e.target.value})}
                    placeholder="e.g., https://fonts.cdnfonts.com/css/simpsonfont"
                    className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Font Family Name</label>
                <input
                    type="text"
                    value={config.fontFamilyName}
                    onChange={(e) => setConfig({...config, fontFamilyName: e.target.value})}
                    placeholder="e.g., Simpsonfont"
                    className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Foundation Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 border-b border-gray-700/50 pb-2">Foundation Styles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm">Body Background</label>
                    <input type="color" value={config.foundation.bodyBgColor} onChange={e => handleFoundationChange('bodyBgColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Message Area BG</label>
                    <input type="color" value={config.foundation.messageBufferBgColor} onChange={e => handleFoundationChange('messageBufferBgColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Chat Text</label>
                    <input type="color" value={config.foundation.chatTextColor} onChange={e => handleFoundationChange('chatTextColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Links</label>
                    <input type="color" value={config.foundation.linkColor} onChange={e => handleFoundationChange('linkColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Timestamp</label>
                    <input type="color" value={config.foundation.timestampColor} onChange={e => handleFoundationChange('timestampColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Owner Name</label>
                    <input type="color" value={config.foundation.ownerColor} onChange={e => handleFoundationChange('ownerColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Userlist BG</label>
                    <input type="color" value={config.foundation.userlistBgColor} onChange={e => handleFoundationChange('userlistBgColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Userlist Text</label>
                    <input type="color" value={config.foundation.userlistTextColor} onChange={e => handleFoundationChange('userlistTextColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Poll BG</label>
                    <input type="color" value={config.foundation.pollWellBgColor} onChange={e => handleFoundationChange('pollWellBgColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Poll Text</label>
                    <input type="color" value={config.foundation.pollWellColor} onChange={e => handleFoundationChange('pollWellColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Active Queue BG</label>
                    <input type="color" value={config.foundation.queueActiveBgColor} onChange={e => handleFoundationChange('queueActiveBgColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm">Active Queue Text</label>
                    <input type="color" value={config.foundation.queueActiveTextColor} onChange={e => handleFoundationChange('queueActiveTextColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                </div>
            </div>
             <div className="mt-4">
                <ToggleSwitch 
                    id="queue-item-border" 
                    checked={config.foundation.queueItemBorder} 
                    onChange={(checked) => handleFoundationChange('queueItemBorder', checked)}
                    label="Enable Queue Item Border"
                />
            </div>
          </div>

          {/* MOTD Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 border-b border-gray-700/50 pb-2">MOTD Banner</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Title</label>
                <input type="text" value={config.motd.title} onChange={(e) => handleMotdChange('title', e.target.value)} placeholder="Welcome to the Channel" className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"/>
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-300">Subtitle</label>
                <input type="text" value={config.motd.subtitle} onChange={(e) => handleMotdChange('subtitle', e.target.value)} placeholder="Enjoy your stay!" className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Background Image URL</label>
                <input type="text" value={config.motd.backgroundImageUrl} onChange={(e) => handleMotdChange('backgroundImageUrl', e.target.value)} placeholder="https://example.com/image.png" className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                      <label className="text-sm">Title Color</label>
                      <input type="color" value={config.motd.titleColor} onChange={e => handleMotdChange('titleColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                  </div>
                  <div className="flex items-center justify-between">
                      <label className="text-sm">Subtitle Color</label>
                      <input type="color" value={config.motd.subtitleColor} onChange={e => handleMotdChange('subtitleColor', e.target.value)} className="w-10 h-10 p-0 bg-transparent border-none rounded-md cursor-pointer"/>
                  </div>
              </div>
               <div>
                  <label className="block text-sm font-medium text-gray-300">Title Font Size</label>
                  <input type="text" value={config.motd.titleFontSize} onChange={(e) => handleMotdChange('titleFontSize', e.target.value)} placeholder="e.g., 100px" className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"/>
              </div>
               <div>
                  <label className="block text-sm font-medium text-gray-300">Subtitle Font Size</label>
                  <input type="text" value={config.motd.subtitleFontSize} onChange={(e) => handleMotdChange('subtitleFontSize', e.target.value)} placeholder="e.g., 50px" className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"/>
              </div>
               <div>
                  <label className="block text-sm font-medium text-gray-300">Title Text Shadow</label>
                  <input type="text" value={config.motd.titleTextShadow} onChange={(e) => handleMotdChange('titleTextShadow', e.target.value)} placeholder="e.g., 2px 2px 8px #000000" className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"/>
              </div>
               <div>
                  <label className="block text-sm font-medium text-gray-300">Subtitle Text Shadow</label>
                  <input type="text" value={config.motd.subtitleTextShadow} onChange={(e) => handleMotdChange('subtitleTextShadow', e.target.value)} placeholder="e.g., 2px 2px 4px #000000" className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"/>
              </div>
            </div>
          </div>

          {/* User Styles Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 border-b border-gray-700/50 pb-2">Custom User Styles</h3>
            <div className="space-y-4">
              {config.userStyles.map((style) => (
                <UserStyleEditor
                  key={style.id}
                  userStyle={style}
                  onChange={(updatedStyle) => handleUserStyleChange(style.id, updatedStyle)}
                  onRemove={() => handleRemoveUserStyle(style.id)}
                />
              ))}
            </div>
            <button
              onClick={handleAddUserStyle}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-300 bg-transparent border border-indigo-700/50 rounded-md hover:bg-indigo-900/40 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add User Style
            </button>
          </div>

          {/* Javascript Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 border-b border-gray-700/50 pb-2">JavaScript Features</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Welcome Message</label>
                <input type="text" value={config.javascript.welcomeMessage} onChange={(e) => handleJavascriptChange('welcomeMessage', e.target.value)} placeholder="Welcome to my awesome channel!" className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"/>
              </div>
              <div className="grid grid-cols-1 gap-3">
                  <ToggleSwitch id="enableCinematicMode" checked={config.javascript.enableCinematicMode} onChange={(c) => handleJavascriptChange('enableCinematicMode', c)} label="Enable Cinematic Mode" />
                  <ToggleSwitch id="enableMouseFollower" checked={config.javascript.enableMouseFollower} onChange={(c) => handleJavascriptChange('enableMouseFollower', c)} label="Enable Mouse Follower" />
                  <ToggleSwitch id="enableRandomThemeButton" checked={config.javascript.enableRandomThemeButton} onChange={(c) => handleJavascriptChange('enableRandomThemeButton', c)} label="Enable Random Theme Button" />
                  <ToggleSwitch id="enableMatrixRain" checked={config.javascript.enableMatrixRain} onChange={(c) => handleJavascriptChange('enableMatrixRain', c)} label="Enable Matrix Rain" />
                  <ToggleSwitch id="enableGlowyGrid" checked={config.javascript.enableGlowyGrid} onChange={(c) => handleJavascriptChange('enableGlowyGrid', c)} label="Enable Interactive Glowing Grid" />
                  <ToggleSwitch id="enableVideowrapShake" checked={config.javascript.enableVideowrapShake} onChange={(c) => handleJavascriptChange('enableVideowrapShake', c)} label="Enable Videowrap Shake" />
                  <ToggleSwitch id="enableVideoFollowCursor" checked={config.javascript.enableVideoFollowCursor} onChange={(c) => handleJavascriptChange('enableVideoFollowCursor', c)} label="Enable 3D Video Player Tilt" />
              </div>
              
               <div className="pt-4 mt-4 border-t border-gray-700/50">
                <h4 className="text-md font-medium mb-3 text-indigo-400">Themed & Fun Gimmicks</h4>
                <div className="space-y-3">
                  <ToggleSwitch id="enableFloatingImages" checked={config.javascript.enableFloatingImages} onChange={(c) => handleJavascriptChange('enableFloatingImages', c)} label="Enable Floating Images (Simpsons)" />
                  {config.javascript.enableFloatingImages && (
                    <div className="pl-5">
                      <label className="block text-sm font-medium text-gray-300">Floating Image URLs</label>
                      <textarea 
                        value={config.javascript.floatingImageUrls} 
                        onChange={(e) => handleJavascriptChange('floatingImageUrls', e.target.value)} 
                        placeholder="Enter image URLs, separated by commas" 
                        className="w-full mt-1 h-32 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                      />
                      <p className="mt-1 text-xs text-gray-400">Comma-separated list of image URLs.</p>
                    </div>
                  )}
                  <ToggleSwitch id="enableSimpsonsGame" checked={config.javascript.enableSimpsonsGame} onChange={(c) => handleJavascriptChange('enableSimpsonsGame', c)} label="Enable Simpsons Arcade Game" />
                  <ToggleSwitch id="enableChristmasSnow" checked={config.javascript.enableChristmasSnow} onChange={(c) => handleJavascriptChange('enableChristmasSnow', c)} label="Enable Christmas Snow (Canvas)" />
                  <ToggleSwitch id="enableChristmasCursor" checked={config.javascript.enableChristmasCursor} onChange={(c) => handleJavascriptChange('enableChristmasCursor', c)} label="Enable Christmas Cursor Trail" />
                </div>
              </div>
            </div>
          </div>

          {/* CSS Effects Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 border-b border-gray-700/50 pb-2">CSS Visual Effects</h3>
            
            <div className="mb-6">
              <h4 className="text-base font-medium mb-3 text-indigo-400">Videowrap & Frame</h4>
              <div className="grid grid-cols-1 gap-3">
                {renderEffectToggles(videowrapEffects)}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-base font-medium mb-3 text-indigo-400">Background</h4>
              <div className="grid grid-cols-1 gap-3">
                {renderEffectToggles(backgroundEffects)}
              </div>
            </div>
             
            <div className="mb-6">
              <h4 className="text-base font-medium mb-3 text-indigo-400">Playlist</h4>
              <div className="grid grid-cols-1 gap-3">
                {renderEffectToggles(playlistEffects)}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-base font-medium mb-3 text-indigo-400">General Flair</h4>
              <div className="grid grid-cols-1 gap-3">
                {renderEffectToggles(generalVisualFlairEffects)}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-base font-medium mb-3 text-indigo-400">Themed Gimmicks</h4>
              <div className="grid grid-cols-1 gap-3">
                {renderEffectToggles(themedGimmickEffects)}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-base font-medium mb-3 text-indigo-400">Weird & Spooky</h4>
              <div className="grid grid-cols-1 gap-3">
                {renderEffectToggles(weirdSpookyEffects)}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-base font-medium mb-3 text-indigo-400">Christmas & Festive</h4>
              <div className="grid grid-cols-1 gap-3">
                {renderEffectToggles(christmasEffects)}
              </div>
            </div>

          </div>
        </div>
      </details>
    </div>
  );
};

export default Sidebar;
