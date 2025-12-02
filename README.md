# Desafío Técnico: Refactorización de Dashboard de Ventas

## Contexto del Proyecto

Bienvenido al equipo de **Accident Action Network**. Hemos heredado un módulo crítico: el dashboard de "ventas en tiempo real". Este componente fue desarrollado inicialmente como un prototipo rápido (MVP), pero ahora enfrenta problemas serios de deuda técnica.

El código actual es funcional, pero presenta dificultades de mantenimiento, problemas de rendimiento perceptibles y una arquitectura que limita la escalabilidad futura.

**Tu objetivo:** Realizar una refactorización integral para transformar este módulo en una pieza de software mantenible, escalable y de alto rendimiento, preservando la lógica de negocio existente.

## Lineamientos de Desarrollo

Para asegurar la calidad del entregable y facilitar la revisión de código por parte del equipo, debes adherirte a los siguientes estándares:

- **Criterio Técnico y Justificación:** Más allá de que el código funcione, evaluaremos la calidad de tus decisiones arquitectónicas. Buscamos soluciones robustas y bien fundamentadas.

- **Historia de Git (Commits):** El historial de versiones es parte de la entrega. Debes realizar commits atómicos y semánticos que narren la evolución de tu refactorización (ej: `refactor: desacoplar lógica de filtrado`, `fix: optimizar renderizado de lista`). Evita un único commit masivo ("mega-commit").

- **Tiempo Estimado:** Tienes un plazo máximo de **72 horas** para enviar tu solución. El ejercicio está dimensionado para ser completado en aproximadamente **3-4 horas** de trabajo enfocado.

## Tareas a Realizar

### 1. Refactorización e Ingeniería (Código)

El archivo `src/app/page.tsx` requiere una intervención mayor:

- **Modularización:** Descompón el componente monolítico en sub-componentes reutilizables y con responsabilidad única.

- **Gestión de Estado:** Optimiza el manejo del estado y el flujo de datos. Evalúa si la estructura actual es la más eficiente.

- **Seguridad de Tipos:** El proyecto utiliza TypeScript, pero el código actual abusa del tipo `any`. Implementa interfaces y tipos estrictos para garantizar la robustez.

- **Optimización de Rendimiento:** Se han reportado bloqueos en la interfaz al filtrar grandes volúmenes de datos. Diagnostica y soluciona los problemas de performance en el filtrado y ordenamiento.

- **Arquitectura Next.js:** Aprovecha las capacidades del framework. Mueve la lógica que corresponda al servidor (Server Components) y mantén en el cliente solo lo estrictamente necesario.

### 2. Análisis Técnico (Responde en un archivo ANSWERS.md)

#### Pregunta A: Sincronización de Estado entre Pestañas

El equipo de producto requiere una nueva funcionalidad: si un usuario tiene el dashboard abierto en dos pestañas del navegador y actualiza un filtro en una, la otra pestaña debe reflejar este cambio automáticamente sin recargar la página.

- ¿Qué enfoque técnico propondrías para implementar esto?
- ¿Qué implicaciones tiene tu solución a nivel de cliente y servidor?
- Compara brevemente dos estrategias posibles y justifica tu elección final (Costo vs. Beneficio).

#### Pregunta B: Comportamiento del Ciclo de Vida

Durante las pruebas en el entorno de desarrollo, se observó que el `useEffect` encargado de la carga inicial de datos se ejecuta dos veces consecutivas. Se ha sugerido utilizar un `useRef` para bloquear la segunda ejecución y evitar "peticiones duplicadas".

- ¿Implementarías esta solución en el código? Justifica tu respuesta técnica.
- ¿Qué nos indica este comportamiento sobre el entorno de ejecución de React moderno?

## Proceso de Entrega

1. Realiza un **Fork** de este repositorio.
2. Implementa tus mejoras y respuestas.
3. Genera un **Pull Request (PR)** hacia el repositorio original.
4. En la descripción del PR, incluye un breve resumen de las decisiones técnicas más complejas que tomaste durante el ejercicio.

## Tecnologías del Proyecto

- **Framework:** Next.js 15
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Linting:** ESLint

## Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar linter
npm run lint
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000).

---

*Este desafío está diseñado para evaluar tus habilidades técnicas en refactorización, arquitectura de software y toma de decisiones en un contexto real de desarrollo.*
