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

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **N.B.** Everything pre-`v0.0.3-alpha.0` is gone at the current moment. This
> is due to us moving to a new changelog format. We will add the logs back if we
> have time, but we don't right now.

---

## [v0.1.0-beta.2]

### ✨ Features

- custom links can now be created with the web ui. (67aa28a)
- link redaction now supported. (429d271)

### 🐛 Bug Fixes

- prevent "unknown error" from happening as often with checking if the resulting
  data is successful or not before setting the value (73f97dd)
- login status is checked before allowing link generation (645787e)
- shortening long urls containing the base domain are now rejected (c2a1815)

## [v0.1.0-beta.1]

### ✨ Features

- logging in with github now supported! (b6ffc06)
- check link metadata with `GET /api/link` (57a51dc)
- progressively enhanced main form (e43a39c)

### 🐛 Bug Fixes

- improved monitoring in production by logging error and the id in the same
  message (88a7073)
- checking for valid http urls now return a proper error if it's not a valid url
  (a67432f)
- a success status is returned for successful requests to the api. (779da35)

### 📦 Dependencies

- add lucia and arctic for authentication (eed4f62)

## [v0.1.0-beta.0]

### ✨ Features

- users are now actually redirected to the correct destination when using a
  short link (c71cd69)

### 🐛 Bug Fixes

- added missing color `light-red` causing some text to not have proper colors
  (3e82916)
- use an average of the minimum and maximum link length as the default to
  prevent invalid values when hardcoding (55a6044)
- (**server**) fixed shorthand endpoint (/) not returning a proper error
  response (9ca4447)
- (**server**) also log error id on internal server errors (bb57556)

### 📦 Dependencies

- bumped everything (20ac7dd)

## [v0.0.4-alpha.0]

### ✨ Features

- handle logging levels at run-time via the `DEBUG` environment variable
  (d930837)
- automatically migrate the database on server hook setup (f3c5cbe)
- jwk reading is now implemented, which enables the following POC (5cd756f)
- POC link generation implemented (48e03ce)
- quick link generation by POSTing to `/` (d1276a9)
- (**server**) validate if the destination url is a valid https url before
  proceeding (a41415f)
- (**server**) shortlink collision checks (0eb8d7c)
- (**server**) add jwt token checks (9b9ab43)

### 🧩 Components

- removed essentially every overcomplicated component and modules (857ebc4)
- overhauled design for navlink and nav (f77288c, 5c5be43)
- overhauled design for homepage (b451644)
- added code (55085c4), heading (6578523) and link (5a58850)

### 🖧 Database Schema

- added initial schema (d7f24f9)

### 📦 Dependencies

- bumped everything (81b5a2b)
- cleaned up dependencies and add unocss (c373f29)
- added jose for jwt operations (e9742a8)
- added zod for json schema checking (d3bc588)
- (**dev**) added dotenv for drizzle config (1fc3f7a)
- (**dev**) added vitest for unit testing (59a50f1)

## [v0.0.3-alpha.2]

> [!CAUTION]
>
> This release is scrapped, please do **NOT** use it.

### ✨ Features

- replaced @primer/octicons with unplugin-icons, which reduces bundle size
  (cf42928)
- added every existing item for a rewrite (80fe832)

### 📦 Dependencies

- added pino for logging (cd8d27e)

## [v0.0.3-alpha.1]

### 💥 BREAKING CHANGES 💥

- Prisma is dropped in favor of Drizzle ORM. In the unlikely event that you
  already have a server setup, you will likely need to purge everything in your
  db.

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

[Unreleased]: https://patchy.soopy.moe/cassie/shortify/compare/v0.1.0-beta.2...HEAD
[v0.1.0-beta.2]: https://patchy.soopy.moe/cassie/shortify/compare/v0.1.0-beta.1...v0.1.0-beta.2
[v0.1.0-beta.1]: https://patchy.soopy.moe/cassie/shortify/compare/v0.1.0-beta.0...v0.1.0-beta.1
[v0.1.0-beta.0]: https://patchy.soopy.moe/cassie/shortify/compare/v0.0.4-alpha.0...v0.1.0-beta.0
[v0.0.4-alpha.0]: https://patchy.soopy.moe/cassie/shortify/compare/v0.0.3-alpha.2...v0.0.4-alpha.0
[v0.0.3-alpha.2]: https://patchy.soopy.moe/cassie/shortify/compare/v0.0.3-alpha.1...v0.0.3-alpha.2
[v0.0.3-alpha.1]: https://patchy.soopy.moe/cassie/shortify/compare/v0.0.3-alpha.0...v0.0.3-alpha.1
[v0.0.3-alpha.0]: https://patchy.soopy.moe/cassie/shortify/compare/v0.0.2-alpha.0...v0.0.3-alpha.0
