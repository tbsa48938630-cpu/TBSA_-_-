
import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white text-xl font-bold">通</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">親師溝通潤飾小幫手</h1>
          <p className="text-xs text-gray-500">The Diplomatic Messenger</p>
        </div>
      </div>
      <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
        <a href="#editor" className="hover:text-indigo-600 transition-colors">訊息潤飾</a>
        <a href="#challenge" className="hover:text-indigo-600 transition-colors">情境挑戰</a>
      </nav>
    </div>
  </header>
);

export const Footer: React.FC = () => (
  <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <p className="text-sm text-gray-500">© 2024 親師溝通潤飾小幫手. 老師的情緒緩衝區。</p>
    </div>
  </footer>
);

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
    {children}
  </main>
);
