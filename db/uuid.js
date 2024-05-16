// Export a function to randomly generate a unique ID
module.exports = () => {
  const characters = "0123456789";
  let uuids = [];
  // initialize new ID
  let newId = "";
  // make each uuid a random combination of 5 characters
  for (let i = 0; i < 5; i++) {
    newId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  // confirm ID doesn't exist before creating new uuid
  if (!uuids.includes(newId)) {
    uuids.push(newId);
    return newId;
  }
};
