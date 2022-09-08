import "isomorphic-fetch";
import { nanoid } from "nanoid";
import { METAFIELD_NAMESPACE } from "../../../constants";
import { PRODUCT_METAFIELD_CREATE } from "../../../graphql";
import { generateShopifyProductGid } from "../../../utilities/metafields";

//new added
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://markbroadwater:cagrX4lpha@socialcluster.n7moi1i.mongodb.net/test",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
//create data schema
const notesSchema = {
  title: String,
  content: String,
};
const Note = mongoose.model("Note", notesSchema);
app.post("/", function (req, res) {
  let newNote = new Note({
    title: productId,
    content: rating,
  });
  newNote.save();
  //res.redirect("/");
});
//end of new added

export const addReview = async (client, payload) => {
  const {
    product_id: productId,
    review: { rating, author, email, title, body },
  } = payload;

  // We need to validate and sanitize the user input
  const review = {
    id: nanoid(),
    rating,
    title,
    body,
    name: author,
    email,
    created_at: new Date(),
    state: "unpublished",
  };

  // Create metafield for the draft review and attach it to the given product
  await client.mutate({
    mutation: PRODUCT_METAFIELD_CREATE,
    variables: {
      input: {
        id: generateShopifyProductGid(productId),
        metafields: [
          {
            key: review.id,
            namespace: METAFIELD_NAMESPACE.privateReviews,
            value: JSON.stringify(review),
            type: "json",
          },
        ],
      },
    },
  });
};
