# Especificación v1.0 - .NET Templates para Organizaciones

## Resumen

Primera versión del sistema de templates organizacionales que incluye:

- Presentación completa sobre .NET Templates
- Sistema de documentación con Slidev
- Templates base para organizaciones
- Framework de evolución tipo Spec Kit

## Componentes

### 1. Presentación (Slidev)

**Archivo**: `slides.md`
**Propósito**: Charla completa sobre .NET Templates
**Contenido**:
- Introducción a templates
- Creación de templates personalizados  
- Distribución organizacional
- Mejores prácticas
- Demo práctica

**Tecnologías**:
- Slidev para presentaciones
- Markdown para contenido
- Vue.js para interactividad

### 2. Documentación

**Archivos**:
- `docs/templates-guide.md` - Guía completa de templates
- `docs/best-practices.md` - Mejores prácticas
- `docs/distribution.md` - Distribución organizacional
- `docs/advanced-examples.md` - Ejemplos avanzados

**Propósito**: Documentación detallada para referencia

### 3. Templates Base

**Estructura**: `templates/MiOrg.WebApi.Template/`
**Características**:
- Template de Web API organizacional
- Parámetros configurables:
  - Framework (.NET 6.0/8.0)
  - Swagger (opcional)
  - Entity Framework (opcional)
  - Base de datos (SQL Server/PostgreSQL/InMemory)
  - Autenticación JWT (opcional)
  - Docker (opcional)
  - Tests (opcional)

### 4. Sistema de Evolución

**Estructura**: `specs/`
**Propósito**: Trackear evolución del proyecto tipo Spec Kit
**Contenido**:
- Especificaciones por versión
- Log de cambios
- Roadmap futuro

## Objetivos Cumplidos

- ✅ Setup inicial de Slidev
- ✅ Presentación completa sobre templates
- ✅ Documentación detallada
- ✅ Template base funcional
- ✅ Sistema de evolución
- ✅ Estructura organizacional

## Tecnologías Utilizadas

- **Slidev**: Presentaciones basadas en Markdown
- **Node.js/npm**: Gestión de dependencias
- **.NET Templates**: Sistema nativo de plantillas
- **Markdown**: Documentación
- **JSON**: Configuración de templates

## Comandos Disponibles

```bash
# Presentación
npm run dev          # Ejecutar presentación
npm run build        # Construir presentación
npm run export       # Exportar a PDF

# Templates  
dotnet new install ./templates/MiOrg.WebApi.Template
dotnet new miwebapi -n MiProyecto
```

## Estructura de Archivos

```
├── slides.md                           # Presentación principal
├── package.json                        # Configuración npm
├── docs/                              # Documentación
│   ├── templates-guide.md
│   ├── best-practices.md
│   └── distribution.md
├── templates/                         # Templates disponibles
│   └── MiOrg.WebApi.Template/
│       ├── .template.config/
│       │   └── template.json
│       └── src/MiOrg.WebApi/
├── specs/                            # Sistema de evolución
│   └── v1.0/
│       └── specification.md
└── examples/                         # Ejemplos generados
```

## Métricas

- **Líneas de código de presentación**: ~300 líneas (slides.md)
- **Documentación**: ~500 líneas (4 archivos)
- **Template funcional**: 1 template completo
- **Parámetros configurables**: 7 parámetros
- **Tiempo de setup**: < 5 minutos

## Próximos Pasos (v1.1)

- Más templates (Console, Class Library, Microservice)
- Integración CI/CD
- Tests automatizados para templates
- Empaquetado como NuGet
- Configuración avanzada de Spec Kit