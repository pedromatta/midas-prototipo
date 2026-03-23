
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const DoughnutChart = ({ data, centerText, subText, onSliceClick, t }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const totalPercent = data.reduce((acc, item) => acc + item.percent, 0);
  const isError = totalPercent !== 100;

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');
    const labels = data.map(item => item.name);
    const dataValues = data.map(item => item.percent);
    const backgroundColors = data.map(item => item.color);

    if (totalPercent < 100) {
      labels.push('Não Alocado');
      dataValues.push(100 - totalPercent);
      backgroundColors.push(t.isDark ? '#0B1B24' : '#E5E7EB');
    }

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data: dataValues, backgroundColor: backgroundColors, borderWidth: 0, hoverOffset: 4 }] },
      options: {
        cutout: '80%', responsive: true, maintainAspectRatio: false, animation: { duration: 500 },
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.raw}%` } } },
        onClick: (event, elements) => {
          if (elements.length > 0 && onSliceClick) {
            const index = elements[0].index;
            if (index < data.length) onSliceClick(data[index].name);
          }
        },
        onHover: (event, elements) => {
          event.native.target.style.cursor = (elements.length > 0 && elements[0].index < data.length) ? 'pointer' : 'default';
        }
      }
    });

    return () => chartInstance.current?.destroy();
  }, [data, onSliceClick, totalPercent, t.isDark]);

  return (
    <div className="relative w-64 h-64 mx-auto my-8 group">
      <canvas ref={chartRef} className={`w-full h-full transition-all ${isError && totalPercent > 100 ? 'rounded-full ring-4 ring-[#CD5C5C] ring-offset-2 ring-offset-transparent' : ''}`}></canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className={`text-xl font-bold ${isError ? t.danger : t.textMain}`}>
          {isError ? `Erro: ${totalPercent}%` : centerText}
        </span>
        {subText && <span className={`text-sm ${t.textSec} mt-1`}>{subText}</span>}
      </div>
    </div>
  );
};

export default DoughnutChart
