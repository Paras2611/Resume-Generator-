import React, { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { ResumeData, TemplateType } from './types';
import { INITIAL_DATA } from './constants';
import { Download, Layout, FileText, Monitor } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  const [template, setTemplate] = useState<TemplateType>(TemplateType.MODERN);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  
  // Persist data
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if(confirm("Are you sure you want to reset all data to default?")) {
        setData(INITIAL_DATA);
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 font-sans text-gray-900">
      
      {/* Header / Navbar */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-20 shrink-0 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0">R</div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800 hidden sm:block">ResuCraft</h1>

          {/* Mobile Template Selector */}
          <div className="md:hidden relative ml-2">
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value as TemplateType)}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={TemplateType.MODERN}>Modern</option>
              <option value={TemplateType.CLASSIC}>Classic</option>
              <option value={TemplateType.MINIMAL}>Minimal</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
               <Layout size={14} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Template Switcher */}
          <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
             <button 
                onClick={() => setTemplate(TemplateType.MODERN)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${template === TemplateType.MODERN ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
             >
                Modern
             </button>
             <button 
                onClick={() => setTemplate(TemplateType.CLASSIC)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${template === TemplateType.CLASSIC ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
             >
                Classic
             </button>
             <button 
                onClick={() => setTemplate(TemplateType.MINIMAL)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${template === TemplateType.MINIMAL ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
             >
                Minimal
             </button>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>

          <button 
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors hidden sm:block"
          >
            Reset
          </button>
          
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* Editor Pane */}
        <div className={`w-full md:w-1/2 lg:w-[450px] xl:w-[500px] bg-white h-full flex flex-col z-10 transition-transform duration-300 absolute md:relative ${activeTab === 'editor' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} print:hidden shadow-xl md:shadow-none`}>
          <Editor data={data} onChange={setData} />
        </div>

        {/* Preview Pane Container */}
        <div className={`w-full md:flex-1 bg-gray-200/50 h-full overflow-y-auto flex items-start justify-center p-4 md:p-8 transition-transform duration-300 absolute md:relative ${activeTab === 'preview' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} print:w-full print:h-full print:p-0 print:bg-white print:absolute print:z-50 print:top-0 print:left-0 print:overflow-visible`}>
           
           {/* The actual A4 Page */}
           <div className="bg-white shadow-xl print:shadow-none w-[210mm] min-h-[297mm] print:w-full print:h-auto print:min-h-0 origin-top transform md:scale-[0.6] lg:scale-[0.75] xl:scale-[0.85] 2xl:scale-100 print:transform-none transition-transform duration-200 ease-out">
              <Preview data={data} template={template} />
           </div>
           
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-6 z-30 print:hidden">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'editor' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <FileText size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wide">Edit</span>
          </button>
          
          <div className="w-px h-8 bg-gray-700"></div>
          
          <button 
            onClick={() => setActiveTab('preview')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'preview' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <Monitor size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wide">View</span>
          </button>

          <div className="w-px h-8 bg-gray-700"></div>

          <button 
            onClick={handlePrint}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-green-400 transition-colors"
          >
            <Download size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wide">Save</span>
          </button>
        </div>

      </main>
    </div>
  );
};

export default App;