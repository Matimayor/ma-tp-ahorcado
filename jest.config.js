// jest.config.js

module.exports = {
  coverageDirectory: 'coverage', // Directorio donde se guardará el informe de cobertura
  collectCoverage: true, // Activar la recolección de cobertura
  coverageReporters: [
    'text-summary', // Mostrar resumen de cobertura como texto
  ],
};
