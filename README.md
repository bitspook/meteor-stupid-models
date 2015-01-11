#meteor-smart-models

**Credits**: Most of the work (BaseModel) in this package is done by James Gillmore (@facespacey) and Matheus Simons (@matheus90). I just happened to not like code-rewriting and the weird way we were using models, and so I abstracted out this package with an interface I like.

### Why this name?
Because I am feeling smart nowadays =( *[Thu Jul 24 16:39:40 2014]*

### Why this package?
Meteor is cool. Mongo is awesome. But Models in MVC frameworks are great at code re-usability. This package makes it easy to get rid of helpers and shit and push more code into models. It allows to write reusable to great extent. 

### How to install?
```sh
mrt install smart-models
```

## How to use?
Just create a collection, pass it to `Model(collection_name)` and use `Model.extend({})` to write reusable code.
```javascript
Todos = new Meteor.Collection("todos");
TodoModel = Model(Todos);

TodoModel.extend({
 defaultValues: {
   //object containing default values you want to put on new documents
 },
 method_1_to_n: function() {
   //define any number of methods which you can use anywhere: both on client and server, in templates, helpers etc. Examples below
 },
 getTitle: function() {
   // use it as
   // var todo = Todos.findOne();
   // var title = todo.getTitle();
   // of course todo.title will work as well
   return this.title; 
 },
 setTitle: function(title) {
   //update works little different than MongoCursor.update. You'll figure it out when you use it
   this.update({title: title})
   return this;
 }
});
```

### API
Explore it. Or look into `lib/base_mode.js`. Just create an app, create a model and explore the API. Hint: most collection methods like `save()` (to save a model/document), `update()` (to well, update a doc; it works little different though; different in a good way), `persist()` (to persist doc locally without sending it to server) etc are available. Just explore the TodoModel object in above example in dev Console.

Ok, let me give you some examples:  

* **Create a Model aka Convert collection to model**
  ```javascript
      Todos = new Meteor.Collection("todos");
      Todo = Model(Todos);
  ```
* **Add default values for new todos**
  ```js
    Todo.extend({
        defaultValues: {
          title: "Please give a title"
        }
    })
  ```
* **Add helper functions to model**
  ```js
    Todo.extend({
        defaultValues: {
          //explained above
        },
        getTitle: function() {
        
        }
    })
  ```


###NOTE:
This package doesn't do some magic or add extra functionality to collections. It just make it easy and obvious to write re-usable code and provide some helpers like `save()`, `update()` to make your lives easier. So basically it aims to improve code re-usability and readability and it does a fairly good job in it.
