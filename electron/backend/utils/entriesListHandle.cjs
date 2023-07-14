
const parseEntriesList = (entriesList) => {
  return entriesList.map((entry) => {
    return { name: entry.name, isDirectory: entry.isDirectory() };
  });
};

module.exports = { parseEntriesList };