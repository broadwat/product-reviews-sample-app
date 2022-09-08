import { useMutation } from "@apollo/react-hooks";
import { useCallback } from "react";
import { PRODUCT_METAFIELD_CREATE } from "../graphql";
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
//end of new added
export const useProductMetafieldCreate = () => {
  const [createProductMetafieldMutation] = useMutation(
    PRODUCT_METAFIELD_CREATE
  );

  return useCallback(
    async ({ productId, metafield }, options = {}) => {
      const mutationResult = await createProductMetafieldMutation({
        variables: { input: { id: productId, metafields: [metafield] } },
        ...options,
      });
      const { data } = mutationResult;
      const userErrors = data?.productUpdate?.userErrors;

      if (userErrors?.length) {
        throw userErrors;
      }

      return mutationResult;
    },
    [createProductMetafieldMutation]
  );
};
