const fs = require('fs');
const path = require('path');

function fixMui(rootDir) {
  if (!fs.existsSync(rootDir)) return;

  function walkPackages(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === '@mui') {
          const muiEntries = fs.readdirSync(fullPath, { withFileTypes: true });
          for (const muiEntry of muiEntries) {
            const muiPackageDir = path.join(fullPath, muiEntry.name);
            patchMuiPackage(muiPackageDir);
          }
        }
        if (entry.name !== '.cache' && entry.name !== '.git') {
          walkPackages(fullPath);
        }
      }
    }
  }

  walkPackages(rootDir);
  patchAllUtilsImports(rootDir);
}

function patchMuiPackage(pkgDir) {
  const esmDir = path.join(pkgDir, 'esm');
  if (fs.existsSync(esmDir)) {
    patchEsmDirectory(esmDir);
  }
}

function patchEsmDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      patchEsmDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      transformEsmFile(fullPath);
    }
  }
}

function transformEsmFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Fix re-export of default: export { default } from "./foo.js";
    if (/export\s*\{\s*default\s*\}\s*from\s*["']([^"']+)["'];?/.test(content)) {
      content = content.replace(/export\s*\{\s*default\s*\}\s*from\s*["']([^"']+)["'];?/g, (m, src) => {
        changed = true;
        const varName = '_default_exp_' + Math.random().toString(36).substring(2, 7);
        return `import ${varName} from "${src}";\nexport default ${varName};`;
      });
    }

    // 2. Fix re-export of default as Name: export { default as Foo } from "./foo.js";
    if (/export\s*\{\s*default\s+as\s+([a-zA-Z0-9_]+)\s*\}\s*from\s*["']([^"']+)["'];?/.test(content)) {
      content = content.replace(/export\s*\{\s*default\s+as\s+([a-zA-Z0-9_]+)\s*\}\s*from\s*["']([^"']+)["'];?/g, (m, name, src) => {
        changed = true;
        return `import _${name}_exp from "${src}";\nexport { _${name}_exp as ${name} };`;
      });
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  } catch (err) {
    console.error(`Failed to transform ${filePath}:`, err);
  }
}

function patchAllUtilsImports(rootDir) {
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== '.cache' && entry.name !== '.git') {
          walk(fullPath);
        }
      } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx') || entry.name.endsWith('.mjs'))) {
        // Skip @mui/utils internal files
        if (fullPath.includes(path.join('@mui', 'utils'))) continue;

        try {
          let content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes("'@mui/utils'") || content.includes('"@mui/utils"')) {
            content = content.replace(/import\s*\{([^}]+)\}\s*from\s*['"]@mui\/utils['"];?/g, (match, importsStr) => {
              const imports = importsStr.split(',').map(s => s.trim()).filter(Boolean);
              const lines = imports.map(imp => {
                if (imp.includes(' as ')) {
                  const parts = imp.split(/\s+as\s+/);
                  const orig = parts[0].trim();
                  const alias = parts[1].trim();
                  const cleanOrig = orig.replace(/^unstable_/, '');
                  return `import ${alias} from "@mui/utils/${cleanOrig}";`;
                } else {
                  const cleanOrig = imp.replace(/^unstable_/, '');
                  return `import ${imp} from "@mui/utils/${cleanOrig}";`;
                }
              });
              return lines.join('\n');
            });
            fs.writeFileSync(fullPath, content, 'utf8');
          }
        } catch (err) {
          console.error(`Failed to patch file ${fullPath}:`, err);
        }
      }
    }
  }
  walk(rootDir);
}

const nodeModulesDir = path.join(__dirname, '..', 'node_modules');
fixMui(nodeModulesDir);
console.log('Successfully patched all MUI packages and imports for Webpack 5 compatibility.');
