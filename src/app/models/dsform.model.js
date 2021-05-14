module.exports = mongoose => {
    const DSForm = mongoose.model(
      "DSForm",
      mongoose.Schema(
        {
          firstName: String,
          lastName: String,
          date: Date,
          email: String,
          location: String,
        },
        { timestamps: true }
      )
    );
  
    return DSForm;
  };