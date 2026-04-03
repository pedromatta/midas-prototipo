import { FormatBRL } from '../utils/formatters'
import {
  Plus, CheckCircle, Building,
} from 'lucide-react';

const Dashboard = ({ t, openTxModal }) => (
  <div className="p-6 max-w-6xl mx-auto space-y-6">
    <div className="flex justify-between items-center mb-8">
      <h1 className={`text-3xl font-bold ${t.textMain}`}>Visão Geral</h1>
      <div className={`flex space-x-4 ${t.textSec}`}>
        <div className="flex items-center space-x-1"><CheckCircle size={20} className={t.success} /><span className="text-sm hidden sm:inline">CSVs OK</span></div>
        <div className="flex items-center space-x-1"><Building size={20} className={t.isDark ? 'text-[#D4AF37]' : 'text-[#1A3E4E]'} /><span className="text-sm hidden sm:inline">B3: 09:20</span></div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className={`${t.bgCard} p-5 rounded-xl shadow-sm border ${t.border} transition-colors`}>
        <p className={`text-sm ${t.textSec} font-medium mb-1`}>Rendimentos</p>
        <p className={`text-2xl font-bold ${t.success}`}>{FormatBRL(10000)}</p>
      </div>
      <div className={`${t.bgCard} p-5 rounded-xl shadow-sm border ${t.border} transition-colors`}>
        <p className={`text-sm ${t.textSec} font-medium mb-1`}>Gastos</p>
        <p className={`text-2xl font-bold ${t.danger}`}>{FormatBRL(8500)}</p>
      </div>
      <div className={`${t.bgCard} p-5 rounded-xl shadow-sm border ${t.border} transition-colors`}>
        <p className={`text-sm ${t.textSec} font-medium mb-1`}>Disponível</p>
        <p className={`text-2xl font-bold ${t.textMain}`}>{FormatBRL(1500)}</p>
      </div>
      <div className={`${t.isDark ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50' : 'bg-[#1A3E4E] border-[#1A3E4E]'} p-5 rounded-xl shadow-sm border transition-colors`}>
        <p className={`text-sm font-medium mb-1 ${t.isDark ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}`}>Patrimônio Total</p>
        <p className={`text-2xl font-bold ${t.isDark ? 'text-[#D4AF37]' : 'text-[#FDFDFA]'}`}>{FormatBRL(150000)}</p>
      </div>
    </div>
    <div className={`${t.bgCard} p-6 rounded-xl shadow-sm border ${t.border} mt-6 transition-colors`}>
      <div className="flex justify-between items-end mb-2">
        <span className={`font-semibold ${t.textMain}`}>Fluxo de Caixa</span>
        <span className={`text-sm font-medium ${t.textSec}`}>Consumido: 85% do rendimento mensal</span>
      </div>
      <div className="w-full h-6 bg-[#A8A39D]/20 rounded-full overflow-hidden flex">
        <div className="h-full bg-[#CD5C5C]" style={{ width: '65%' }}></div>
        <div className="h-full bg-[#D4AF37]" style={{ width: '20%' }}></div>
      </div>
      <div className={`flex space-x-4 mt-2 text-xs ${t.textSec}`}>
        <div className="flex items-center"><div className="w-3 h-3 bg-[#CD5C5C] rounded-full mr-1"></div> Gastos</div>
        <div className="flex items-center"><div className="w-3 h-3 bg-[#D4AF37] rounded-full mr-1"></div> Investimentos</div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button onClick={() => openTxModal(null)} className={`flex-1 ${t.accent} hover:brightness-95 text-[#1A3E4E] py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-sm`}>
        <Plus className="mr-2" size={20} /> Nova Transação
      </button>
    </div>
  </div>
);

export default Dashboard
