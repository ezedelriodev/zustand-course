# Sistema de Formateo y Linting

## 📋 Resumen

Este proyecto está configurado con **ESLint** para linting y **Prettier** para formateo automático de código.

## ✅ Configuración Implementada

### 1. **Formateo automático al guardar**

- Al guardar cualquier archivo `.ts`, `.tsx`, `.css` o `.json`, Prettier formateará automáticamente el código
- Configurado en `.vscode/settings.json`

### 2. **ESLint integrado con Prettier**

- ESLint verifica errores de código y estilo
- Prettier se ejecuta como regla de ESLint para evitar conflictos
- Configurado en `eslint.config.js`

### 3. **Reglas de formateo**

Las reglas están definidas en `.prettierrc`:

```json
{
  "semi": false, // Sin punto y coma
  "singleQuote": true, // Comillas simples
  "tabWidth": 2, // 2 espacios de indentación
  "trailingComma": "es5", // Comas finales donde ES5 lo permite
  "printWidth": 100, // Ancho máximo de línea: 100 caracteres
  "arrowParens": "always", // Paréntesis en arrow functions
  "bracketSpacing": true, // Espacios en objetos: { foo: bar }
  "jsxSingleQuote": false // Comillas dobles en JSX
}
```

## 🚀 Scripts Disponibles

```bash
# Ejecutar linting (solo verificar)
npm run lint

# Ejecutar linting y corregir automáticamente
npm run lint:fix

# Formatear todo el código
npm run format

# Verificar si el código está formateado correctamente
npm run format:check
```

## 🔧 Extensiones de VS Code Requeridas

```vscode-extensions
esbenp.prettier-vscode,dbaeumer.vscode-eslint
```

Estas extensiones están configuradas como recomendadas. VS Code te sugerirá instalarlas automáticamente.

## 📁 Archivos de Configuración

- `.prettierrc` - Reglas de formateo de Prettier
- `.prettierignore` - Archivos ignorados por Prettier
- `eslint.config.js` - Configuración de ESLint
- `.vscode/settings.json` - Configuración de VS Code para el workspace
- `.vscode/extensions.json` - Extensiones recomendadas

## ⚙️ Cómo Funciona

1. **Al guardar un archivo**:
   - VS Code ejecuta Prettier para formatear el código
   - ESLint corrige automáticamente los problemas que puede resolver

2. **En tiempo real**:
   - ESLint muestra errores y advertencias en el editor
   - Las líneas con problemas se subrayan

3. **Antes de commit** (recomendado):
   - Ejecutar `npm run lint:fix` para corregir problemas
   - Ejecutar `npm run format` para formatear todo

## 🎯 Reglas de ESLint Personalizadas

```javascript
// Variables no usadas comenzando con _ no generan advertencia
const _unusedVar = 'ok'

// 'any' genera advertencia (no error)
const data: any = {} // ⚠️ advertencia

// Componentes deben ser exportados correctamente
export const MyComponent = () => {} // ✅
```

## 🔍 Verificación Manual

Si quieres verificar manualmente que todo funciona:

1. Abre cualquier archivo `.tsx`
2. Escribe código mal formateado (sin sangría, sin espacios, etc.)
3. Guarda el archivo (Ctrl+S)
4. El código debería formatearse automáticamente

## 🐛 Solución de Problemas

### El formateo no funciona al guardar

1. Verifica que la extensión Prettier esté instalada y habilitada
2. Revisa que `.vscode/settings.json` exista y tenga la configuración correcta
3. Reinicia VS Code

### ESLint no muestra errores

1. Verifica que la extensión ESLint esté instalada
2. Abre la salida de ESLint: Ver > Output > ESLint
3. Reinicia el servidor de ESLint: Command Palette > "ESLint: Restart ESLint Server"

### Conflictos entre ESLint y Prettier

- No deberían existir gracias a `eslint-config-prettier`
- Si aparecen, verifica que `eslint.config.js` incluya `prettierConfig` al final
