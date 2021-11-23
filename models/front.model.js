const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    OtherImageURL1: { type: String },
    ProductID: { type: String, required: true },
    ProductName: { type: String },
    LocalStorePrice: { type: Number },
    UPC: { type: String },
    Qty: { type: Number },
    QtyPerCase: { type: String },
    BrandName: { type: String },
    Categories: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Product", ProductSchema);
