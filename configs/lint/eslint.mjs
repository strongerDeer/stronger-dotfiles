/**
 * ESLint 기본 설정 템플릿 (dotfiles base)
 * - project-init 실행 시 프로젝트 루트에 eslint.config.mjs로 복사됨
 * - 프로젝트에 맞게 rules 추가/수정 가능
 *
 * 필수 패키지:
 * npm install -D eslint typescript-eslint @eslint/js \
 *   eslint-plugin-react eslint-plugin-react-hooks \
 *   eslint-plugin-import eslint-plugin-simple-import-sort \
 *   eslint-plugin-prettier eslint-config-prettier
 */
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'prettier/prettier': 'error',

      // React
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-key': 'error',
      'react/prop-types': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import 정렬
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^react-dom'],
            ['^@?\\w'],
            ['^@/'],
            ['^\\.'],
            ['^.+\\u0000$'],
            ['^.+\\.s?css$', '^.+\\.(png|jpg|jpeg|gif|svg)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/no-default-export': 'error',

      // 미사용 변수
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-empty-object-type': 'off',

      // 일반
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },

  // Storybook / 타입 선언 파일은 default export 허용
  {
    files: ['**/*.stories.{ts,tsx}', '**/*.d.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },

  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'storybook-static/**',
      '.storybook/**',
      '*.config.{js,ts,mjs,cjs}',
      'scripts/**',
      '**/*.d.ts',
    ],
  }
);
