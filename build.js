const dotenv = require('dotenv')

dotenv.config()

const version = (process.env.VERSION || 'v1.0.0').slice(1)

module.exports = {
  appId: 'atrepalin.JupyterConverter',
  productName: 'JupyterConverter',
  directories: {
    buildResources: 'resources'
  },
  extraResources: [
    {
      from: 'resources/extra',
      to: '.'
    }
  ],
  nsis: {
    oneClick: false,
    perMachine: true,
    artifactName: '${name}-${version}-setup.${ext}',
    shortcutName: '${productName}',
    uninstallDisplayName: '${productName}',
    createDesktopShortcut: 'always'
  },
  win: {
    target: 'nsis'
  },
  extends: null,
  extraMetadata: {
    version,
    name: 'JupyterConverter'
  },
  files: [
    '!**/.vscode/*',
    '!src/*',
    '!electron.vite.config.{js,ts,mjs,cjs}',
    '!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
    '!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}'
  ],
  asarUnpack: ['resources/**'],
  appImage: {
    artifactName: '${name}-${version}.${ext}'
  }
}
