module.exports = app => {
    const dsforms = require("../controllers/dsform.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", dsforms.create);
  
    // Retrieve all Tutorials
    router.get("/", dsforms.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:email", dsforms.findOne);
  
    // Update a Tutorial with id
    router.put("/:email", dsforms.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", dsforms.delete);
  
    // // Create a new Tutorial
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/dsforms', router);
  };