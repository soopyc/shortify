<!-- Template for a new:tm: release
## [Unreleased]
<!-- ### 💥 BREAKING CHANGES 💥
### ✨ Features
### 🐛 Bug Fixes
### 🧩 Components
### 📖 Documentation
### 🖧 Database Schema
### 🛠️ Utilities
### 📦 Dependencies  -->

-->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **N.B.** Everything pre-`v0.0.3-alpha.0` is gone at the current moment. This is due to us
> moving to a new changelog format. We will add the logs back
> if we have time, but we don't right now.

---

## [Unreleased]

### ✨ Features

- replaced @primer/octicons with unplugin-icons, which reduces bundle size (cf42928)

<!-- ### 💥 BREAKING CHANGES 💥
### 🐛 Bug Fixes
### 🧩 Components
### 📖 Documentation
### 🖧 Database Schema
### 🛠️ Utilities
### 📦 Dependencies  -->

## [v0.0.3-alpha.1]

### 💥 BREAKING CHANGES 💥

- Prisma is dropped in favor of Drizzle ORM. In the unlikely event that you already have a server setup, you will
  likely need to purge everything in your db.

### 📦 Dependencies

- migrate to sveltekit 2 (7ecea47)
- drop prisma and add drizzle (2402942)

### 🛠️ Utilities

- add jwt_generate.js utility (f2746ae)

## [v0.0.3-alpha.0]

### 💥 BREAKING CHANGES 💥

- rewrote the entire site. (df285e8)

### ✨ Features

- added initial index page layout (df3c1e7)

### 🧩 Components

- added an intro component (19a85ec)
- added the navLink component (caacd77)
- **nav**
  - tweak style (7622ed8)
  - set default app_color (798cd54)

### 📦 Dependencies

- upgraded dependencies (please see the following commit) (df3c1e7)

[Unreleased]: https://patchy.soopy.moe/cassie/shortify/compare/v0.0.3-alpha.1...HEAD
[v0.0.3-alpha.1]: https://patchy.soopy.moe/cassie/shortify/compare/v0.0.3-alpha.1...v0.0.3-alpha.0
[v0.0.3-alpha.0]: https://patchy.soopy.moe/cassie/shortify/compare/v0.0.3-alpha.0...v0.0.2-alpha.0
