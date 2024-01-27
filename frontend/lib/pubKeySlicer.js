const pubKeySlicer = (pubKey) => {
  return pubKey.slice(0, 6) + "..." + pubKey.slice(-4);
};

export default pubKeySlicer;
