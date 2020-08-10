module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }}],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@config": "./src/config",
        "@container": "./src/container",
        "@infra": "./src/infra",
        "@modules": "./src/modules",
        "@utils": "./src/utils",
        "@errors": "./src/errors"
      }
    }],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": true}]
  ]
}
