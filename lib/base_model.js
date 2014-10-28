BaseModel = function(){
    this.errors = {};

    this.collection = function(name) {
        throw Error("Not Implemented");
    };
    this.db = function() {
        if(this._local) return this.collection()._collection;
        else return this.collection();
    };
    this.persist = function() {
        this.db().remove(this._id);
        delete this._local;
        delete this._id;
        this.save();
    };
    this.store = function() {
        this._local = true;
        this.save();
    };
    this.save = function(cb) {
        var attributes = this.getMongoAttributes();
        return this._upsert(attributes, cb);
    };
    this._upsert = function(attributes, cb) {
        if(this._id) return this.update(attributes, cb);
        else return this.insert(attributes, cb);
    };
    this.insert = function(attributes, cb) {
        attributes = this.prepareDefaults(attributes);
        this._id = this.db().insert(attributes, cb);
        this.refresh();

        return this._id;
    };
    this.update = function(attributes, cb) {
        this.db().update(this._id, {$set: attributes}, cb);
        this.refresh();

        return this._id;
    };
    this.increment= function(attVal) {
        this.db().update(this._id, {$inc: attVal});
        this.refresh();

        return this._id;
    };
    this.push = function(attVal) {
        this.db().update(this._id, {$push: attVal});
    };
    this.pop = function(att) {
        this.db().update(this._id, {$pop: {att: 1}});
    };
    this.shift = function(att) {
        this.db().update(this._id, {$pop: {att: -1}});
    };
    this.remove = function() {
        this.db().remove(this._id);
    };
    this.refresh = function(){
        this.extend(this.collection().findOne(this._id));
    };
    this.prepareDefaults = function(attributes){
        var object = {};
        _.extend(object, this.defaultValues, attributes);
        return object;
    };
    this.getMongoAttributes = function(includeId) {
        var mongoValues = {};
        for(var prop in this) {
            if(this.isMongoAttribute(prop)) mongoValues[prop] = this[prop];
        }

        if(includeId) mongoValues._id = this._id;

        return mongoValues;
    };
    this.isMongoAttribute = function(prop) {
        if(_.isFunction(this[prop])) return false;
        if(prop == '_id' || prop == 'errors' || prop == 'defaultValues' || prop == 'collectionName') return false;
        return true;
    };
    this.time = function(field) {
        return moment(this[field]).format("MM/DD - h:mma");
    };
    this.extend = function(doc) {
        doc = doc != undefined && _.isObject(doc) ? doc : {};

        _.extend(this, doc);
    };

    this.delete = function(noAfterDelete) {
        this.db().remove(this._id);
        if(this.afterDelete && !noAfterDelete) this.afterDelete();
    };

    return this;
};
