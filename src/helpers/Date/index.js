export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth() + 1]; // + 1 car getMonth renvoie un chiffre entre 0 et 11 donc décalage d'index (sinon un mois trop tot et janvier ne s'affiche pas)
