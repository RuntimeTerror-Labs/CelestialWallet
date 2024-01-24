const ethers = require("ethers");

const getArray = (hex) => {
  return ethers.utils.arrayify(hex);
};

function derToRS(der) {
  var offset = 3;
  var dataOffset;

  if (der[offset] == 0x21) {
    dataOffset = offset + 2;
  } else {
    dataOffset = offset + 1;
  }
  const r = der.slice(dataOffset, dataOffset + 32);
  offset = offset + der[offset] + 1 + 1;
  if (der[offset] == 0x21) {
    dataOffset = offset + 2;
  } else {
    dataOffset = offset + 1;
  }
  const s = der.slice(dataOffset, dataOffset + 32);
  return [r, s];
}

function bufferFromBase64(value) {
  return Buffer.from(value, "base64");
}

function bufferToHex(buffer) {
  return "0x".concat(
    [...new Uint8Array(buffer)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

async function getSignature(_signature) {
  const signatureParsed = await derToRS(bufferFromBase64(_signature));

  const signature = ethers.BigNumber.from(
    bufferToHex(signatureParsed[0]) + bufferToHex(signatureParsed[1]).slice(2)
  );

  return signature;
}

module.exports = {
  getArray,
  getSignature,
};
