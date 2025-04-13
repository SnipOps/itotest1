const openAIKey = "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"; // À remplacer par votre clé API

let chiffres = [];
let nombreJoueurs = 0;

function getNombreAleatoire() {
  return Math.floor(Math.random() * 100) + 1;
}

async function generateThemeWithAI() {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: "Génère un thème original et simple pour un jeu où les joueurs doivent trouver des mots correspondants. Le thème doit être en français, très simple et compréhensible par tous. Réponds uniquement avec le thème, sans commentaires ni ponctuation finale. Exemples: 'Animal mignon', 'Métier dangereux', 'Nourriture sucrée'"
        }],
        temperature: 0.9,
        max_tokens: 20
      })
    });

    const data = await response.json();
    let theme = data.choices[0].message.content.trim();
    // Nettoyage du résultat
    theme = theme.replace(/^["']|["']$/g, '').replace(/\.$/, '');
    return theme || "Thème aléatoire";
  } catch (error) {
    console.error("Erreur avec l'API OpenAI:", error);
    // Thèmes de secours
    const backupThemes = [
      "Animal mignon",
      "Métier rigolo",
      "Nourriture étrange",
      "Film à revoir",
      "Endroit de rêve",
      "Objet utile",
      "Couleur vive",
      "Chose qu'on trouve à l'école"
    ];
    return backupThemes[Math.floor(Math.random() * backupThemes.length)];
  }
}

async function nouveauTheme() {
  const themeElement = document.getElementById("theme");
  themeElement.textContent = "Chargement...";
  
  const theme = await generateThemeWithAI();
  themeElement.textContent = theme;
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

// Générer un premier thème au chargement
document.addEventListener('DOMContentLoaded', nouveauTheme);
