Package.describe({
    summary: "MVC like models in meteor"
});

Package.on_use(function (api, where) {
    api.use([]);

    api.add_files([
        'lib/base_model.js',
        'lib/model_factory.js',
    ], ['client', 'server']);
    api.export && api.export(['Model'], ['client', 'server']);
});
