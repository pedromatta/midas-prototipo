import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {
  LayoutDashboard, ListOrdered, Wallet, LineChart,
  Settings, Menu, Plus, CheckCircle, Building,
  Search, ChevronLeft, ChevronRight, ArrowUpCircle,
  ArrowDownCircle, MoreVertical, Calendar, Check,
  FolderOpen, RefreshCw, TerminalSquare, X, Trash2, Edit2, Database,
  Sun, Moon, TrendingUp,
  BanknoteArrowUp,
  BanknoteArrowDown
} from 'lucide-react';

// ==========================================
// 1. DADOS SIMULADOS (MOCK DATA)
// ==========================================
export const initialData = {
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
        name: 'Aportes', percent: 20, current: 2000, target: 2000, color: '#1A3E4E', children: [
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

export const initialTransactions = [
  { id: 1, desc: 'Salário Mensal', path: 'Rendimentos > Salário > Fixo', date: '05 Mar 2026', value: 6300.00, type: 'in' },
  { id: 2, desc: 'Aluguel Apto', path: 'Gastos > Gastos Fixos > Aluguel', date: '06 Mar 2026', value: -3000.00, type: 'out' },
  { id: 3, desc: 'Supermercado Extra', path: 'Gastos > Variáveis > Mercado', date: '10 Mar 2026', value: -850.20, type: 'out' },
  { id: 4, desc: 'Aporte Mensal', path: 'Gastos > Investimentos', date: '12 Mar 2026', value: -2000.00, type: 'out' },
  { id: 5, desc: 'Freelance Design', path: 'Rendimentos > Freelance > Cliente A', date: '15 Mar 2026', value: 1500.00, type: 'in' },
];

export const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'transactions', icon: ListOrdered, label: 'Transações' },
  { id: 'investimentos', icon: Wallet, label: 'Investimentos', rootNode: 'Investimentos' },
  { id: 'gastos', icon: BanknoteArrowDown, label: 'Gastos', rootNode: 'Gastos' },
  { id: 'rendimentos', icon: BanknoteArrowUp, label: 'Rendimentos', rootNode: 'Rendimentos' },
  { id: 'settings', icon: Settings, label: 'Configurações' },
];

// export const auxNavItems = [
// ];
