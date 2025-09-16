# .NET Templates para Organizaciones

Este repositorio contiene una presentación completa sobre cómo crear y gestionar templates de .NET para organizaciones, incluyendo ejemplos prácticos, documentación detallada y herramientas para la evolución del proyecto.

## 🎯 Propósito

Una charla/presentación completa que cubre:

- ✨ **Cómo crear templates de .NET personalizados**
- 🏢 **Mejores prácticas para organizaciones**
- 📦 **Distribución y mantenimiento de templates**
- 🛠️ **Herramientas y automatización**
- 📊 **Evolución y tracking de especificaciones**

## 🏗️ Estructura del Proyecto

```
├── slides.md                 # Presentación principal con Slidev
├── docs/                     # Documentación detallada
├── templates/                # Ejemplos de templates .NET
├── examples/                 # Proyectos de ejemplo generados
├── specs/                    # Especificaciones y evolución (Spec Kit)
└── package.json             # Configuración para Slidev
```

## 🚀 Inicio Rápido

### Ver la Presentación

```bash
# Instalar dependencias
npm install

# Ejecutar presentación en modo desarrollo
npm run dev

# Construir presentación para producción  
npm run build

# Exportar a PDF
npm run export
```

### Usar los Templates

```bash
# Navegar a la carpeta de templates
cd templates

# Instalar un template localmente
dotnet new install ./MiOrg.WebApi.Template

# Usar el template
dotnet new miwebapi -n MiNuevoProyecto
```

## 📚 Contenido de la Presentación

1. **Introducción a .NET Templates**
   - ¿Qué son y por qué son útiles?
   - Beneficios para organizaciones

2. **Creación de Templates Personalizados**
   - Estructura básica
   - Configuración con template.json
   - Parámetros y símbolos

3. **Distribución en Organizaciones**
   - NuGet feeds internos
   - GitHub/GitLab Packages
   - Template Packs

4. **Mejores Prácticas**
   - Estructuración
   - Mantenimiento
   - Versionado

5. **Casos de Uso Avanzados**
   - Contenido condicional
   - Post-actions
   - Integración con CI/CD

6. **Demo Práctica**
   - Creación de un template de microservicio

## 📖 Documentación

La carpeta `docs/` contiene documentación detallada sobre:

- [Guía de Templates](docs/templates-guide.md)
- [Mejores Prácticas](docs/best-practices.md)
- [Distribución Organizacional](docs/distribution.md)
- [Ejemplos Avanzados](docs/advanced-examples.md)

## 🔧 Templates Incluidos

### Templates Base
- **WebApi Template**: API base con Swagger, logging y health checks
- **Microservice Template**: Microservicio completo con Docker
- **Console App Template**: Aplicación de consola con DI y configuración
- **Class Library Template**: Librería con tests y documentación

### Templates Organizacionales
- **Enterprise API**: Template corporativo con autenticación y auditoría
- **CQRS Service**: Servicio con patrón CQRS y MediatR
- **Event-Driven Service**: Microservicio con mensajería

## 📊 Spec Kit - Evolución del Proyecto

La carpeta `specs/` implementa un sistema tipo Spec Kit para trackear la evolución:

```
specs/
├── v1.0/                    # Especificaciones iniciales
├── v1.1/                    # Primera evolución
├── evolution.md             # Log de cambios y evolución
└── roadmap.md              # Roadmap futuro
```

### Comandos de Evolución

```bash
# Crear nueva especificación
npm run spec:new v1.2

# Comparar versiones
npm run spec:diff v1.0 v1.1

# Generar reporte de evolución
npm run spec:report
```

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Ejecutar presentación en desarrollo
npm run build        # Construir presentación
npm run export       # Exportar a PDF
npm run spec:new     # Nueva especificación
npm run spec:diff    # Comparar especificaciones
npm run templates:test # Testear todos los templates
npm run templates:pack # Empaquetar templates como NuGet
```

## 🤝 Contribuir

1. **Fork** el repositorio
2. **Clona** tu fork
3. **Crea** una rama para tu feature
4. **Commits** tus cambios
5. **Push** a tu rama
6. **Abre** un Pull Request

### Agregar Nuevos Templates

1. Crear carpeta en `templates/`
2. Agregar `template.json` y código fuente
3. Documentar en `docs/`
4. Agregar tests en `examples/`

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **GitHub**: [@andonisan](https://github.com/andonisan)
- **Issues**: [Crear issue](https://github.com/andonisan/Templating/issues)
- **Discussions**: [Discusiones](https://github.com/andonisan/Templating/discussions)

---

⭐ **¡Dale una estrella si te parece útil!** ⭐