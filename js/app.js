import { setStorage } from "./storage.js";
import { getFilterStringForHexValue, setHTMLTitle } from "./utils/utils.js";
import { CHARACTERS, QUOTES } from "./data.js";
// CONSTANTES ------------------------------------------------------------------
const APPNAME = "Tortues Ninja - Punchlines";
// FONCTIONS -------------------------------------------------------------------
const getCharacterNameById = (characterId) => {
  let name = '';
  CHARACTERS.forEach(character => {
    if (character.id == characterId) {
      name = character.name;
    }
  });
  return name;
}
const getCharacterById = (characterId) => {
  let toReturn = {
    id: 1,
    name: 'Shredder',
    image: 'shredder',
    color: '#41105d',
  };
  CHARACTERS.forEach(character => {
    if (character.id == characterId) {
      toReturn = character;
    }
  });
  return toReturn;
}
const getCharacterImgById = (characterId) => {
  const character = getCharacterById(characterId);
  return `<img class="character-image" style="--border-color: ${character.color};" src="./medias/images/characters/${character.image}.png" />`;
}

const getQuoteById = (quoteId) => {
  let toReturn = {
    id: 1,
    character_id: 1,
    quote: `"Espèce d'accident génétique !"`,
    season: '2',
    episode: '5',
    timer: '00:07:12',
  };
  QUOTES.forEach(quote => {
    if (quote.id == quoteId) {
      toReturn = quote;
    }
  });
  return toReturn;
}
// INTERACTIONS UTILISATEUR ----------------------------------------------------
let isPlaying = false;
const theme = new Audio(`./medias/audio/theme.mp3`);
const onPlayClick = (quoteId) => {
  if (quoteId == 0) {
    if (theme.paused) {
      theme.play();
    } else {
      theme.pause();
    }
  } else {
    if (!isPlaying) {
      isPlaying = true;
      const quote = getQuoteById(quoteId);
      const character = getCharacterById(quote.character_id);
      let button = document.getElementById('play' + quoteId + '');
      button.innerHTML = `<img class="play-pause-icon" src="./medias/images/font-awsome/volume-high-solid.svg" style="filter: ${getFilterStringForHexValue(character.color)}; transform: scale(.5);" />`
      const audio = new Audio(`./medias/audio/${quoteId}.mp3`);
      audio.play();
      audio.onended = (event) => {
        button.innerHTML = `<img class="play-pause-icon" src="./medias/images/font-awsome/circle-play-solid.svg" style="filter: ${getFilterStringForHexValue(character.color)};" />`;
        isPlaying = false;
      };
    }
  }
}
window.onPlayClick = onPlayClick;

// DOM GENERATION --------------------------------------------------------------
const getQuoteTile = (quote) => {
  const character = getCharacterById(quote.character_id);
  return `
  <div class="quote-tile">
    <p>${quote.quote}</p>
    
    <div class="quote-bonus">
    <button id="play${quote.id}" onclick="onPlayClick(${quote.id})" class="play-pause-button play"><img class="play-pause-icon" src="./medias/images/font-awsome/circle-play-solid.svg" style="filter: ${getFilterStringForHexValue(character.color)};" /></button>
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
  <img class="main-logo" src="./medias/images/logo_tmnt.png" onclick="onPlayClick(0)" />
  ${getQuoteTiles()}
  <div class="blank"></div>
`;
