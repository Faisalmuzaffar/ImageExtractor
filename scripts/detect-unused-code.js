#!/usr/bin/env node

/**
 * Simple script to detect unused UI components and files
 * Usage: node scripts/detect-unused-code.js
 */

import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

async function findUnusedUIComponents() {
  console.log('🔍 Detecting unused UI components...\n');
  
  try {
    // Get all UI component files
    const uiComponentsDir = join(PROJECT_ROOT, 'client/src/components/ui');
    const uiFiles = await readdir(uiComponentsDir);
    const allComponents = uiFiles
      .filter(f => f.endsWith('.tsx'))
      .map(f => f.replace('.tsx', ''))
      .sort();

    // Find components that are imported
    const grepCmd = `find ${PROJECT_ROOT}/client/src ${PROJECT_ROOT}/server -name "*.tsx" -o -name "*.ts" | xargs grep "from.*@/components/ui/" | grep -o "@/components/ui/[a-z-]*" | sed 's|@/components/ui/||' | sort | uniq`;
    
    let usedComponents = [];
    try {
      const output = execSync(grepCmd, { encoding: 'utf8' });
      usedComponents = output.trim().split('\n').filter(Boolean);
    } catch (error) {
      // No imports found, all components are unused
      usedComponents = [];
    }

    const unusedComponents = allComponents.filter(component => 
      !usedComponents.includes(component)
    );

    console.log(`📊 UI Components Analysis:`);
    console.log(`   Total components: ${allComponents.length}`);
    console.log(`   Used components: ${usedComponents.length}`);
    console.log(`   Unused components: ${unusedComponents.length}`);
    
    if (unusedComponents.length > 0) {
      console.log(`\n🚮 Unused UI components:`);
      unusedComponents.forEach(comp => console.log(`   - ${comp}.tsx`));
      
      console.log(`\n💡 To remove unused components, run:`);
      console.log(`   rm ${unusedComponents.map(c => `client/src/components/ui/${c}.tsx`).join(' ')}`);
    } else {
      console.log(`\n✅ All UI components are being used!`);
    }

  } catch (error) {
    console.error('❌ Error analyzing UI components:', error.message);
  }
}

async function findDeadFiles() {
  console.log('\n🔍 Detecting potentially dead files...\n');
  
  // Check for any typescript files that might not be imported
  try {
    const cmd = `find ${PROJECT_ROOT}/client/src -name "*.ts" -o -name "*.tsx" | grep -v main.tsx | grep -v App.tsx`;
    const allFiles = execSync(cmd, { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    
    console.log(`📁 Found ${allFiles.length} TypeScript files to analyze`);
    
    // This is a simple check - in a real implementation, you'd want to build a dependency graph
    // For now, we'll just report the files found
    console.log(`\n💡 To thoroughly check for unused imports, consider using tools like:`);
    console.log(`   - ts-unused-exports`);
    console.log(`   - knip`);
    console.log(`   - depcheck`);
    
  } catch (error) {
    console.error('❌ Error analyzing files:', error.message);
  }
}

async function main() {
  console.log('🧹 Unused Code Detection Tool\n');
  console.log('==============================\n');
  
  await findUnusedUIComponents();
  await findDeadFiles();
  
  console.log('\n✨ Analysis complete!\n');
}

main().catch(console.error);