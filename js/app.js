import { setStorage } from "./storage.js";
import { setHTMLTitle } from "./utils/utils.js";
import { CHARACTERS, QUOTES } from "./data.js";
// CONSTANTES ------------------------------------------------------------------
const APPNAME = "Tortues Ninja - Punchlines";
// FONCTIONS -------------------------------------------------------------------
const getCharacterNameById = (character_id) => {
  let name = '';
  CHARACTERS.forEach(character => {
    if (character.id == character_id) {
      name = character.name;
    }
  });
  return name;
}
const getCharacterById = (character_id) => {
  let toReturn = '';
  CHARACTERS.forEach(character => {
    if (character.id == character_id) {
      toReturn = character;
    }
  });
  return toReturn;
}
const getCharacterImgById = (characterId) => {
  const character = getCharacterById(characterId);
  return `<img class="character-image" style="--border-color: ${character.color};" src="./medias/images/characters/${character.image}.png" />`;
}
// INTERACTIONS UTILISATEUR ----------------------------------------------------

// DOM GENERATION --------------------------------------------------------------
const getQuoteTile = (quote) => {
  return `
  <div class="quote-tile">
    <p>${quote.quote}</p>
    
    <div class="quote-bonus">
      <div class="quote-infos">
        <span style="font-weight: 600;">${getCharacterNameById(quote.character_id)}</span>
        <span style="margin-top: 5px; font-size: 12px;">S${quote.season} E${quote.episode} - ${quote.timer}</span>
      </div>
      ${getCharacterImgById(quote.character_id)}
    </div>
  </div>`
}
const getQuoteTiles = () => {
  let html = '';
  QUOTES.forEach(quote => {
    html += getQuoteTile(quote);
  });
  return html;
}
// EXECUTION -------------------------------------------------------------------

// Auto ----------------------------------------------------
setStorage();

const setDocumentHeight = () => {
  document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', setDocumentHeight);
setDocumentHeight();

// Manuelle ------------------------------------------------

setHTMLTitle(APPNAME);
const main = document.getElementById('main');
main.innerHTML = `
  <img class="main-logo" src="./medias/images/logo_tmnt.png" />
  ${getQuoteTiles()}
  <div class="blank"></div>
`;
