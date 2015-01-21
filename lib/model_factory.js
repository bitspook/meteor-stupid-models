/**
 * Model factory which should be used for creating new models
 */

function SmartModel() {};
SmartModel.prototype = BaseModel;

Model = function(collection) {
  function ChildModel() {}; //by using 'new' below, we avoid adding methods to BaseModel object
  ChildModel.prototype = new SmartModel; //because a new instance is created, creating a new object
  //while still maintaining the link to inherited methods. This is the trick to avoiding conflicts.


  ChildModel.extend = function(methods) {
    _.extend(ChildModel.prototype, methods, methods.defaultValues); //methods not added 2 BaseModel
    ChildModel.prototype.defaultValues = null;
    ChildModel.prototype.collection = collection;
  };

  collection._transform = function(doc) {
    var instance = new ChildModel; //instance methods will be linked to ChildModel's prototype
    _.extend(instance, doc); //shared ChildModel.prototype will not be overwritten because of 'new'
    return instance; //however, chain lookup will be efficiently utilized if property not found ;)
  };

  return  ChildModel; //usage: 'new ChildModel'; inherited methods linked via prototype above
};
