
import React from 'react';
import { UserStyle } from '../types';

interface UserStyleEditorProps {
  userStyle: UserStyle;
  onChange: (updatedStyle: UserStyle) => void;
  onRemove: () => void;
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

const UserStyleEditor: React.FC<UserStyleEditorProps> = ({ userStyle, onChange, onRemove }) => {
  return (
    <div className="p-4 space-y-3 bg-gray-800/40 rounded-lg border border-gray-700/50">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-base text-gray-200">{userStyle.username || 'New User'}</p>
        <button onClick={onRemove} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors" aria-label="Remove user style">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Username</label>
          <input
            type="text"
            value={userStyle.username}
            onChange={(e) => onChange({ ...userStyle, username: e.target.value })}
            placeholder="e.g. montezuma"
            className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Custom Display Name</label>
          <input
            type="text"
            value={userStyle.customName}
            onChange={(e) => onChange({ ...userStyle, customName: e.target.value })}
            placeholder="e.g. Cool User: "
            className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Font Family</label>
          <input
            type="text"
            value={userStyle.fontFamily}
            onChange={(e) => onChange({ ...userStyle, fontFamily: e.target.value })}
            placeholder="e.g., VT323"
            className="w-full mt-1 px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Color</label>
            <input
              type="color"
              value={userStyle.color}
              onChange={(e) => onChange({ ...userStyle, color: e.target.value })}
              className="w-10 h-10 mt-1 p-0 bg-transparent border-none rounded-md cursor-pointer"
            />
          </div>
          <div className="pt-6">
            <ToggleSwitch
                id={`hide-${userStyle.id}`}
                checked={userStyle.hideOriginal}
                onChange={(checked) => onChange({ ...userStyle, hideOriginal: checked })}
                label="Hide original"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStyleEditor;
