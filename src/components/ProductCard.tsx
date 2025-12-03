import { Product } from "@/types";

const formatter = new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" });

const ProductCard = ({ item }: { item: Product }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
        {item.name}
      </h3>

      {item.price > 100 && (
        <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium px-2 py-1 rounded-full animate-pulse">
          ¡Caro!
        </span>
      )}

    </div>
    <div className="space-y-2">
      <div className="flex items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
          Categoría:
        </span>
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded">
          {item.category}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Precio:
        </span>
        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
          {formatter.format(item.price)}
        </span>
      </div>
    </div>
  </div>
);

export default ProductCard;