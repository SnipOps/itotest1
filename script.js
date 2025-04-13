const themes = [
  "Animal mignon",
  "Animal effrayant",
  "Animal lent",
  "Animal rapide",
  "Animal bruyant",
  "Métier difficile",
  "Métier dangereux",
  "Métier rigolo",
  "Métier fatigant",
  "Métier que je voudrais faire",
  "Nourriture préférée",
  "Nourriture détestée",
  "Nourriture sucrée",
  "Nourriture salée",
  "Nourriture étrange",
  "Sport d'équipe",
  "Sport individuel",
  "Sport facile",
  "Sport difficile",
  "Sport dangereux",
  "Objet utile",
  "Objet inutile",
  "Objet dangereux",
  "Objet lourd",
  "Objet léger",
  "Film triste",
  "Film drôle",
  "Film d'action",
  "Film ennuyeux",
  "Film à revoir",
  "Musique calme",
  "Musique forte",
  "Musique qui me fait danser",
  "Musique pour dormir",
  "Musique joyeuse",
  "Endroit bruyant",
  "Endroit calme",
  "Endroit dangereux",
  "Endroit de rêve",
  "Endroit chaud",
  "Personne célèbre",
  "Personne drôle",
  "Personne effrayante",
  "Personne que j’admire",
  "Personne en colère",
  "Moment de la journée",
  "Jour de la semaine",
  "Mois de l’année",
  "Saison préférée",
  "Saison froide",
  "Couleur chaude",
  "Couleur froide",
  "Couleur vive",
  "Couleur pastel",
  "Couleur foncée",
  "Vêtement confortable",
  "Vêtement chic",
  "Vêtement chaud",
  "Vêtement froid",
  "Accessoire de mode",
  "Chose qu’on trouve à l’école",
  "Chose qu’on trouve à la maison",
  "Chose qu’on trouve dans la rue",
  "Chose qu’on trouve à la plage",
  "Chose qu’on trouve dans la cuisine",
  "Odeur agréable",
  "Odeur désagréable",
  "Goût sucré",
  "Goût amer",
  "Goût acide",
  "Invention utile",
  "Invention inutile",
  "Invention du futur",
  "Invention du passé",
  "Invention bizarre",
  "Émotion positive",
  "Émotion négative",
  "Émotion forte",
  "Émotion silencieuse",
  "Émotion difficile à expliquer",
  "Personnage de film",
  "Personnage de dessin animé",
  "Super-héros",
  "Méchant célèbre",
  "Personnage historique",
  "Animal domestique",
  "Animal sauvage",
  "Animal imaginaire",
  "Animal aquatique",
  "Animal volant",
  "Jeu vidéo connu",
  "Jeu de société",
  "Jeu d’enfance",
  "Jeu sportif",
  "Jeu bruyant",
  "Chanson connue",
  "Instrument de musique",
  "Langue étrangère",
  "Mot compliqué",
  "Mot drôle"
];




let chiffres = [];
let nombreJoueurs = 0;

function getNombreAleatoire() {
  return Math.floor(Math.random() * 100) + 1;
}

function nouveauTheme() {
  const theme = themes[Math.floor(Math.random() * themes.length)];
  document.getElementById("theme").textContent = theme;
}

function initialiserPartie() {
  nombreJoueurs = parseInt(prompt("Combien de joueurs ? (entre 2 et 10)", "4"));
  if (isNaN(nombreJoueurs) || nombreJoueurs < 2 || nombreJoueurs > 10) {
    alert("Veuillez entrer un nombre valide entre 2 et 10.");
    return;
  }

  const container = document.getElementById("players-container");
  container.innerHTML = "";
  chiffres = [];

  for (let i = 0; i < nombreJoueurs; i++) {
    const chiffre = getNombreAleatoire();
    chiffres.push({ value: chiffre, visible: false });

    const div = document.createElement("div");
    div.className = "player";

    const titre = document.createElement("h3");
    titre.textContent = `Joueur ${i + 1}`;

    const chiffreEl = document.createElement("p");
    chiffreEl.textContent = "???";
    chiffreEl.id = `chiffre-${i}`;

    const boutonVoir = document.createElement("button");
    boutonVoir.textContent = "Voir mon chiffre";
    boutonVoir.onclick = () => {
      chiffres[i].visible = true;
      chiffreEl.textContent = chiffres[i].value;
    };

    const boutonCacher = document.createElement("button");
    boutonCacher.textContent = "Cacher mon chiffre";
    boutonCacher.onclick = () => {
      chiffres[i].visible = false;
      chiffreEl.textContent = "???";
    };

    div.appendChild(titre);
    div.appendChild(chiffreEl);
    div.appendChild(boutonVoir);
    div.appendChild(boutonCacher);
    container.appendChild(div);
  }

  nouveauTheme();
}
