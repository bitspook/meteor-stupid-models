/**
 * Model factory which should be used for creating new models
 */
Model = function(collection) {
    var model = function StupidModel() {
        BaseModel.apply(this);
        this.collection = function() {
            return collection;
        };

        return this;
    };
    model.extend = function(obj) {
        _.extend(this.prototype, obj);
    };

    collection._transform = function(doc) {
        var stupidModel = new model(doc);
        _.extend(stupidModel, doc);
        return stupidModel;
    };

    return  model;
};
