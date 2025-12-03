"use client";
import { Product, Stats } from "@/types";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  initialItems: Product[];
  initialPage: number;
  pageSize: number;
  initialStats: Stats;
};

const DashboardClient = ({
  initialItems,
  initialPage,
  pageSize,
  initialStats,
}: Props) => {
  const [items, setItems] = useState<Product[]>(initialItems);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Stats>(initialStats);


  const locale = "es-ES";
  const formatter = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  useEffect(() => {
    const t = setTimeout(() => {
      fetchPage();
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort, page]);


  const fetchPage = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        filter,
        sort,
        page: String(page),
        pageSize: String(pageSize),
      });

      const res = await fetch(`/api/products?${q.toString()}`);
      if (!res.ok) throw new Error("Error fetching products");
      const body = await res.json();
      setItems(body.items);
      setStats({ totalItems: body.totalItems, totalValue: body.totalValue });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(stats.totalItems / pageSize));

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setFilter(e.target.value);
  };

  const toggleSort = () => {
    setSort(s => (s === "asc" ? "desc" : "asc"));
    setPage(1);
  };


  return (
    <>
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
          onClick={toggleSort}
          className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
        >
          Ordenar por Precio ({sort === "asc" ? "↑" : "↓"})
        </button>
      </div>

      <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-emerald-200 dark:border-gray-600 p-6 mb-8 shadow-sm">
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
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ${formatter.format(stats.totalValue ?? 0)}
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="min-h-40 flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Cargando ...</p>
          </div>
        </div>
      )}

      {
        !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
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
                      ${formatter.format(item.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Página {page} de {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1 || loading}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border shadow-sm disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            disabled={page >= totalPages || loading}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border shadow-sm disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardClient