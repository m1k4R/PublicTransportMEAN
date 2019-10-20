const mongoose = require('mongoose');
const { Schema } = mongoose;

const PricelistSchema = new Schema ({
  //id: { type: Number },
  from: { type: Date, required: true},
  to: { type: Date, required: true},
  active: { type: Boolean}
});

module.exports = {
  schema: PricelistSchema,
  model: mongoose.model('Pricelist', PricelistSchema)
}

//module.exports = mongoose.model('Pricelist', PricelistSchema);
