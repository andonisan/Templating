# Mejores Prácticas para Templates de .NET

## Diseño de Templates

### 1. Principio KISS (Keep It Simple, Stupid)

**❌ No hagas esto:**
```json
{
  "symbols": {
    "DatabaseProvider": { /* 15 opciones diferentes */ },
    "AuthenticationMethod": { /* 10 opciones */ },
    "CachingStrategy": { /* 8 opciones */ },
    "LoggingFramework": { /* 6 opciones */ }
  }
}
```

**✅ Haz esto:**
```json
{
  "symbols": {
    "IncludeAuth": {
      "type": "parameter",
      "dataType": "bool",
      "defaultValue": "false"
    },
    "Database": {
      "type": "parameter", 
      "dataType": "choice",
      "choices": ["SqlServer", "PostgreSQL", "None"],
      "defaultValue": "SqlServer"
    }
  }
}
```

### 2. Configuración por Defecto Sensata

```json
{
  "symbols": {
    "UseHttps": {
      "type": "parameter",
      "dataType": "bool", 
      "defaultValue": "true",
      "description": "Enable HTTPS (recommended for production)"
    },
    "IncludeSwagger": {
      "type": "parameter",
      "dataType": "bool",
      "defaultValue": "true",
      "description": "Include Swagger documentation"
    }
  }
}
```

## Estructura de Carpetas

### Template Organization

```
MiOrg.WebApi.Template/
├── .template.config/
│   ├── template.json           # Configuración principal
│   ├── template.host.json      # Configuración IDE
│   └── dotnetcli.host.json    # Configuración CLI
├── src/
│   └── MiOrg.WebApi/
│       ├── Controllers/
│       │   ├── BaseController.cs
│       │   └── HealthController.cs
│       ├── Models/
│       │   ├── ApiResponse.cs
│       │   └── ErrorResponse.cs
│       ├── Services/
│       │   └── Interfaces/
│       ├── Configuration/
│       │   ├── ServiceCollectionExtensions.cs
│       │   └── LoggingConfiguration.cs
│       ├── Program.cs
│       ├── appsettings.json
│       ├── appsettings.Development.json
│       └── MiOrg.WebApi.csproj
├── tests/
│   └── MiOrg.WebApi.Tests/
│       ├── Controllers/
│       ├── Services/
│       ├── Integration/
│       └── MiOrg.WebApi.Tests.csproj
├── docs/
│   ├── README.md
│   ├── API.md
│   └── DEPLOYMENT.md
├── .gitignore
├── .editorconfig
├── Directory.Build.props       # Propiedades compartidas
└── global.json                # Versión SDK
```

## Configuración Avanzada

### 1. Multiple Target Frameworks

```json
{
  "symbols": {
    "TargetFramework": {
      "type": "parameter",
      "dataType": "choice",
      "choices": [
        {
          "choice": "net6.0",
          "description": ".NET 6.0 (LTS)"
        },
        {
          "choice": "net8.0",
          "description": ".NET 8.0 (LTS)"
        },
        {
          "choice": "net9.0",
          "description": ".NET 9.0"
        }
      ],
      "defaultValue": "net8.0",
      "replaces": "net8.0"
    }
  }
}
```

### 2. Conditional Content

```json
{
  "sources": [
    {
      "modifiers": [
        {
          "condition": "(!IncludeTests)",
          "exclude": ["tests/**/*"]
        },
        {
          "condition": "(!IncludeDocker)",
          "exclude": ["**/Dockerfile", "**/*.dockerignore", "**/docker-compose.*"]
        }
      ]
    }
  ]
}
```

### 3. File Naming Based on Parameters

```json
{
  "symbols": {
    "DatabaseProvider": {
      "type": "parameter",
      "dataType": "choice", 
      "choices": ["SqlServer", "PostgreSQL"],
      "defaultValue": "SqlServer"
    }
  },
  "sources": [
    {
      "condition": "(DatabaseProvider == 'SqlServer')",
      "source": "./src/Data/SqlServer/",
      "target": "./src/Data/"
    },
    {
      "condition": "(DatabaseProvider == 'PostgreSQL')", 
      "source": "./src/Data/PostgreSQL/",
      "target": "./src/Data/"
    }
  ]
}
```

## Code Templates Best Practices

### 1. Logging Configuration

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

#if (EnableStructuredLogging)
builder.Host.UseSerilog((context, configuration) =>
{
    configuration
        .ReadFrom.Configuration(context.Configuration)
        .Enrich.FromLogContext()
        .Enrich.WithMachineName()
        .Enrich.WithProcessId()
        .WriteTo.Console()
#if (LogToFile)
        .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
#endif
        ;
});
#endif

var app = builder.Build();
```

### 2. Health Checks

```csharp
// ServiceCollectionExtensions.cs
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddHealthChecks(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var healthChecksBuilder = services.AddHealthChecks();

#if (Database != "None")
        healthChecksBuilder.AddDbContextCheck<ApplicationDbContext>();
#endif

#if (UseRedis)
        healthChecksBuilder.AddRedis(
            configuration.GetConnectionString("Redis"));
#endif

        return services;
    }
}
```

### 3. Configuration Patterns

```csharp
// appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
#if (Database == "SqlServer")
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MiOrg.WebApi;Trusted_Connection=true;MultipleActiveResultSets=true"
  },
#endif
#if (Database == "PostgreSQL") 
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=MiOrg.WebApi;Username=postgres;Password=password"
  },
#endif
  "AllowedHosts": "*"
}
```

## Documentation Standards

### 1. README Template

```markdown
# MiOrg.WebApi

Descripción breve del servicio.

## Características

- ✅ API RESTful
- ✅ Documentación Swagger
- ✅ Health checks
#if (IncludeAuth)
- ✅ Autenticación JWT
#endif
#if (Database != "None")
- ✅ Base de datos Database
#endif

## Inicio Rápido

```bash
# Restaurar dependencias
dotnet restore

# Ejecutar la aplicación
dotnet run

# La API estará disponible en https://localhost:5001
```

## Configuración

### Variables de Entorno

- `ASPNETCORE_ENVIRONMENT`: Entorno de ejecución
#if (Database != "None")
- `ConnectionStrings__DefaultConnection`: Cadena de conexión a la base de datos
#endif

## Deployment

Ver [DEPLOYMENT.md](docs/DEPLOYMENT.md) para instrucciones detalladas.
```

### 2. API Documentation

```markdown
# API Documentation

## Authentication
#if (IncludeAuth)
Este API utiliza JWT Bearer tokens para autenticación.

### Obtener Token

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "usuario",
  "password": "contraseña"
}
```
#endif

## Endpoints

### Health Check

```http
GET /health
```

Respuesta:
```json
{
  "status": "Healthy",
  "totalDuration": "00:00:00.0123456"
}
```
```

## Testing Standards

### 1. Unit Test Structure

```csharp
public class ControllerNameTests
{
    private readonly Mock<IService> _serviceMock;
    private readonly ControllerName _controller;

    public ControllerNameTests()
    {
        _serviceMock = new Mock<IService>();
        _controller = new ControllerName(_serviceMock.Object);
    }

    [Test]
    public async Task Method_WithValidInput_ReturnsExpectedResult()
    {
        // Arrange
        var input = new ValidInput();
        _serviceMock.Setup(x => x.Method(input))
                   .ReturnsAsync(new ExpectedResult());

        // Act
        var result = await _controller.Method(input);

        // Assert
        Assert.That(result, Is.TypeOf<OkObjectResult>());
    }
}
```

### 2. Integration Test Base

```csharp
public class IntegrationTestBase : IDisposable
{
    protected readonly WebApplicationFactory<Program> Factory;
    protected readonly HttpClient Client;

    public IntegrationTestBase()
    {
        Factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
#if (Database != "None")
                builder.UseEnvironment("Testing");
                builder.ConfigureServices(services =>
                {
                    // Replace database with in-memory for tests
                    services.RemoveAll<DbContextOptions<ApplicationDbContext>>();
                    services.AddDbContext<ApplicationDbContext>(options =>
                        options.UseInMemoryDatabase("TestDatabase"));
                });
#endif
            });

        Client = Factory.CreateClient();
    }

    public void Dispose()
    {
        Client?.Dispose();
        Factory?.Dispose();
    }
}
```

## Deployment Patterns

### 1. Docker Configuration

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/MiOrg.WebApi/MiOrg.WebApi.csproj", "src/MiOrg.WebApi/"]
RUN dotnet restore "src/MiOrg.WebApi/MiOrg.WebApi.csproj"
COPY . .
WORKDIR "/src/src/MiOrg.WebApi"
RUN dotnet build "MiOrg.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MiOrg.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MiOrg.WebApi.dll"]
```

### 2. GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: 8.0.x
        
    - name: Restore dependencies
      run: dotnet restore
      
    - name: Build
      run: dotnet build --no-restore
      
    - name: Test
      run: dotnet test --no-build --verbosity normal
```

## Performance Considerations

### 1. Template Generation Performance

- Minimizar archivos condicionales
- Usar `sources` en lugar de muchas condiciones inline
- Evitar post-actions costosas

### 2. Generated Code Performance

```csharp
// Program.cs - Configuración optimizada
var builder = WebApplication.CreateBuilder(args);

// Configurar servicios de forma eficiente
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

#if (EnableResponseCompression)
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<GzipCompressionProvider>();
});
#endif

var app = builder.Build();

#if (EnableResponseCompression)
app.UseResponseCompression();
#endif

app.Run();
```

## Maintenance

### 1. Template Updates

- Versionado semántico estricto
- Changelog detallado
- Tests de compatibilidad hacia atrás
- Migración automática cuando sea posible

### 2. Dependency Management

```xml
<!-- Directory.Build.props -->
<Project>
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
    <WarningsAsErrors />
    <WarningsNotAsErrors>NU1605</WarningsNotAsErrors>
  </PropertyGroup>

  <ItemGroup>
    <!-- Versiones centralizadas -->
    <PackageVersion Include="Microsoft.AspNetCore.OpenApi" Version="8.0.0" />
    <PackageVersion Include="Swashbuckle.AspNetCore" Version="6.5.0" />
    <PackageVersion Include="Serilog.AspNetCore" Version="7.0.0" />
  </ItemGroup>
</Project>
```