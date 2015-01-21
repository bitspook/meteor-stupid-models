Package.describe({
  name: "channikhabra:stupid-models",
  summary: "MVC like models in meteor",
  version: "0.0.6",
  git: "https://github.com/channikhabra/meteor-stupid-models.git"
});

Package.on_use(function (api, where) {
  api.versionsFrom("METEOR@0.9.1");
  api.use(["underscore"]);

  api.add_files([
    'lib/base_model.js',
    'lib/model_factory.js',
  ], ['client', 'server']);
  api.export && api.export(['Model'], ['client', 'server']);
});
