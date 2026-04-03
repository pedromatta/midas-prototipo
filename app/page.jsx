"use client"
import React, { useState, useEffect, useRef } from 'react';
import { initialData, initialTransactions } from './data/mockData'
import { getThemeTokens } from './utils/theme'
import Sidebar from './layout/Sidebar'
// import BottomNav from './layout/BottomNav'
import MobileMenu from './layout/MobileMenu'
import MobileHeader from './layout/MobileHeader'
import Dashboard from './dashboard/Dashboard'
import Transactions from './transactions/Transactions'
import DrillDownView from './budget/DrillDownView'
import SettingsView from './settings/SettingsView'
import TransactionModal from './modals/TransactionModal'
import SubcategoryModal from './modals/SubcategoryModal'
import Chart from 'chart.js/auto';
import {
  LayoutDashboard, ListOrdered, Wallet, LineChart,
  Settings, Menu, Plus, CheckCircle, Building,
  Search, ChevronLeft, ChevronRight, ArrowUpCircle,
  ArrowDownCircle, MoreVertical, Calendar, Check,
  FolderOpen, RefreshCw, TerminalSquare, X, Trash2, Edit2, Database,
  Sun, Moon, TrendingUp
} from 'lucide-react';

// ==========================================
// 7. MAIN APP COMPONENT (ORQUESTRADOR)
// ==========================================
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [drillDownPath, setDrillDownPath] = useState(['Gastos']);

  // States Locais da Aplicação
  const [appData, setAppData] = useState(initialData);
  const [transactions] = useState(initialTransactions);

  // States Modais
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [subModalMode, setSubModalMode] = useState('add');
  const [editingSub, setEditingSub] = useState(null);

  const t = getThemeTokens(isDark);

  const navigateToTab = (tabId, rootNode = null) => {
    setActiveTab(tabId);
    if (rootNode) setDrillDownPath([rootNode]);
    setIsMobileMenuOpen(false);
  };

  const openTxModal = (tx = null) => { setEditingTx(tx); setIsTxModalOpen(true); };
  const openSubModal = (mode, subName = null) => { setSubModalMode(mode); setEditingSub(subName); setIsSubModalOpen(true); };

  // Handlers Repassados para os Filhos
  const handlePercentChange = (childName, newPercent) => {
    setAppData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData[drillDownPath[0]];
      for (let i = 1; i < drillDownPath.length; i++) current = current.children.find(c => c.name === drillDownPath[i]);
      const childToUpdate = current.children.find(c => c.name === childName);
      if (childToUpdate) {
        childToUpdate.percent = newPercent;
        childToUpdate.target = (newPercent / 100) * (current.target || current.total || 0);
      }
      return newData;
    });
  };

  const handleDeleteSubcategory = (childName) => {
    setAppData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData[drillDownPath[0]];
      for (let i = 1; i < drillDownPath.length; i++) current = current.children.find(c => c.name === drillDownPath[i]);
      current.children = current.children.filter(c => c.name !== childName);
      return newData;
    });
    setIsSubModalOpen(false);
  };

  const handleUpdateB3Settings = (settings) => {
    setAppData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData[drillDownPath[0]];
      for (let i = 1; i < drillDownPath.length; i++) current = current.children.find(c => c.name === drillDownPath[i]);
      Object.assign(current, { isB3: settings.isB3, ticker: settings.ticker, dataSource: settings.dataSource });
      return newData;
    });
  };

  const handleUpdateAssetValues = (quantity, price) => {
    setAppData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData[drillDownPath[0]];
      for (let i = 1; i < drillDownPath.length; i++) current = current.children.find(c => c.name === drillDownPath[i]);
      Object.assign(current, { quantity, price, current: quantity * price });
      return newData;
    });
  };

  const handleUpdateFixedIncome = (field, value) => {
    setAppData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData[drillDownPath[0]];
      for (let i = 1; i < drillDownPath.length; i++) current = current.children.find(c => c.name === drillDownPath[i]);
      current[field] = value;
      return newData;
    });
  };

  return (
    <div className={`min-h-screen ${t.bgMain} flex flex-col md:flex-row font-sans transition-colors duration-300`}>

      <Sidebar t={t} activeTab={activeTab} navigateToTab={navigateToTab} setIsDark={setIsDark} />
      <MobileHeader t={t} setIsDark={setIsDark} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      {isMobileMenuOpen && <MobileMenu t={t} activeTab={activeTab} navigateToTab={navigateToTab} />}

      <main className="flex-1 md:ml-64 relative transition-colors duration-300">
        {activeTab === 'dashboard' && <Dashboard t={t} openTxModal={openTxModal} />}
        {activeTab === 'transactions' && <Transactions t={t} transactions={transactions} openTxModal={openTxModal} />}
        {['gastos', 'rendimentos', 'investimentos'].includes(activeTab) && (
          <DrillDownView
            t={t} appData={appData} drillDownPath={drillDownPath} setDrillDownPath={setDrillDownPath}
            handlePercentChange={handlePercentChange} handleUpdateB3Settings={handleUpdateB3Settings}
            handleUpdateFixedIncome={handleUpdateFixedIncome} handleUpdateAssetValues={handleUpdateAssetValues}
            openSubModal={openSubModal}
          />
        )}
        {activeTab === 'settings' && <SettingsView t={t} />}
      </main>

      {/* <BottomNav t={t} activeTab={activeTab} navigateToTab={navigateToTab} /> */}

      {/* Overlays / Modals */}
      <TransactionModal t={t} isOpen={isTxModalOpen} onClose={() => setIsTxModalOpen(false)} editingTx={editingTx} />
      <SubcategoryModal t={t} isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} mode={subModalMode} editingSub={editingSub} appData={appData} drillDownPath={drillDownPath} onDelete={handleDeleteSubcategory} />

    </div>
  );
}

