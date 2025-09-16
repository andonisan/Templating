---
theme: default
background: https://source.unsplash.com/1920x1080/?code,development
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## .NET Templates
  Una charla completa sobre cómo crear y gestionar templates de .NET para organizaciones
drawings:
  persist: false
transition: slide-left
title: .NET Templates para Organizaciones
---

# .NET Templates para Organizaciones

Creando plantillas personalizadas para acelerar el desarrollo

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Presiona espacio para la siguiente diapositiva <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Abrir en editor" class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/andonisan/Templating" target="_blank" alt="GitHub" class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
transition: fade-out
---

# ¿Qué es un Template de .NET?

Los templates de .NET son plantillas predefinidas que permiten crear proyectos con una estructura y configuración específica.

<v-clicks>

- 🎯 **Consistencia** - Mantiene estándares en toda la organización
- ⚡ **Velocidad** - Acelera la creación de nuevos proyectos
- 🔧 **Personalización** - Adaptable a necesidades específicas
- 📦 **Distribución** - Fácil de compartir y mantener

</v-clicks>

<br>
<br>

<v-click>

```bash
# Crear un proyecto desde un template
dotnet new webapi -n MiApi
dotnet new console -n MiConsola
```

</v-click>

---

# ¿Por qué crear Templates personalizados?

<v-clicks>

- **Arquitectura Consistente**: Todos los proyectos siguen los mismos patrones
- **Configuración Predeterminada**: Logging, autenticación, base de datos ya configurados
- **Mejores Prácticas**: Estructura de carpetas, nombrado, dependencias
- **Onboarding Rápido**: Nuevos desarrolladores pueden empezar inmediatamente
- **Cumplimiento**: Políticas de seguridad y estándares corporativos

</v-clicks>

<v-click>

### Ejemplo: Template de API Corporativa

```
MyCompany.Api.Template/
├── src/
│   └── MyCompany.Api/
│       ├── Controllers/
│       ├── Models/
│       ├── Services/
│       └── Program.cs
├── tests/
└── template.json
```

</v-click>

---

# Estructura de un Template

Un template de .NET consta de varios archivos clave:

<div grid="~ cols-2 gap-4">
<div>

### template.json
```json
{
  "$schema": "http://json.schemastore.org/template",
  "author": "Mi Organización",
  "name": "Mi API Template",
  "identity": "MiOrg.Api.Template",
  "shortName": "miapi",
  "tags": {
    "language": "C#",
    "type": "project"
  },
  "sourceName": "MiOrg.Api",
  "preferNameDirectory": true
}
```

</div>
<div>

### Archivos de Código
- Código fuente con placeholders
- Configuraciones predeterminadas
- Tests unitarios básicos
- Documentación inicial

### Símbolos y Parámetros
```json
"symbols": {
  "UseDatabase": {
    "type": "parameter",
    "dataType": "bool",
    "defaultValue": "true"
  }
}
```

</div>
</div>

---

# Creando tu Primer Template

## Paso 1: Estructura del Proyecto

<v-click>

```bash
mkdir MiOrg.WebApi.Template
cd MiOrg.WebApi.Template
mkdir .template.config
```

</v-click>

<v-click>

## Paso 2: Configuración del Template

```json
{
  "$schema": "http://json.schemastore.org/template",
  "author": "Mi Organización",
  "name": "Mi Web API Template",
  "identity": "MiOrg.WebApi.Template",
  "shortName": "miweb",
  "tags": {
    "language": "C#",
    "type": "project"
  },
  "sourceName": "MiOrg.WebApi",
  "preferNameDirectory": true,
  "symbols": {
    "EnableSwagger": {
      "type": "parameter",
      "dataType": "bool",
      "defaultValue": "true",
      "description": "Habilitar documentación Swagger"
    }
  }
}
```

</v-click>

---

# Parámetros y Símbolos

Los símbolos permiten personalizar el template durante la creación:

<div grid="~ cols-2 gap-4">
<div>

### Tipos de Parámetros

```json
{
  "symbols": {
    "Database": {
      "type": "parameter",
      "dataType": "choice",
      "choices": [
        {
          "choice": "SqlServer",
          "description": "SQL Server"
        },
        {
          "choice": "PostgreSQL",
          "description": "PostgreSQL"
        }
      ],
      "defaultValue": "SqlServer"
    }
  }
}
```

</div>
<div>

### Uso en el Código

```csharp
#if (Database == "SqlServer")
services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));
#endif

#if (Database == "PostgreSQL")
services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));
#endif
```

</div>
</div>

---

# Instalación y Uso de Templates

## Instalación Local

<v-click>

```bash
# Instalar desde carpeta local
dotnet new install ./MiOrg.WebApi.Template

# Ver templates instalados
dotnet new list
```

</v-click>

<v-click>

## Crear Proyecto

```bash
# Usar el template
dotnet new miweb -n MiNuevoProyecto --EnableSwagger false

# Con parámetros adicionales
dotnet new miweb -n MiApi --Database PostgreSQL
```

</v-click>

<v-click>

## Distribución

```bash
# Empaquetar como NuGet
dotnet pack

# Publicar en feed interno
dotnet nuget push MiOrg.Templates.1.0.0.nupkg --source https://mi-feed-interno
```

</v-click>

---

# Distribución en Organizaciones

<v-clicks>

### 1. **NuGet Feed Interno**
- Publicar templates como paquetes NuGet
- Control de versiones y distribución centralizada
- Fácil instalación: `dotnet new install MiOrg.Templates`

### 2. **GitHub/GitLab Packages**
- Usar registros de paquetes de GitHub/GitLab
- Integración con CI/CD
- Control de acceso por equipos

### 3. **Template Packs**
- Agrupar múltiples templates relacionados
- Versionado conjunto
- Documentación unificada

</v-clicks>

---

# Mejores Prácticas

<v-clicks>

## Estructuración
- **Nombres consistentes**: Usar convenciones de nombrado claras
- **Documentación**: README.md con instrucciones de uso
- **Versionado semántico**: Para facilitar actualizaciones

## Contenido del Template
- **Configuración mínima viable**: Solo lo esencial
- **Comentarios explicativos**: Ayudar a entender las decisiones
- **Tests incluidos**: Ejemplos de testing desde el inicio

## Mantenimiento
- **Actualizaciones regulares**: Mantener dependencias actualizadas
- **Feedback del equipo**: Recoger y aplicar sugerencias
- **CI/CD para templates**: Automatizar testing y publicación

</v-clicks>

---

# Casos de Uso Avanzados

<div grid="~ cols-2 gap-4">
<div>

### Conditional Content

```json
{
  "symbols": {
    "auth": {
      "type": "parameter",
      "dataType": "choice",
      "choices": ["jwt", "oauth", "none"]
    }
  },
  "sources": [
    {
      "condition": "(auth != 'none')",
      "source": "./auth/",
      "target": "./src/Auth/"
    }
  ]
}
```

</div>
<div>

### Post-Actions

```json
{
  "postActions": [
    {
      "condition": "(UseGit)",
      "description": "Initialize git repository",
      "actionId": "3A7C4B45-1F5D-4A30-960B-2576D2AC2E7A",
      "args": {
        "executable": "git",
        "args": "init"
      }
    }
  ]
}
```

</div>
</div>

---

# Herramientas y Recursos

<v-clicks>

## **Template Studio**
- Herramienta visual para crear templates
- Interfaz gráfica intuitiva
- Generación automática de configuración

## **Spec Kit** 
- Evolución y documentación de especificaciones
- Tracking de cambios en templates
- Colaboración en equipo

## **Recursos Útiles**
- [Microsoft Template Docs](https://docs.microsoft.com/dotnet/core/tools/custom-templates)
- [Template Engine Wiki](https://github.com/dotnet/templating/wiki)
- [Community Templates](https://github.com/dotnet/templating/wiki/Available-templates-for-dotnet-new)

</v-clicks>

---

# Demo Práctica

## Vamos a crear un template juntos

<v-click>

### Scenario: Template de Microservicio
- API con controladores base
- Configuración de logging
- Health checks
- Docker support
- Tests unitarios básicos

</v-click>

<v-click>

```bash
# Estructura que crearemos
MicroserviceTemplate/
├── .template.config/
│   └── template.json
├── src/
│   └── Company.Service/
│       ├── Controllers/
│       ├── Models/
│       ├── Services/
│       ├── Program.cs
│       └── Dockerfile
└── tests/
    └── Company.Service.Tests/
```

</v-click>

---

# Próximos Pasos

<v-clicks>

## Para tu Organización

1. **Auditar proyectos existentes** - Identificar patrones comunes
2. **Definir estándares** - Establecer convenciones de arquitectura
3. **Crear template inicial** - Empezar con el caso más común
4. **Iterar basado en feedback** - Mejorar continuamente
5. **Automatizar distribución** - CI/CD para templates

## Recursos para Continuar

- **Repository**: [github.com/andonisan/Templating](https://github.com/andonisan/Templating)
- **Ejemplos prácticos** incluidos en este repo
- **Documentación detallada** en `/docs`

</v-clicks>

---

# ¡Gracias!

<div class="text-center">

## ¿Preguntas?

### Recursos

- 📚 **Repo**: [github.com/andonisan/Templating](https://github.com/andonisan/Templating)
- 📖 **Docs**: Documentación completa incluida
- 🛠️ **Templates**: Ejemplos listos para usar
- 📈 **Spec Kit**: Evolución del proyecto

</div>

<div class="abs-br m-6">
  <carbon-logo-github class="text-xl opacity-50" />
  <span class="ml-2 opacity-50">andonisan/Templating</span>
</div>