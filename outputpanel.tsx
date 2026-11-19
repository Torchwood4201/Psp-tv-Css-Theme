
import React, { useState } from 'react';
import CodeBlock from './codeblock';
import { AppConfig } from './types';

interface OutputPanelProps {
  config: AppConfig;
  cssCode: string;
  jsCode: string;
  motdHtml: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ config, cssCode, jsCode, motdHtml }) => {
  const [activeCode, setActiveCode] = useState<'css' | 'html' | 'js'>('css');
  const codeMap = { css: cssCode, html: motdHtml, js: jsCode };
  const motdTitle = config.motd.title || 'Friday Night Screening';
  const motdSubtitle = config.motd.subtitle || 'Live at the /cytube lounge';

  return (
    <div className="output-panel">
      <header className="workspace-header">
        <div>
          <span className="eyebrow">PSP-TV / CHANNEL TOOLS</span>
          <h1>Theme Studio</h1>
        </div>
        <div className="status-pill"><span></span> Live preview</div>
      </header>

      <section className="preview-card" aria-label="Live theme preview">
        <div className="preview-toolbar">
          <div className="window-dots"><i></i><i></i><i></i></div>
          <span>psp-tv.org / live channel</span>
          <div className="preview-tools"><span>1K</span><button aria-label="Expand preview">↗</button></div>
        </div>
        <div className="channel-preview" style={{ backgroundColor: config.foundation.bodyBgColor }}>
          <nav className="channel-nav">
            <div className="channel-mark">P</div>
            <strong>PSP <em>TV</em></strong>
            <div className="nav-links"><span>WATCH</span><span>CHAT</span><span>PLAYLIST</span></div>
          </nav>
          <div className="preview-layout">
            <div className="video-column">
              <div
                className="motd-preview"
                style={{
                  backgroundImage: config.motd.backgroundImageUrl
                    ? `linear-gradient(135deg, rgba(8,10,20,.35), rgba(8,10,20,.72)), url(${config.motd.backgroundImageUrl})`
                    : undefined,
                  backgroundColor: config.foundation.messageBufferBgColor,
                }}
              >
                <span className="broadcast-label">NOW BROADCASTING</span>
                <h2 style={{ color: config.motd.titleColor, fontSize: 'clamp(28px, 4vw, 62px)', textShadow: config.motd.titleTextShadow }}>{motdTitle}</h2>
                <p style={{ color: config.motd.subtitleColor, textShadow: config.motd.subtitleTextShadow }}>{motdSubtitle}</p>
              </div>
              <div className="video-frame">
                <div className="video-art">
                  <div className="orb orb-one"></div><div className="orb orb-two"></div>
                  <div className="play-button">▶</div>
                </div>
                <div className="video-meta">
                  <div><strong>Midnight transmission</strong><span>01:42 / 03:18</span></div>
                  <div className="progress"><i></i></div>
                </div>
              </div>
            </div>
            <aside className="playlist-preview">
              <div className="playlist-title"><strong>Up next</strong><span>12 videos</span></div>
              {[['01','Night Drive','3:18'],['02','Neon Skyline','4:02'],['03','After Hours','2:47']].map((item, index) => (
                <div className="queue-item" key={item[0]} style={index === 0 ? { background: config.foundation.queueActiveBgColor, color: config.foundation.queueActiveTextColor } : { borderColor: config.foundation.queueItemBorder ? `${config.foundation.linkColor}55` : 'transparent' }}>
                  <span>{item[0]}</span><div><strong>{item[1]}</strong><small style={{ color: index === 0 ? config.foundation.queueActiveTextColor : config.foundation.timestampColor }}>{item[2]}</small></div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="code-section">
        <div className="code-heading">
          <div>
            <span className="eyebrow">INSTALLATION</span>
            <h2>Generated output</h2>
          </div>
          <div className="code-tabs">
            <button className={activeCode === 'css' ? 'active' : ''} onClick={() => setActiveCode('css')}>CSS</button>
            <button className={activeCode === 'html' ? 'active' : ''} onClick={() => setActiveCode('html')}>MOTD</button>
            <button className={activeCode === 'js' ? 'active' : ''} onClick={() => setActiveCode('js')}>JavaScript</button>
          </div>
        </div>
        <CodeBlock code={codeMap[activeCode]} language={activeCode === 'js' ? 'javascript' : activeCode} />
      </section>
    </div>
  );
};

export default OutputPanel;
