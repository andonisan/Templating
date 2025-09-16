#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');

function generateSpecReport() {
    const specsDir = path.join(process.cwd(), 'specs');
    
    if (!fs.existsSync(specsDir)) {
        console.error('❌ Error: No se encontró el directorio specs/');
        process.exit(1);
    }

    // Obtener todas las versiones
    const versions = fs.readdirSync(specsDir)
        .filter(item => fs.statSync(path.join(specsDir, item)).isDirectory())
        .filter(item => item.match(/^v\d+\.\d+/))
        .sort();

    console.log('📊 Reporte de Especificaciones\n');
    console.log('='.repeat(50));

    versions.forEach(version => {
        const versionPath = path.join(specsDir, version);
        const specFile = path.join(versionPath, 'specification.md');
        
        console.log(`\n📋 ${version.toUpperCase()}`);
        console.log('-'.repeat(20));

        if (fs.existsSync(specFile)) {
            const content = fs.readFileSync(specFile, 'utf-8');
            
            // Extraer información básica
            const summaryMatch = content.match(/## Resumen\n\n(.+?)(?=\n##|$)/s);
            const summary = summaryMatch ? summaryMatch[1].trim() : 'Sin resumen';
            
            // Contar objetivos
            const objectives = (content.match(/- \[ \]/g) || []).length;
            const completed = (content.match(/- \[x\]/g) || []).length;
            
            console.log(`📝 Resumen: ${summary.split('\n')[0]}`);
            console.log(`✅ Completado: ${completed}/${completed + objectives} objetivos`);
            
            // Mostrar estado
            if (completed === 0 && objectives > 0) {
                console.log(`🔄 Estado: Planificado`);
            } else if (completed < objectives) {
                console.log(`🚧 Estado: En progreso`);
            } else if (completed > 0) {
                console.log(`✨ Estado: Completado`);
            }
        } else {
            console.log('❌ Especificación no encontrada');
        }
    });

    console.log('\n' + '='.repeat(50));
    console.log(`📈 Total de versiones: ${versions.length}`);

    // Estadísticas generales
    let totalObjectives = 0;
    let totalCompleted = 0;

    versions.forEach(version => {
        const specFile = path.join(specsDir, version, 'specification.md');
        if (fs.existsSync(specFile)) {
            const content = fs.readFileSync(specFile, 'utf-8');
            totalObjectives += (content.match(/- \[ \]/g) || []).length;
            totalCompleted += (content.match(/- \[x\]/g) || []).length;
        }
    });

    if (totalObjectives > 0 || totalCompleted > 0) {
        const progress = ((totalCompleted / (totalObjectives + totalCompleted)) * 100).toFixed(1);
        console.log(`🎯 Progreso general: ${progress}% (${totalCompleted}/${totalObjectives + totalCompleted})`);
    }

    console.log('\n📋 Para crear una nueva especificación:');
    console.log('   npm run spec:new v1.X');
    console.log('\n📊 Para comparar versiones:');
    console.log('   npm run spec:diff v1.0 v1.1');
}

generateSpecReport();