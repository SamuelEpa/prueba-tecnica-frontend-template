// TODO: El candidato debe refactorizar este archivo.
// Es un Server Component por defecto en Next.js (app dir), pero está escrito como si fuera React viejo.
// Contiene: Bad Performance, Any types, Fetching waterfall, Logic coupling.

"use client";

import React, { useState, useEffect } from 'react';
import { generateMockData, initialData } from '../lib/mockData';

const expensiveCalculation = (data: any[]) => {
  console.log("Calculando estadísticas pesadas...");
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < 10000; j++) {
      sum += Math.random();
    }
  }
  return data.map(item => ({ ...item, complexScore: sum }));
};

const LegacyDashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [stats, setStats] = useState<any>({});

  // Fetching de datos simulado
  useEffect(() => {
    setData(initialData);
    setFilteredData(initialData);
    setLoading(false);
  }, []);

  useEffect(() => {
    const lowerFilter = filter.toLowerCase();

    // Algoritmo ineficiente de filtrado
    let result = data.filter((item: any) => {
      return item.name.toLowerCase().includes(lowerFilter) ||
        item.description.toLowerCase().includes(lowerFilter) ||
        item.category.toLowerCase().includes(lowerFilter);
    });

    if (sort === 'asc') {
      result = result.sort((a, b) => a.price - b.price);
    } else {
      result = result.sort((a, b) => b.price - a.price);
    }

    const processed = expensiveCalculation(result);

    setFilteredData(processed);

    const totalValue = result.reduce((acc, curr) => acc + curr.price, 0);
    setStats({ totalItems: result.length, totalValue });

  }, [filter, sort, data]);

  const handleFilterChange = (e: any) => {
    setFilter(e.target.value);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Cargando...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard de Ventas (Lento)
          </h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={filter}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm transition-all duration-200"
              />
            </div>

            <button 
              onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
            >
              Ordenar por Precio ({sort === 'asc' ? '↑' : '↓'})
            </button>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-emerald-200 dark:border-gray-600 p-6 mb-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
              Estadísticas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Items</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalItems}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">Valor Total</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${stats.totalValue?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item: any, index: number) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{item.name}</h3>
                  {item.price > 100 && (
                    <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium px-2 py-1 rounded-full animate-pulse">
                      ¡Caro!
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Categoría:</span>
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Precio:</span>
                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegacyDashboard;