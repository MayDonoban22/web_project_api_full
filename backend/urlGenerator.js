const urlGenerator = (string) => {
  const restrictedCharacters =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const charactersReplacements =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const specialCharactersRegExp = new RegExp(
    restrictedCharacters.split("").join("|"),
    "g"
  );

  return `http://yandex.practicum.com/${
    string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // reemplaza el espacio en blanco por -
      .replace(specialCharactersRegExp, (c) =>
        charactersReplacements.charAt(restrictedCharacters.indexOf(c))
      ) // reemplaza caracteres especiales
      .replace(/&/g, "-and-") // reemplaza & con "and"
      .replace(/[^\w\-]+/g, "") // elimina las no palabras
      .replace(/\-\-+/g, "-") // reemplaza múltiples guiones por uno solo
      .replace(/^-+/, "") // elimina - al principio de la línea
      .replace(/-+$/, "") // elimina - al final de la línea
  }`;
};

module.exports = urlGenerator;
