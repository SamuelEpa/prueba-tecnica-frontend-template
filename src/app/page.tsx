import { initialData } from "../lib/mockData";
import DashboardClient from "../components/DashboardClient";

const HomePage = () => {
  const totalItems = initialData.length;
  const totalValue = initialData.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
            Dashboard de Ventas
          </h1>

          <DashboardClient
            initialItems={initialData}
            initialStats={{ totalItems, totalValue }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;