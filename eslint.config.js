// Flat config for ESLint v9, equivalent to `extends: "next/core-web-vitals"`
// Uses FlatCompat to bridge legacy shareable config

const { FlatCompat } = require('@eslint/eslintrc')
const path = require('path')

const compat = new FlatCompat({ baseDirectory: __dirname })

module.exports = [
  // Ignore common build artifacts
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.turbo/**'],
  },

  // Bring in Next.js recommended + Core Web Vitals rules
  ...compat.extends('next/core-web-vitals'),
]
