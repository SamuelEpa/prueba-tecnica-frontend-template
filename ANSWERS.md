# Análisis Técnico - Respuestas

## Pregunta A: Sincronización de Estado entre Pestañas

El equipo de producto requiere una nueva funcionalidad: si un usuario tiene el dashboard abierto en dos pestañas del navegador y actualiza un filtro en una, la otra pestaña debe reflejar este cambio automáticamente sin recargar la página.

### ¿Qué enfoque técnico propondrías para implementar esto?

<!-- Tu respuesta aquí -->

### ¿Qué implicaciones tiene tu solución a nivel de cliente y servidor?

<!-- Tu respuesta aquí -->

### Compara brevemente dos estrategias posibles y justifica tu elección final (Costo vs. Beneficio).

<!-- Tu respuesta aquí -->

---

## Pregunta B: Comportamiento del Ciclo de Vida

Durante las pruebas en el entorno de desarrollo, se observó que el `useEffect` encargado de la carga inicial de datos se ejecuta dos veces consecutivas. Se ha sugerido utilizar un `useRef` para bloquear la segunda ejecución y evitar "peticiones duplicadas".

### ¿Implementarías esta solución en el código? Justifica tu respuesta técnica.

<!-- Tu respuesta aquí -->

### ¿Qué nos indica este comportamiento sobre el entorno de ejecución de React moderno?

<!-- Tu respuesta aquí -->