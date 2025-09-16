#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');

function createNewSpec(version) {
    if (!version) {
        console.error('❌ Error: Se requiere especificar una versión');
        console.log('Uso: npm run spec:new v1.1');
        process.exit(1);
    }

    const specsDir = path.join(process.cwd(), 'specs');
    const versionDir = path.join(specsDir, version);

    // Verificar si la versión ya existe
    if (fs.existsSync(versionDir)) {
        console.error(`❌ Error: La versión ${version} ya existe`);
        process.exit(1);
    }

    // Crear directorio de la versión
    fs.mkdirSync(versionDir, { recursive: true });

    // Crear especificación base
    const specContent = `# Especificación ${version} - .NET Templates

## Resumen

Descripción de los cambios en esta versión.

## Objetivos

- [ ] Objetivo 1
- [ ] Objetivo 2

## Cambios Técnicos

### Nuevas Características
- ...

### Mejoras
- ...

### Correcciones
- ...

## Impacto

### Breaking Changes
- Ninguno / Describir cambios incompatibles

### Migration Guide
- Pasos de migración si son necesarios

## Testing

### Criterios de Aceptación
- [ ] Criterio 1
- [ ] Criterio 2

### Tests Requeridos
- [ ] Test 1
- [ ] Test 2

## Documentación

### Archivos a Actualizar
- [ ] README.md
- [ ] docs/templates-guide.md
- [ ] slides.md

## Timeline

- **Inicio**: YYYY-MM-DD
- **Beta**: YYYY-MM-DD  
- **Release**: YYYY-MM-DD
`;

    const specFile = path.join(versionDir, 'specification.md');
    fs.writeFileSync(specFile, specContent);

    console.log(`✅ Nueva especificación creada: specs/${version}/`);
    console.log(`📝 Edita el archivo: specs/${version}/specification.md`);
}

// Obtener versión de argumentos de línea de comandos
const version = process.argv[2];
createNewSpec(version);