const mongoose = require('mongoose');
const { Schema } = mongoose;
const Item = require('./item');
const Pricelist = require('./pricelist');
const ItemSchema = Item.schema;
const PricelistSchema = Pricelist.schema;

const PricelistItemSchema = new Schema ({
  //id: { type: Number },
  item: { type: ItemSchema, required: true},
  pricelist: { type: PricelistSchema, required: true},
  priceH: { type: Number, required: true},
  priceD: { type: Number, required: true},
  priceM: { type: Number, required: true},
  priceA: { type: Number, required: true}
});

module.exports = {
  schema: PricelistItemSchema,
  model: mongoose.model('PricelistItem', PricelistItemSchema)
}

//module.exports = mongoose.model('PricelistItem', PricelistItemSchema);
