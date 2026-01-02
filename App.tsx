
import React from 'react';
import { Header, Footer, Container } from './components/Layout';
import { MessageEditor } from './components/MessageEditor';
import { ScenarioChallenge } from './components/ScenarioChallenge';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <Container>
        {/* Welcome Section */}
        <section className="text-center space-y-4 py-8">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            化直言為 <span className="text-indigo-600">溫柔力量</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            親師溝通不再是壓力。將您的真實想法交給 AI，我們為您轉化為專業、有溫度的橋樑，讓家長與老師成為最強大的隊友。
          </p>
        </section>

        {/* Feature Sections */}
        <div className="space-y-24">
          <MessageEditor />
          <ScenarioChallenge />
        </div>

        {/* Tips Section */}
        <section className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6">溝通小提醒</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <h4 className="font-bold">以孩子為中心</h4>
                <p className="text-indigo-200 text-sm">永遠從「為了幫助孩子更好地成長」出發，減少對家長教養方式的直接批判。</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <h4 className="font-bold">先肯定後提醒</h4>
                <p className="text-indigo-200 text-sm">溝通時可以先提及孩子在學校的一點微小進步，再帶出需要家長協助的部分。</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <h4 className="font-bold">具體的行動方案</h4>
                <p className="text-indigo-200 text-sm">不只是報告問題，更提出老師目前的做法與家長在家可以嘗試配合的建議。</p>
              </div>
            </div>
          </div>
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </section>
      </Container>

      <Footer />
    </div>
  );
};

export default App;
