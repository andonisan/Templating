# Guía Completa de .NET Templates

## ¿Qué es un Template de .NET?

Un template de .NET es una plantilla predefinida que permite crear proyectos, archivos o configuraciones con una estructura específica. Los templates ayudan a:

- **Mantener consistencia** en la organización
- **Acelerar el desarrollo** evitando configuraciones repetitivas
- **Aplicar mejores prácticas** desde el inicio
- **Facilitar onboarding** de nuevos desarrolladores

## Anatomía de un Template

### Estructura Básica

```
MiTemplate/
├── .template.config/
│   ├── template.json        # Configuración principal
│   └── ide.host.json       # Configuración para IDEs (opcional)
├── src/                     # Código fuente del template
├── tests/                   # Tests del template
└── README.md               # Documentación
```

### template.json - Configuración Principal

```json
{
  "$schema": "http://json.schemastore.org/template",
  "author": "Mi Organización",
  "name": "Mi Template",
  "identity": "MiOrg.MiTemplate",
  "shortName": "mitemplate",
  "tags": {
    "language": "C#",
    "type": "project"
  },
  "sourceName": "MiOrg.PlaceholderName",
  "preferNameDirectory": true,
  "symbols": {
    "Framework": {
      "type": "parameter",
      "dataType": "choice",
      "choices": [
        {
          "choice": "net6.0",
          "description": ".NET 6.0"
        },
        {
          "choice": "net8.0", 
          "description": ".NET 8.0"
        }
      ],
      "defaultValue": "net8.0",
      "description": "Target framework"
    }
  }
}
```

## Tipos de Parámetros

### 1. Parameter (Básico)

```json
{
  "UseHttps": {
    "type": "parameter",
    "dataType": "bool",
    "defaultValue": "true",
    "description": "Configurar HTTPS"
  }
}
```

### 2. Choice (Opciones múltiples)

```json
{
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
```

### 3. Computed (Calculado)

```json
{
  "UseEntityFramework": {
    "type": "computed",
    "value": "(Database != \"None\")",
    "description": "Usar Entity Framework"
  }
}
```

## Uso de Símbolos en el Código

### Preprocessor Directives

```csharp
#if (UseEntityFramework)
using Microsoft.EntityFrameworkCore;
#endif

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
#if (Database == "SqlServer")
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString));
#endif

#if (Database == "PostgreSQL")
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString));
#endif
    }
}
```

### String Replacement

```json
// En archivos no-C#
{
  "Company": "MiOrganización",
  "Project": "MiProyecto"
}
```

```xml
<!-- En .csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <AssemblyTitle>Company.Project</AssemblyTitle>
  </PropertyGroup>
</Project>
```

## Configuraciones Avanzadas

### Sources - Control de Archivos

```json
{
  "sources": [
    {
      "condition": "(IncludeTests)",
      "source": "./tests/",
      "target": "./tests/"
    },
    {
      "condition": "(Framework == 'net6.0')",
      "source": "./src/net6/",
      "target": "./src/"
    }
  ]
}
```

### Post-Actions - Acciones después de crear

```json
{
  "postActions": [
    {
      "condition": "(RestorePackages)",
      "description": "Restore NuGet packages",
      "actionId": "210D431B-A78B-4D2F-B762-4ED3E3EA9025",
      "continueOnError": true
    },
    {
      "condition": "(InitializeGit)",
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

## Comandos de Template

### Instalación

```bash
# Desde carpeta local
dotnet new install ./MiTemplate

# Desde NuGet
dotnet new install MiOrg.Templates

# Desde Git
dotnet new install https://github.com/miorg/templates.git
```

### Uso

```bash
# Crear proyecto con template
dotnet new mitemplate -n MiProyecto

# Con parámetros específicos
dotnet new mitemplate -n MiApi \
  --Database PostgreSQL \
  --UseHttps false \
  --Framework net6.0
```

### Gestión

```bash
# Listar templates instalados
dotnet new list

# Desinstalar template
dotnet new uninstall MiOrg.Templates

# Ver ayuda de un template específico
dotnet new mitemplate --help
```

## Testing de Templates

### Estructura de Tests

```
tests/
├── template-tests/
│   ├── TestTemplate.cs
│   └── fixtures/
│       ├── basic-project/
│       └── advanced-project/
└── integration-tests/
    └── GeneratedProjectTests.cs
```

### Test Básico

```csharp
[Test]
public void Template_GeneratesBasicProject_Successfully()
{
    // Arrange
    var templatePath = "./MiTemplate";
    var outputPath = "./output/basic-test";
    
    // Act
    var result = DotnetNew.Execute(templatePath, outputPath, new
    {
        name = "TestProject",
        Database = "SqlServer"
    });
    
    // Assert
    Assert.That(result.ExitCode, Is.EqualTo(0));
    Assert.That(File.Exists($"{outputPath}/TestProject.csproj"));
}
```

## Mejores Prácticas

### 1. Naming Conventions

- **Identity**: `Organización.Categoria.Template` (ej: `Contoso.WebApi.Template`)
- **ShortName**: Corto y descriptivo (ej: `contosoapi`)
- **SourceName**: Placeholder para reemplazar (ej: `Contoso.WebApi`)

### 2. Parámetros Útiles

```json
{
  "symbols": {
    "skipRestore": {
      "type": "parameter",
      "dataType": "bool",
      "description": "Skip NuGet restore",
      "defaultValue": "false"
    },
    "Framework": {
      "type": "parameter", 
      "dataType": "choice",
      "choices": [
        "net6.0",
        "net8.0"
      ],
      "defaultValue": "net8.0"
    }
  }
}
```

### 3. Documentación

- Incluir `README.md` explicando el template
- Documentar todos los parámetros
- Proporcionar ejemplos de uso
- Mantener changelog

### 4. Versionado

- Usar versionado semántico
- Crear tags para releases
- Mantener compatibilidad hacia atrás cuando sea posible

## Troubleshooting

### Problemas Comunes

1. **Template no aparece en `dotnet new list`**
   - Verificar `template.json` es válido
   - Confirmar estructura de carpetas correcta

2. **Errores de compilación en proyecto generado**
   - Revisar directivas de preprocessor
   - Verificar dependencias condicionales

3. **Parámetros no funcionan**
   - Validar sintaxis de símbolos
   - Confirmar uso correcto en archivos fuente

### Debugging

```bash
# Información detallada sobre template
dotnet new mitemplate --dry-run -n TestProject

# Ver todos los templates con información detallada
dotnet new list --columns-all
```