import ecoOpenings from "./eco.json";

const fenToPosition = (function () {
  function formatFen(fen) {
    // cut off end of fen string for comparison with database
    let substrings = fen.split(" w");
    return substrings.length === 1
      ? ((substrings = fen.split(" b")),
        substrings.slice(0, -1).join(" b") + " b")
      : substrings.slice(0, -1).join(" w") + " w";
  }

  const fenMap = ecoOpenings.reduce((acc, opening) => {
    acc[formatFen(opening.fen)] = opening;
    return acc;
  }, {});

  return function (fen) {
    const formattedFen = formatFen(fen);
    return fenMap[formattedFen] || null;
  };
})();

export default fenToPosition;