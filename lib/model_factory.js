/**
 * Model factory which should be used for creating new models
 */

Model = function(collection) {
  var model = function SmartModel() {
    this.collection = function() {
      /**
       * This method is used in BaseModel for getting the collection to operate on
       */
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
    var smartModel = new model(doc);
    _.extend(smartModel, doc);
    return smartModel;
  };

  return  model;
};
