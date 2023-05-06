// this is a server to create the chess database used in my chess tree

const express = require("express");
const ecoOpenings = require("./eco.json");
const mongoose = require("mongoose");
const https = require("https");
const { Chess } = require("chess.js");
const app = express();
const { Configuration, OpenAIApi } = require("openai");

const api_key = "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";
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/openingsDB");
const openingsSchema = new mongoose.Schema({
  name: String,
  eco: String,
  fen: String,
  moves: String,
  continuations: Array,
  information: Object,
});
const Opening = mongoose.model("Opening", openingsSchema);

// const chess = new Chess();

// function formatFen(fen) {
//   //cut off end of fen string for easier comparison
//   let substrings = fen.split(" w"); // if its white turn in fen
//   return substrings.length === 1
//     ? ((substrings = fen.split(" b")), //if its black turn in fen
//       substrings.slice(0, -1).join(" b") + " b")
//     : substrings.slice(0, -1).join(" w") + " w";
// }

// const fenToPosition = (fen) => {
//   //checks openingtree database and converts the fen to a position object
//   const formattedFen = formatFen(fen);
//   const findPosition = ecoOpenings.find(
//     (opening) => formatFen(opening.fen) === formattedFen
//   );
//   try {
//     return findPosition;
//   } catch {
//     return null;
//   }
// };

// const getNextPossiblePositions = (fen) => {
//   const newFen = fen + " - 0 1";
//   const chess = new Chess(newFen);
//   const x = chess.moves().map((move) => {
//     const chessCopy = new Chess(newFen);
//     chessCopy.move(move);
//     const position = fenToPosition(chessCopy.fen());
//     if (position) {
//       return {
//         positionName: position.name,
//         fen: position.fen,
//         move: move,
//       };
//     } else {
//       return {};
//     }
//   });
//   return x.filter((position) => !!position.positionName);
// };

// Opening.find((err, openings) => {
//   if (err) {
//     console.log(err);
//   } else {
//     openings.map((opening) => {
//       Opening.updateOne(
//         { name: opening.name },
//         { continuations: getNextPossiblePositions(opening.fen) },

//         function (err, doc) {
//           if (err) {
//             console.log("couldnt update");
//           } else {
//           }
//         }
//       );
//     });
//   }
// });

const configuration = new Configuration({
  apiKey: api_key,
});
const openai = new OpenAIApi(configuration);

async function updateDatabase() {
  // Retrieve the documents from the collection
  const documents = await Opening.find();

  // Iterate over the documents
  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    if (doc.information.length < 40) {
      // Make the API call
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt:
            "please give me some historic and game related information about the chess opening " +
            doc.name,
          temperature: 0,
          max_tokens: 220,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        // Clean the response text
        const cleanText = response.data.choices[0].text.replace(/\n/g, "");
        console.log("updated text for " + doc.name + " : " + cleanText);

        // Update the document
        await Opening.updateOne(
          { _id: doc._id },
          { $set: { information: cleanText } }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
}

updateDatabase();

app.get("/", function (req, res) {
  res.send(
    "this is a server to create the chess database used in my chess tree"
  );
});
