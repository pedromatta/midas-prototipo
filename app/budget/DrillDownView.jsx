import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FormatBRL } from '../utils/formatters'
import DoughnutChart from './DoughnoutChart'
import {
  Wallet, LineChart, Plus, ChevronLeft, Check, Edit2, Database, TrendingUp
} from 'lucide-react';

export const DrillDownView = ({ t, appData, drillDownPath, setDrillDownPath, handlePercentChange, handleUpdateB3Settings, handleUpdateFixedIncome, handleUpdateAssetValues, openSubModal }) => {
  let currentNode = appData[drillDownPath[0]];
  for (let i = 1; i < drillDownPath.length; i++) {
    currentNode = currentNode?.children?.find(c => c.name === drillDownPath[i]);
  }
  if (!currentNode) return <div>Erro de navegação</div>;

  const isInvestment = currentNode.type === 'investment' || drillDownPath[0] === 'Investimentos';
  const isFixedIncome = drillDownPath.includes('Renda Fixa');
  const children = currentNode.children || [];
  const isLeafNode = children.length === 0;
  const totalPercent = children.reduce((acc, child) => acc + child.percent, 0);
  const isError = !isLeafNode && children.length > 0 && totalPercent !== 100;

  const handleChildClick = (childName) => setDrillDownPath([...drillDownPath, childName]);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24">
      {/* Breadcrumbs */}
      <div className={`flex items-center space-x-2 ${t.textSec} mb-6 text-sm overflow-x-auto whitespace-nowrap pb-2`}>
        {drillDownPath.length > 1 && (
          <button onClick={() => setDrillDownPath(drillDownPath.slice(0, drillDownPath.length - 1))} className={`hover:text-[#D4AF37] mr-2`}><ChevronLeft size={20} /></button>
        )}
        {drillDownPath.map((step, index) => (
          <React.Fragment key={step}>
            <button onClick={() => setDrillDownPath(drillDownPath.slice(0, index + 1))} className={`hover:text-[#D4AF37] transition-colors ${index === drillDownPath.length - 1 ? `font-bold ${t.textMain}` : ''}`}>{step}</button>
            {index < drillDownPath.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Header Contexto */}
      <div className={`${t.bgCard} rounded-xl border ${t.border} p-4 mb-8 text-center shadow-sm relative overflow-hidden transition-colors`}>
        {isLeafNode && <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: currentNode.color || '#A8A39D' }}></div>}
        <p className={`text-sm ${t.textSec} uppercase tracking-wide font-semibold mb-1`}>
          {currentNode.name}
        </p>
        <p className={`text-3xl font-bold ${t.textMain}`}>{FormatBRL(currentNode.target || currentNode.total || currentNode.current)}</p>
      </div>

      {/* Visão de Categoria Final (Leaf) */}
      {isLeafNode && (
        <div className={`${t.bgCard} rounded-xl border ${t.border} p-6 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-2 transition-colors`}>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#FDFDFA] mr-4 shadow-sm" style={{ backgroundColor: currentNode.color || '#A8A39D' }}>
              {isInvestment ? <LineChart size={20} /> : <Wallet size={20} />}
            </div>
            <div>
              <h3 className={`text-xl font-bold ${t.textMain}`}>{currentNode.name}</h3>
              <p className={`text-sm ${t.textSec}`}>Configurações da categoria final</p>
            </div>
          </div>
          {isInvestment ? (
            <div className={`space-y-6 bg-[#A8A39D]/5 p-5 rounded-xl border ${t.border}`}>
              {isFixedIncome ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
                    <div>
                      <label className={`block text-sm font-semibold ${t.textMain} mb-2`}>Valor Aplicado (Principal)</label>
                      <div className="relative">
                        <span className={`absolute left-4 top-3.5 ${t.textSec} font-medium`}>R$</span>
                        <input type="number" value={currentNode.invested !== undefined ? currentNode.invested : ''} onChange={(e) => handleUpdateFixedIncome('invested', Number(e.target.value))} className={`w-full ${t.bgInput} border ${t.border} rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${t.textMain}`} />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold ${t.textMain} mb-2`}>Patrimônio Atual</label>
                      <div className="relative">
                        <span className={`absolute left-4 top-3.5 ${t.textSec} font-medium`}>R$</span>
                        <input type="number" value={currentNode.current !== undefined ? currentNode.current : ''} onChange={(e) => handleUpdateFixedIncome('current', Number(e.target.value))} disabled={currentNode.dataSource === 'api'} className={`w-full ${currentNode.dataSource === 'api' ? 'bg-[#A8A39D]/10 cursor-not-allowed text-[#A8A39D]' : `${t.bgInput} ${t.textMain}`} border ${t.border} rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`} />
                      </div>
                    </div>
                  </div>
                  {currentNode.invested > 0 && currentNode.current !== undefined && (
                    <div className={`p-4 rounded-xl border ${t.border} ${t.isDark ? 'bg-[#0B1B24]' : 'bg-white'} flex justify-between items-center shadow-sm`}>
                      <div className="flex items-center space-x-2"><TrendingUp size={18} className={t.textSec} /><span className={`font-semibold ${t.textMain}`}>Rentabilidade Acumulada</span></div>
                      <span className={`font-bold text-lg ${currentNode.current >= currentNode.invested ? t.success : t.danger}`}>{((currentNode.current / currentNode.invested - 1) * 100).toFixed(2)}%</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
                  <div>
                    <label className={`block text-sm font-semibold ${t.textMain} mb-2`}>Quantidade Possuída</label>
                    <input type="number" value={currentNode.quantity !== undefined ? currentNode.quantity : ''} onChange={(e) => handleUpdateAssetValues(Number(e.target.value), currentNode.price || 0)} className={`w-full ${t.bgInput} border ${t.border} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${t.textMain}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold ${t.textMain} mb-2`}>Cotação (Preço Unitário)</label>
                    <div className="relative">
                      <span className={`absolute left-4 top-3.5 ${t.textSec} font-medium`}>R$</span>
                      <input type="number" value={currentNode.price !== undefined ? currentNode.price : ''} onChange={(e) => handleUpdateAssetValues(currentNode.quantity || 0, Number(e.target.value))} disabled={currentNode.dataSource === 'api'} className={`w-full ${currentNode.dataSource === 'api' ? 'bg-[#A8A39D]/10 cursor-not-allowed text-[#A8A39D]' : `${t.bgInput} ${t.textMain}`} border ${t.border} rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`} />
                    </div>
                  </div>
                </div>
              )}
              <div className={`border-t ${t.border} my-4`}></div>
              <div className="flex items-center space-x-3">
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" id="toggleB3" checked={currentNode.isB3 || false} onChange={(e) => handleUpdateB3Settings({ ...currentNode, isB3: e.target.checked })} className={`toggle-checkbox absolute block w-6 h-6 rounded-full ${t.bgCard} border-4 appearance-none cursor-pointer`} style={{ right: currentNode.isB3 ? '0' : 'auto', borderColor: currentNode.isB3 ? '#2E8B57' : '#A8A39D' }} />
                  <label htmlFor="toggleB3" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${currentNode.isB3 ? 'bg-[#2E8B57]/50' : 'bg-[#A8A39D]/30'}`}></label>
                </div>
                <label htmlFor="toggleB3" className={`font-bold ${t.textMain}`}>{isFixedIncome ? 'Ativo negociável via B3' : 'Ativo negociado na B3'}</label>
              </div>
              {currentNode.isB3 && (
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t ${t.border}`}>
                  <div>
                    <label className={`block text-sm font-semibold ${t.textMain} mb-2`}>Ticker (Código B3)</label>
                    <input type="text" value={currentNode.ticker || ''} onChange={(e) => handleUpdateB3Settings({ ...currentNode, ticker: e.target.value.toUpperCase() })} className={`w-full ${t.bgInput} border ${t.border} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-mono ${t.textMain}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold ${t.textMain} mb-2`}>Fonte de Dados</label>
                    <div className="relative">
                      <Database className={`absolute left-3 top-3.5 ${t.textSec}`} size={18} />
                      <select value={currentNode.dataSource || 'manual'} onChange={(e) => handleUpdateB3Settings({ ...currentNode, dataSource: e.target.value })} className={`w-full ${t.bgInput} border ${t.border} rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] appearance-none ${t.textMain}`}>
                        <option value="manual">Entrada Manual</option><option value="api">Sincronização API</option><option value="most_recent">Mais atual</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`bg-[#A8A39D]/5 p-5 rounded-xl border ${t.border}`}>
              <p className={`${t.textMain} mb-2`}>Esta é uma categoria final para registo direto de transações.</p>
              <div className={`flex justify-between items-center ${t.bgCard} p-3 rounded-lg border ${t.border}`}>
                <span className={`font-medium ${t.textSec}`}>Total acumulado:</span><span className={`font-bold text-lg ${t.textMain}`}>{FormatBRL(currentNode.current || 0)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Categorias (Gráfico + Sliders) */}
      {!isLeafNode && (
        <>
          <DoughnutChart data={children} centerText={isInvestment ? "Meta: 100%" : "100% Alocado"} total={currentNode.target || currentNode.total} onSliceClick={handleChildClick} t={t} />
          <div className="space-y-4">
            {children.map((child, idx) => {
              const parentTotal = isInvestment ? (currentNode.current || currentNode.total || 1) : (currentNode.target || currentNode.total || 1);
              const realValuePercentOfParent = (child.current / parentTotal) * 100;
              let actionBadge = null;
              if (isInvestment) {
                const diffPercent = child.percent - realValuePercentOfParent;
                const diffValue = ((diffPercent / 100) * parentTotal) || 0;
                if (Math.abs(diffPercent) < 1) actionBadge = <span className={`bg-[#A8A39D]/20 ${t.textMain} px-3 py-1 rounded-full text-xs font-bold`}>Balanceado</span>;
                else if (diffPercent > 0) actionBadge = <span className="bg-[#2E8B57]/10 text-[#2E8B57] px-3 py-1 rounded-full text-xs font-bold">Aportar {FormatBRL(Math.abs(diffValue))}</span>;
                else actionBadge = <span className="bg-[#CD5C5C]/10 text-[#CD5C5C] px-3 py-1 rounded-full text-xs font-bold">Vender {FormatBRL(Math.abs(diffValue))}</span>;
              }

              return (
                <div key={idx} className={`${t.bgCard} rounded-xl border ${t.border} p-4 shadow-sm hover:shadow-md transition-all group`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3 cursor-pointer flex-1" onClick={() => handleChildClick(child.name)}>
                      <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: child.color }}></div>
                      <span className={`font-bold ${t.textMain} text-lg hover:underline`}>{child.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-1 ${t.bgInput} border ${t.border} rounded-lg px-2 py-1`}>
                        <input type="number" value={child.percent} onChange={(e) => handlePercentChange(child.name, Number(e.target.value))} className={`w-10 bg-transparent text-right font-semibold ${t.textMain} focus:outline-none`} min="0" max="100" />
                        <span className={`${t.textSec} font-medium`}>%</span>
                      </div>
                      <button onClick={() => openSubModal('edit', child.name)} className={`${t.textSec} hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 p-1.5 rounded-md transition-colors`}><Edit2 size={18} /></button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-3">
                      <span className={`${t.textSec}`}>{isInvestment ? 'Atual: ' : 'Realizado: '} <strong className={`${t.textMain}`}>{FormatBRL(child.current)}</strong></span>
                      {isInvestment ? actionBadge : <span className={`${t.textSec}`}>Meta: <strong className={`${t.textMain}`}>{FormatBRL(child.target)}</strong></span>}
                    </div>
                    <div className="relative w-full h-3 bg-[#A8A39D]/20 rounded-full flex items-center mb-1">
                      <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(realValuePercentOfParent, 100)}%`, backgroundColor: (realValuePercentOfParent > child.percent && !isInvestment) ? '#CD5C5C' : child.color }}></div>
                      <div className={`absolute w-1 h-5 ${t.isDark ? 'bg-[#D4AF37]' : 'bg-[#1A3E4E]'} rounded-full shadow-md pointer-events-none transform -translate-x-1/2 z-0 transition-all duration-200`} style={{ left: `${child.percent}%` }}></div>
                      <div className={`absolute w-4 h-4 ${t.bgCard} border-2 ${t.isDark ? 'border-[#D4AF37]' : 'border-[#1A3E4E]'} rounded-full shadow-sm pointer-events-none transform -translate-x-1/2 z-0 transition-all duration-200`} style={{ left: `${child.percent}%` }}></div>
                      <input type="range" min="0" max="100" value={child.percent} onChange={(e) => handlePercentChange(child.name, Number(e.target.value))} className="absolute w-full h-full opacity-0 cursor-pointer z-10" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button onClick={() => openSubModal('add')} className={`flex-1 py-4 border-2 border-dashed ${t.border} rounded-xl ${t.textMain} font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors flex items-center justify-center ${t.isDark ? 'bg-transparent' : 'bg-white'}`}>
          <Plus className="mr-2" size={20} /> Adicionar Subcategoria {isLeafNode && '(Criar Subdivisão)'}
        </button>
        {!isLeafNode && children.length > 0 && (
          <button disabled={isError} className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center transition-colors ${isError ? `bg-[#A8A39D]/20 ${t.textSec} cursor-not-allowed border ${t.border}` : 'bg-[#D4AF37] text-[#1A3E4E] hover:brightness-95 shadow-md'}`}>
            <Check className="mr-2" size={20} /> Salvar Alterações
          </button>
        )}
      </div>
    </div>
  );
};

export default DrillDownView

