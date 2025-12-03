
const Loading = () => {
  
  return (
    <div className="min-h-40 flex items-center justify-center mb-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600 dark:text-gray-300">Cargando ...</p>
      </div>
    </div>
  )
}

export default Loading