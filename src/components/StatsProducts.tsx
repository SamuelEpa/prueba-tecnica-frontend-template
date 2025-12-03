import { Stats } from "@/types";

const formatter = new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" });

const StatsProducts = ({ stats }: { stats: Stats }) => (
  <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-emerald-200 dark:border-gray-600 p-6 mb-8 shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
      <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"/>
      Estadísticas
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total de Items
        </p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {stats.totalItems}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Valor Total
        </p>
        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          {formatter.format(stats.totalValue ?? 0)}
        </p>
      </div>
    </div>
  </div>
);

export default StatsProducts;