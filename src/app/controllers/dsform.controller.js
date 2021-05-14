const db = require("../models");
const DSForm = db.dsforms;

// create and save new entry
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email){
        res.status(400).send({ message: "No content provided."});
        return;
    }

    // create form
    const dsform = new DSForm({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        date: req.body.date,
        email: req.body.email,
        location: req.body.location
    });
    console.log(`*** New Entry ***`)
    console.log(`First Name: ${req.body.firstName}`)
    console.log(`Last Name: ${req.body.lastName}`)
    console.log(`Date: ${req.body.date}`)
    console.log(`Email: ${req.body.email}`)
    console.log(`Location: ${req.body.location}`)
    console.log(`*** ------ ***`)

    // save form in db
    dsform
        .save(dsform)
        .then(data => {
            res.send(data);
            console.log(res);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occured while creating the form."
            });
        });
};

// Retrieve all forms from the db
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? {email: {$regex: new RegExp(email), $options: "i"}}: {};

    DSForm.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occurred while retrieving form."
        });
    });
};

// Find a single form
exports.findOne = (req, res) => {
    const email = req.params.email;

    DSForm.findById(email)
    .then(data => {
        if (!data)
          res.status(404).send({ message: "Unable to find email " + email });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: err.message || "Error retrieving Tutorial with email=" + email });
      });
};

// Update a form
exports.update = (req, res) => {

};

// Delete a form
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(req);

    DSForm.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete reservation under ${email}`
            });
        } else {
            res.send({
                message: `Successfully deleted reservation under ${email}`
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: `Cannot delete reservation under ${email}, error: ${err}`
        })
    })
};

// Delete all forms
exports.deleteAll = (req, res) => {

};

