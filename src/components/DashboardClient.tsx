"use client";
import { Product, Stats } from "@/types";
import { useEffect, useState } from "react";
import StatsProducts from "./StatsProducts";
import ProductCard  from "./ProductCard";

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

  const handleFilterChange = (val: string) => {
    setPage(1);
    setFilter(val);
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
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white transition-all"
          />
        </div>
        <button
          onClick={toggleSort}
          className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-all font-medium"
        >
          Ordenar por Precio ({sort === "asc" ? "↑" : "↓"})
        </button>
      </div>

      <StatsProducts stats={stats} />

      {loading && (
        <div className="min-h-40 flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Cargando ...</p>
          </div>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}

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