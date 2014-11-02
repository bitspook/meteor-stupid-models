/**
 * Model factory which should be used for creating new models
 */

Model = function(collection) {
  var model = function StupidModel() {
    this.collection = function() {
      return collection;
    };

    return this;
  };

  model.prototype = BaseModel;

  model.extend = function(obj) {
    _.extend(this.prototype, obj);
    obj.defaultValues && _.extend(this.prototype, obj.defaultValues);
    if(this.prototype.defaultValues) this.prototype.defaultValues = null;
  };

  collection._transform = function(doc) {
    var stupidModel = new model(doc);
    _.extend(stupidModel, doc);
    return stupidModel;
  };

  return  model;
};
