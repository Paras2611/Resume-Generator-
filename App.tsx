
import React, { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { ResumeData, TemplateType } from './types';
import { INITIAL_DATA } from './constants';
import { Download, FileText, Monitor, Palette, X } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  const [template, setTemplate] = useState<TemplateType>(TemplateType.MODERN);
  const [themeColor, setThemeColor] = useState<string>(() => {
    return localStorage.getItem('themeColor') || '#2563eb';
  });
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  
  // Print/Export State
  const [showExportModal, setShowExportModal] = useState(false);
  const [printSettings, setPrintSettings] = useState({
    size: 'a4' as 'a4' | 'letter',
    orientation: 'portrait' as 'portrait' | 'landscape'
  });

  // Persist data
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  // Persist theme color
  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  const handleExportClick = () => {
    setShowExportModal(true);
  };

  const handlePrintConfirm = () => {
    setShowExportModal(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleReset = () => {
    if(confirm("Are you sure you want to reset all data to default?")) {
        setData(INITIAL_DATA);
        setThemeColor('#2563eb');
    }
  }

  const getPageDimensions = () => {
    const isPortrait = printSettings.orientation === 'portrait';
    const a4 = { w: 210, h: 297 };
    const letter = { w: 215.9, h: 279.4 };
    const selectedDim = printSettings.size === 'a4' ? a4 : letter;
    
    return {
      width: isPortrait ? `${selectedDim.w}mm` : `${selectedDim.h}mm`,
      minHeight: isPortrait ? `${selectedDim.h}mm` : `${selectedDim.w}mm`
    };
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 font-sans text-gray-900">
      <style>{`
        @media print {
          @page {
            size: ${printSettings.size} ${printSettings.orientation};
            margin: 0;
          }
        }
      `}</style>

      {/* Header / Navbar */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-20 shrink-0 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0 transition-colors" style={{ backgroundColor: themeColor }}>R</div>
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
              <option value={TemplateType.ELEGANT}>Elegant</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Template Switcher */}
          <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
             <button 
                onClick={() => setTemplate(TemplateType.MODERN)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${template === TemplateType.MODERN ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                style={template === TemplateType.MODERN ? { color: themeColor } : {}}
             >
                Modern
             </button>
             <button 
                onClick={() => setTemplate(TemplateType.CLASSIC)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${template === TemplateType.CLASSIC ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                style={template === TemplateType.CLASSIC ? { color: themeColor } : {}}
             >
                Classic
             </button>
             <button 
                onClick={() => setTemplate(TemplateType.MINIMAL)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${template === TemplateType.MINIMAL ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                style={template === TemplateType.MINIMAL ? { color: themeColor } : {}}
             >
                Minimal
             </button>
             <button 
                onClick={() => setTemplate(TemplateType.ELEGANT)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${template === TemplateType.ELEGANT ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                style={template === TemplateType.ELEGANT ? { color: themeColor } : {}}
             >
                Elegant
             </button>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="color-picker" className="cursor-pointer p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors" title="Change Accent Color">
                <Palette size={18} />
            </label>
            <input 
                id="color-picker"
                type="color" 
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0 overflow-hidden"
                style={{ backgroundColor: 'transparent' }}
            />
          </div>

          <button 
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors hidden sm:block"
          >
            Reset
          </button>
          
          <button 
            onClick={handleExportClick}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:brightness-110"
            style={{ backgroundColor: themeColor }}
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
           
           {/* The actual Page */}
           <div 
             className="bg-white shadow-xl print:shadow-none origin-top transform md:scale-[0.6] lg:scale-[0.75] xl:scale-[0.85] 2xl:scale-100 print:transform-none transition-all duration-200 ease-out"
             style={getPageDimensions()}
           >
              <Preview data={data} template={template} themeColor={themeColor} />
           </div>
           
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-6 z-30 print:hidden">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'editor' ? 'text-blue-400' : 'text-gray-400'}`}
            style={activeTab === 'editor' ? { color: themeColor } : {}}
          >
            <FileText size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wide">Edit</span>
          </button>
          
          <div className="w-px h-8 bg-gray-700"></div>
          
          <button 
            onClick={() => setActiveTab('preview')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'preview' ? 'text-blue-400' : 'text-gray-400'}`}
            style={activeTab === 'preview' ? { color: themeColor } : {}}
          >
            <Monitor size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wide">View</span>
          </button>

          <div className="w-px h-8 bg-gray-700"></div>

          <button 
            onClick={handleExportClick}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-green-400 transition-colors"
          >
            <Download size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wide">Save</span>
          </button>
        </div>

      </main>

      {/* Export Options Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm print:hidden p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-800">Export Options</h3>
              <button 
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 block">Paper Size</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPrintSettings(s => ({ ...s, size: 'a4' }))}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${printSettings.size === 'a4' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    A4
                    <span className="block text-[10px] opacity-70 font-normal mt-0.5">210 x 297 mm</span>
                  </button>
                  <button 
                    onClick={() => setPrintSettings(s => ({ ...s, size: 'letter' }))}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${printSettings.size === 'letter' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    Letter
                    <span className="block text-[10px] opacity-70 font-normal mt-0.5">8.5 x 11 in</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 block">Orientation</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPrintSettings(s => ({ ...s, orientation: 'portrait' }))}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${printSettings.orientation === 'portrait' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    Portrait
                  </button>
                  <button 
                    onClick={() => setPrintSettings(s => ({ ...s, orientation: 'landscape' }))}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${printSettings.orientation === 'landscape' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    Landscape
                  </button>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-3">
              <button 
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handlePrintConfirm}
                className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: themeColor }}
              >
                <Download size={16} />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
