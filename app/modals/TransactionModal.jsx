import { FormatBRL } from '../utils/formatters'
import {
  ChevronRight, Calendar, X, Trash2
} from 'lucide-react';

const TransactionModal = ({ t, isOpen, onClose, editingTx }) => {
  if (!isOpen) return null;
  const isEditing = !!editingTx;
  return (
    <div className="fixed inset-0 bg-[#061015]/80 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div className={`${t.bgCard} w-full md:w-[500px] md:rounded-2xl rounded-t-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-4 border ${t.border}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${t.textMain}`}>{isEditing ? 'Editar Transação' : 'Nova Transação'}</h2>
          <button onClick={onClose} className={`p-2 ${t.hover} rounded-full ${t.textMain}`}><X size={24} /></button>
        </div>
        <div className="flex bg-[#A8A39D]/10 p-1 rounded-xl mb-6">
          <button className={`flex-1 py-2 rounded-lg font-bold ${(!isEditing || editingTx.type === 'out') ? `${t.bgCard} text-[#CD5C5C] shadow-sm` : 'text-[#A8A39D] bg-transparent'}`}>Gasto</button>
          <button className={`flex-1 py-2 rounded-lg font-bold ${(isEditing && editingTx.type === 'in') ? `${t.bgCard} text-[#2E8B57] shadow-sm` : 'text-[#A8A39D] bg-transparent'}`}>Rendimento</button>
        </div>
        <div className="space-y-5">
          <div>
            <label className={`text-sm font-medium ${t.textSec}`}>Valor</label>
            <input type="text" defaultValue={isEditing ? FormatBRL(Math.abs(editingTx.value)) : ''} placeholder="R$ 0,00" className={`w-full text-4xl font-bold ${t.textMain} focus:outline-none border-b-2 border-transparent bg-transparent focus:border-[#D4AF37] py-2`} autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-sm font-medium ${t.textSec}`}>Data</label>
              <div className="relative mt-1">
                <Calendar className={`absolute left-3 top-3 ${t.textSec}`} size={20} />
                <input type="text" defaultValue={isEditing ? editingTx.date : "21/03/2026"} className={`w-full pl-10 pr-3 py-3 ${t.bgInput} border ${t.border} rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none ${t.textMain}`} />
              </div>
            </div>
            <div>
              <label className={`text-sm font-medium ${t.textSec}`}>Categoria</label>
              <button className={`w-full mt-1 text-left px-4 py-3 ${t.bgInput} border ${t.border} rounded-xl ${t.textMain} ${t.hover} flex justify-between items-center transition-colors truncate`}>
                <span className="truncate">{isEditing ? editingTx.path.split(' > ').pop() : 'Selecionar...'}</span>
                <ChevronRight size={18} className={`flex-shrink-0 ${t.textSec}`} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex space-x-3 mt-8">
          {isEditing && <button onClick={onClose} className="py-4 px-4 font-bold text-[#CD5C5C] hover:bg-[#CD5C5C]/10 rounded-xl transition-colors border border-transparent"><Trash2 size={24} /></button>}
          <button onClick={onClose} className={`flex-1 py-4 font-bold ${t.textMain} ${t.hover} rounded-xl transition-colors`}>Cancelar</button>
          <button className="flex-1 py-4 font-bold bg-[#D4AF37] text-[#1A3E4E] rounded-xl shadow-lg hover:brightness-95 transition-colors">Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal

