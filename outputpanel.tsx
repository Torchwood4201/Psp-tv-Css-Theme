
import React from 'react';
import CodeBlock from './codeblock';

interface OutputPanelProps {
  cssCode: string;
  jsCode: string;
  motdHtml: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ cssCode, jsCode, motdHtml }) => {
  return (
    <div className="p-8 h-full overflow-y-auto">
        <header className="mb-10">
            <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Cytube Style Generator
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl text-lg">
                Use the AI to create a theme, or configure it manually. Then, copy the generated code into the appropriate sections of your channel settings.
            </p>
        </header>
        
        <div className="space-y-10">
            <div>
                <h2 className="flex items-center text-2xl font-semibold text-indigo-400 mb-3">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    Generated CSS
                </h2>
                <CodeBlock code={cssCode} language="css" />
            </div>
            <div>
                <h2 className="flex items-center text-2xl font-semibold text-indigo-400 mb-3">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v1h-14v-1zM5 8h14v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8z"></path></svg>
                    Generated MOTD HTML
                </h2>
                <CodeBlock code={motdHtml} language="html" />
            </div>
            <div>
                <h2 className="flex items-center text-2xl font-semibold text-indigo-400 mb-3">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
                    Generated JavaScript
                </h2>
                <CodeBlock code={jsCode} language="javascript" />
            </div>
        </div>
    </div>
  );
};

export default OutputPanel;
