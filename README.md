# Math-solve

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```


## Node Modules Installation for Running the Website and API Locally
To run the project locally, make sure you have XAMPP (with Apache and MySQL) running, and follow these steps:

### Prerequisites
1. Install XAMPP from [XAMPP](https://www.apachefriends.org)
2. Start `Apache` and `MySQL` services in the XAMPP Control Panel.
3. Make sure you have `Node.js` and `npm` installed. You can download them from [here](https://nodejs.org/en)

### Steps to Set Up the Website

1. Clone the repository:
```sh
git clone https://github.com/MozesBence/matekos_leetcode.git
cd your-repo
```
2. Install the required modules for the website:
```sh
npm install
```

### Steps to Set Up the API

1. Navigate to the `src` folder:
```sh
cd src
```
2. Install the required modules for the API:
```sh
npm install
```

### Start the Application

Navigate back to your repository's root folder and start the frontend:
```sh
npm run dev
```
### Notes
- Ensure that `Apache` and `MySQL` are running in [XAMPP](https://www.apachefriends.org) for the backend API to connect to the database.
- Modify any configuration files (e.g., .env) if needed to match your local setup.
