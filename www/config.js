System.config({
  baseURL: "/app",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*"
  },

  map: {
    "require": "github:requirejs/requirejs@2.2.0"
  }
});
