import {
  Building, FolderOpen, RefreshCw, TerminalSquare
} from 'lucide-react';

const SettingsView = ({ t }) => (
  <div className="p-6 max-w-4xl mx-auto space-y-8 pb-24">
    <h1 className={`text-3xl font-bold ${t.textMain} mb-6`}>Configurações e Sistema</h1>
    <section className="space-y-4">
      <h2 className={`text-xl font-bold ${t.textMain} flex items-center border-b ${t.border} pb-2`}><FolderOpen className="mr-2" /> Armazenamento Offline</h2>
      <div className="space-y-3">
        <label className={`text-sm font-medium ${t.textSec}`}>Diretório Base dos CSVs</label>
        <input type="text" readOnly value="C:\Users\User\Documents\MidasData\" className={`w-full p-3 ${t.bgInput} border ${t.border} rounded-lg ${t.textMain} font-mono text-sm`} />
        <div className="flex space-x-3">
          <button className={`px-4 py-2 ${t.bgCard} border ${t.border} ${t.textMain} rounded-lg font-medium ${t.hover} transition-colors`}>Abrir Diretório</button>
          <button className="px-4 py-2 bg-[#D4AF37] text-[#1A3E4E] rounded-lg font-medium hover:brightness-95 transition-colors">Forçar Recarga dos CSVs</button>
        </div>
      </div>
    </section>
    <section className="space-y-4">
      <h2 className={`text-xl font-bold ${t.textMain} flex items-center border-b ${t.border} pb-2`}><Building className="mr-2" /> API de Cotações (B3)</h2>
      <div className={`flex items-center justify-between ${t.bgCard} p-4 rounded-xl border ${t.border} shadow-sm transition-colors`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-[#A8A39D]/20 ${t.textMain} rounded-full`}><RefreshCw size={24} /></div>
          <div><p className={`font-semibold ${t.textMain}`}>Status</p><p className={`text-sm ${t.textSec}`}>Última sincronização: 21/03</p></div>
        </div>
        <button className={`px-4 py-2 ${t.isDark ? 'bg-[#D4AF37] text-[#1A3E4E]' : 'bg-[#1A3E4E] text-[#FDFDFA]'} rounded-lg font-bold hover:brightness-110 transition-colors`}>Sincronizar Manualmente</button>
      </div>
    </section>
    <section className="space-y-4">
      <h2 className={`text-xl font-bold ${t.textMain} flex items-center border-b ${t.border} pb-2`}><TerminalSquare className="mr-2" /> Console de Diagnóstico</h2>
      <div className={`${t.isDark ? 'bg-[#061015]' : 'bg-[#1A3E4E]'} rounded-xl p-4 font-mono text-sm h-64 overflow-y-auto border ${t.border}`}>
        <p className="text-[#2E8B57]">[OK] Sistema iniciado.</p>
        <p className="text-[#D4AF37]">[AVISO] Linha 4 ignorada.</p>
        <p className="text-[#FDFDFA] animate-pulse">_</p>
      </div>
    </section>
  </div>
);

export default SettingsView
