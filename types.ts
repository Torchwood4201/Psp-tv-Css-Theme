
export interface MotdConfig {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  titleColor: string;
  titleFontSize: string;
  titleTextShadow: string;
  subtitleColor: string;
  subtitleFontSize: string;
  subtitleTextShadow: string;
}

export interface FoundationStyles {
  bodyBgColor: string;
  messageBufferBgColor: string;
  timestampColor: string;
  ownerColor: string;
  pollWellBgColor: string;
  pollWellColor: string;
  queueItemBorder: boolean;
  navbarBgColor: string;
  chatTextColor: string;
  linkColor: string;
  userlistBgColor: string;
  userlistTextColor: string;
  queueActiveBgColor: string;
  queueActiveTextColor: string;
}

export interface JavascriptConfig {
  welcomeMessage: string;
  enableCinematicMode: boolean;
  enableMouseFollower: boolean;
  enableRandomThemeButton: boolean;
  // Themed Gimmicks
  enableSimpsonsGame: boolean;
  enableFloatingImages: boolean;
  floatingImageUrls: string;
  // Christmas Gimmicks
  enableChristmasSnow: boolean;
  enableChristmasCursor: boolean;
  // New JS Effects
  enableMatrixRain: boolean;
  enableVideowrapShake: boolean;
  enableGlowyGrid: boolean;
  enableVideoFollowCursor: boolean;
}

export interface CssEffectsConfig {
  pulsatingVideowrapBorder: boolean;
  animatedBackground: boolean;
  customScrollbars: boolean;
  videowrapTvScanlines: boolean;
  videowrapVhsGlitch: boolean;
  videowrapFloatingFrame: boolean;
  videowrapFilmBorder: boolean;
  pulsatingMotdBackground: boolean;
  animatedQueue: boolean;
  cinematicBlackBars: boolean;
  // New Background Effects
  animatedBackgroundNebula: boolean;
  animatedBackgroundPulsatingGrid: boolean;
  animatedBackgroundFloatingBlobs: boolean;
  // New Videowrap Effects
  videowrapNightVision: boolean;
  videowrapSecurityCamera: boolean;
  videowrapHolographic: boolean;
  videowrapSepiaFilm: boolean;
  videowrapCrtEffect: boolean;
  videowrapSignalInterference: boolean;
  videowrapPulsatingGlow: boolean;
  videowrapOldTVStartup: boolean;
  // Advanced Videowrap Effects
  videowrapStaticNoise: boolean;
  videowrapGlitchEffect: boolean;
  videowrapFilmGrain: boolean;
  // Themed Gimmicks
  simpsonsCloudBackground: boolean;
  simpsonsTvFrame: boolean;
  // Weird/Spooky Effects
  invertColors: boolean;
  creepyTextShadow: boolean;
  dramaticLighting: boolean;
  spookyFogOverlay: boolean;
  staticNoiseBackground: boolean;
  // Christmas Effects
  christmasLightsHeader: boolean;
  letItSnow: boolean;
  // New Playlist Effects
  animatedQueueNowPlaying: boolean;
  playlistHoverGlitchText: boolean;
  playlistSlideInOnLoad: boolean;
  playlistItemSpotlight: boolean;
}

// FIX: Add missing UserStyle interface to fix import error in UserStyleEditor.tsx.
export interface UserStyle {
  id: string;
  username: string;
  customName: string;
  fontFamily: string;
  color: string;
  hideOriginal: boolean;
}

export interface AppConfig {
  fontImportUrl: string;
  fontFamilyName: string;
  motd: MotdConfig;
  foundation: FoundationStyles;
  userStyles: UserStyle[];
  advancedCss: string;
  javascript: JavascriptConfig;
  cssEffects: CssEffectsConfig;
}