
import React, { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { ResumeData, TemplateType } from './types';
import { INITIAL_DATA } from './constants';
import { Download, FileText, Monitor, Palette, X, Printer, Layout, Settings2 } from 'lucide-react';

const App: React.FC = () => {
  // Robust Data Initialization
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (!saved) return INITIAL_DATA;
      
      const parsed = JSON.parse(saved);
      
      // Deep merge with INITIAL_DATA to ensure schema compatibility
      return {
        ...INITIAL_DATA,
        ...parsed,
        personalInfo: {
          ...INITIAL_DATA.personalInfo,
          ...(parsed.personalInfo || {})
        },
        experience: parsed.experience || [],
        education: parsed.education || [],
        skills: parsed.skills || [],
        projects: parsed.projects || []
      };
    } catch (error) {
      console.error("Failed to load resume data from storage:", error);
      return INITIAL_DATA;
    }
  });

  const [template, setTemplate] = useState<TemplateType>(TemplateType.MODERN);
  
  // Safe Theme Color Initialization
  const [themeColor, setThemeColor] = useState<string>(() => {
    try {
      return localStorage.getItem('themeColor') || '#2563eb';
    } catch {
      return '#2563eb';
    }
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
    try {
      localStorage.setItem('resumeData', JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save resume data", e);
    }
  }, [data]);

  // Persist theme color
  useEffect(() => {
    try {
      localStorage.setItem('themeColor', themeColor);
    } catch (e) {
      console.error("Failed to save theme color", e);
    }
  }, [themeColor]);

  const handleExportClick = () => {
    setShowExportModal(true);
  };

  const handlePrintConfirm = () => {
    setShowExportModal(false);
    // Small timeout to allow modal to close before print dialog freezes UI
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleReset = () => {
    if(confirm("Are you sure you want to reset all data to default? This cannot be undone.")) {
        setData(INITIAL_DATA);
        setThemeColor('#2563eb');
        localStorage.removeItem('resumeData');
        localStorage.removeItem('themeColor');
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
      {/* Dynamic Print Styles */}
      <style>{`
        @media print {
          @page {
            size: ${printSettings.size} ${printSettings.orientation};
            margin: 0;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Header / Navbar */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-20 shrink-0 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0 transition-colors" style={{ backgroundColor: themeColor }}>R</div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800 hidden sm:block">ResuCraft</h1>

          {/* Mobile Template Selector - Native select for reliability */}
          <div className="md:hidden relative ml-2">
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value as TemplateType)}
              className="bg-gray-50 border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Preview Pane Container (Main View) */}
        <div className={`w-full md:flex-1 bg-gray-200/50 h-full overflow-y-auto flex items-start justify-center p-4 md:p-8 transition-transform duration-300 absolute md:relative ${activeTab === 'preview' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} print:absolute print:inset-0 print:w-full print:h-auto print:min-h-screen print:bg-white print:z-50 print:overflow-visible print:p-0 print:block`}>
           
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

      {/* Full Screen Print Preview Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-slate-900/95 backdrop-blur-sm print:hidden animate-in fade-in duration-200">
          
          {/* Header (Mobile Only) */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-slate-900">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Printer size={18} /> Print Preview
            </h3>
            <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Left: Preview Area */}
          <div className="flex-1 overflow-hidden relative flex items-center justify-center p-4 md:p-10 bg-slate-900/50">
            <div className="relative shadow-2xl transition-all duration-300 ease-out origin-center transform scale-[0.45] sm:scale-[0.55] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.8]">
               <div style={getPageDimensions()} className="bg-white">
                  <Preview data={data} template={template} themeColor={themeColor} />
               </div>
            </div>
          </div>

          {/* Right: Settings Sidebar */}
          <div className="w-full md:w-80 bg-white shadow-2xl flex flex-col z-10 shrink-0">
            <div className="hidden md:flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <Settings2 size={20} /> Print Settings
              </h3>
              <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 flex-1 space-y-8 overflow-y-auto">
              {/* Paper Size */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                  <FileText size={16} /> Paper Size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPrintSettings(s => ({ ...s, size: 'a4' }))}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${printSettings.size === 'a4' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'}`}
                  >
                    <span className="font-bold text-lg">A4</span>
                    <span className="text-[10px] opacity-60">210 x 297 mm</span>
                  </button>
                  <button 
                    onClick={() => setPrintSettings(s => ({ ...s, size: 'letter' }))}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${printSettings.size === 'letter' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'}`}
                  >
                    <span className="font-bold text-lg">Letter</span>
                    <span className="text-[10px] opacity-60">8.5 x 11 in</span>
                  </button>
                </div>
              </div>

              {/* Orientation */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                  <Layout size={16} /> Orientation
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPrintSettings(s => ({ ...s, orientation: 'portrait' }))}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${printSettings.orientation === 'portrait' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'}`}
                  >
                    <div className="w-6 h-8 border-2 border-current rounded-sm mb-1"></div>
                    <span className="text-xs font-semibold">Portrait</span>
                  </button>
                  <button 
                    onClick={() => setPrintSettings(s => ({ ...s, orientation: 'landscape' }))}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${printSettings.orientation === 'landscape' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'}`}
                  >
                    <div className="w-8 h-6 border-2 border-current rounded-sm mb-1"></div>
                    <span className="text-xs font-semibold">Landscape</span>
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg text-xs text-blue-800 leading-relaxed">
                <p><strong>Tip:</strong> In the browser print dialog, ensure "Background graphics" is checked for colors to appear correctly.</p>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={handlePrintConfirm}
                className="w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg hover:brightness-110 hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                style={{ backgroundColor: themeColor }}
              >
                <Printer size={24} />
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
