import { FormatBRL } from '../utils/formatters'
import {
  Plus, Search, ChevronLeft, ChevronRight, ArrowUpCircle,
  ArrowDownCircle, Edit2
} from 'lucide-react';

const Transactions = ({ t, transactions, openTxModal }) => (
  <div className={`h-full flex flex-col max-w-4xl mx-auto ${t.bgMain} transition-colors`}>
    <div className={`sticky top-0 ${t.bgMain} z-10 pt-6 px-4 pb-4 border-b ${t.border} space-y-4 transition-colors`}>
      <div className="flex justify-between items-center px-4">
        <button className={`p-2 ${t.hover} rounded-full ${t.textMain}`}><ChevronLeft size={20} /></button>
        <h2 className={`text-lg font-bold ${t.textMain}`}>Setembro 2024</h2>
        <button className={`p-2 ${t.hover} rounded-full ${t.textMain}`}><ChevronRight size={20} /></button>
      </div>
      <div className="relative">
        <Search className={`absolute left-3 top-3.5 ${t.textSec}`} size={20} />
        <input type="text" placeholder="Buscar transação..." className={`w-full pl-10 pr-4 py-3 rounded-xl border ${t.border} ${t.bgInput} focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${t.textMain}`} />
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <button className={`px-4 py-1.5 ${t.isDark ? 'bg-[#D4AF37] text-[#1A3E4E]' : 'bg-[#1A3E4E] text-[#FDFDFA]'} rounded-full text-sm font-bold whitespace-nowrap`}>Todos</button>
        <button className={`px-4 py-1.5 ${t.bgCard} border ${t.border} ${t.textMain} rounded-full text-sm font-medium whitespace-nowrap`}>Entradas</button>
        <button className={`px-4 py-1.5 ${t.bgCard} border ${t.border} ${t.textMain} rounded-full text-sm font-medium whitespace-nowrap`}>Saídas</button>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
      {transactions.map(tx => (
        <div key={tx.id} className={`${t.bgCard} p-4 rounded-xl border ${t.border} shadow-sm flex items-center justify-between group transition-colors`}>
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${tx.type === 'in' ? 'bg-[#2E8B57]/10 text-[#2E8B57]' : 'bg-(--color-alert)/10 text-(--color-alert)'}`}>
              {tx.type === 'in' ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
            </div>
            <div>
              <p className={`font-bold ${t.textMain}`}>{tx.desc}</p>
              <p className={`text-xs ${t.textSec}`}>{tx.path}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className={`font-bold ${tx.type === 'in' ? t.success : t.textMain}`}>
                {tx.type === 'in' ? '+' : '-'}{FormatBRL(Math.abs(tx.value))}
              </p>
              <p className={`text-xs ${t.textSec}`}>{tx.date}</p>
            </div>
            <div className="hidden group-hover:flex space-x-2">
              <button onClick={() => openTxModal(tx)} className={`p-2 ${t.textSec} hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full transition-colors`}><Edit2 size={18} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <button onClick={() => openTxModal(null)} className="fixed bottom-20 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#D4AF37] text-[#1A3E4E] rounded-full shadow-lg flex items-center justify-center hover:brightness-95 transition-transform hover:scale-105 z-50">
      <Plus size={28} />
    </button>
  </div>
);
// ==========================================
// 1. DADOS SIMULADOS (MOCK DATA)
// ==========================================
const initialData = {
  Rendimentos: {
    name: 'Rendimentos', total: 10000, type: 'income',
    children: [
      {
        name: 'Salário', percent: 70, current: 7000, target: 7000, color: '#218380', children: [
          { name: 'Fixo', percent: 90, current: 6300, target: 6300, color: '#3BB2B8' },
          { name: 'Bônus', percent: 10, current: 700, target: 700, color: '#73D2D6' }
        ]
      },
      {
        name: 'Freelance', percent: 30, current: 1500, target: 3000, color: '#005C69', children: [
          { name: 'Cliente A', percent: 60, current: 1500, target: 1800, color: '#007B8C' },
          { name: 'Cliente B', percent: 40, current: 0, target: 1200, color: '#00A3A8' }
        ]
      }
    ]
  },
  Gastos: {
    name: 'Gastos', total: 10000, type: 'expense',
    children: [
      {
        name: 'Gastos Fixos', percent: 50, current: 4500, target: 5000, color: '#936277', children: [
          { name: 'Aluguel', percent: 60, current: 3000, target: 3000, color: '#AB7A92' },
          { name: 'Escola', percent: 40, current: 1500, target: 2000, color: '#C492B1' }
        ]
      },
      {
        name: 'Gastos Variáveis', percent: 30, current: 2000, target: 3000, color: '#D4AF37', children: [
          { name: 'Mercado', percent: 50, current: 1500, target: 1500, color: '#E0C05C' },
          { name: 'Lazer', percent: 50, current: 500, target: 1500, color: '#EBD283' }
        ]
      },
      {
        name: 'Investimentos', percent: 20, current: 2000, target: 2000, color: '#1A3E4E', children: [
          { name: 'Envio Corretora', percent: 100, current: 2000, target: 2000, color: '#2D596B' }
        ]
      }
    ]
  },
  Investimentos: {
    name: 'Investimentos', total: 150000, type: 'investment',
    children: [
      {
        name: 'Renda Fixa', percent: 40, current: 60000, target: 60000, color: '#A8A39D', children: [
          { name: 'Tesouro Direto', percent: 50, current: 30000, target: 30000, color: '#8F8A84', invested: 25000 },
          { name: 'CDBs', percent: 50, current: 30000, target: 30000, color: '#C0BDB8', invested: 27500 }
        ]
      },
      {
        name: 'Renda Variável', percent: 60, current: 90000, target: 90000, color: '#243E36', children: [
          {
            name: 'Ações B3', percent: 70, current: 75000, target: 63000, color: '#365C50', children: [
              { name: 'PETR4', percent: 60, current: 45000, target: 37800, color: '#1A3E4E', isB3: true, ticker: 'PETR4', dataSource: 'api', quantity: 1000, price: 45.00 },
              { name: 'VALE3', percent: 40, current: 30000, target: 25200, color: '#D4AF37', isB3: true, ticker: 'VALE3', dataSource: 'most_recent', quantity: 500, price: 60.00 }
            ]
          },
          { name: 'FIIs', percent: 30, current: 15000, target: 27000, color: '#7CA982' }
        ]
      }
    ]
  }
};

export default Transactions
