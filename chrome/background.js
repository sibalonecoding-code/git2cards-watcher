// -------------------------------------------------------------------------------------------------
// background.js
//
// auteur: Âne Mou
// version: 1.0
//
// description: l'extension fait rien de bien compliqué. on utilise un timer qui démarre
// l'exécution du script toutes les x minutes définies par FREQUENCE_DU_TIMER. On lis le texte brut
// que le site nous envoie pour voir si "10/10" est écrit dedans. Si c'est le cas on envoie une
// notification (si actives) et on ouvre automatiquement un onglet sur le site (si actifs).
//
// Ne modifiez rien après le warning svp
// -------------------------------------------------------------------------------------------------


const FREQUENCE_DU_TIMER = 30	// en minutes
const NOTIFICATIONS = true		// true = envoie une notification quand les packs sont prêts
								// false = ne fait rien
const ONGLETS_AUTO = true		// true = ouvre un onglet vers le site quand les packs sont prêts
								// false = ne fait rien


// --- 🚧 Warning ---


const URL_SITE = "https://www.gil2-cards.com/ouvrir"
const URL_ICONE = "icon.png"
const NOM_TIMER = "packsChecker"
const NOM_EXTENSION = "Gil2Cards Watcher"
const ANTI_SPAM = 15
const REGEX_COMMENTAIRE = /<!--[\s\S]*?-->/g

// initialisation du timer et des événements globaux
const init = () => {
	// on s'assure qu'au moins les notifs ou les onglets auto sont actifs
	if (!NOTIFICATIONS && !ONGLETS_AUTO)
		return
	// création du timer
	const frequency = FREQUENCE_DU_TIMER > ANTI_SPAM ? FREQUENCE_DU_TIMER : ANTI_SPAM
	chrome.alarms.create(NOM_TIMER, {periodInMinutes: frequency})
	// envoie une notification de démarrage
	if (NOTIFICATIONS) {
		chrome.notifications.create({
			type: "basic",
			iconUrl: URL_ICONE,
			title: NOM_EXTENSION,
			message: "🚀 Démarrage de l'extension"
		})
	}
}

// boucle de mises à jour
const update = async () => {
	try {
	
		// récupère les infos du site et enlève les commentaires
		const response = await fetch(URL_SITE, {credentials: "include"})
		if (!response.ok) {
			if (NOTIFICATIONS) {
				chrome.notifications.create({
					type: "basic",
					iconUrl: URL_ICONE,
					title: NOM_EXTENSION,
					message: "🚧 Un problème est survenu, êtes-vous connecté?"
				})
			}
			return
		}
		const rawHtml = await response.text()
		const cleanHtml = rawHtml.replace(REGEX_COMMENTAIRE, '')
		// envoie une notification si les packs sont prêts
		if (NOTIFICATIONS && cleanHtml.includes("10/10")) {
			chrome.notifications.create({
				type: "basic",
				iconUrl: URL_ICONE,
				title: NOM_EXTENSION,
				message: "✅ Vos 10 packs sont prêts!"
			})
			if (ONGLETS_AUTO)
				chrome.tabs.create({url: URL_SITE})
		}
		
	} catch (err) {
	
		// gestion minimaliste d'une éventuelle erreur
		if (NOTIFICATIONS) {
			chrome.notifications.create({
				type: "basic",
				iconUrl: URL_ICONE,
				title: NOM_EXTENSION,
				message: "🩼 Impossible de récupérer les données du site"
			})
		}
		
	}
}

// création des listeners au niveau global
chrome.alarms.onAlarm.addListener(alarm => {
	if (alarm.name === NOM_TIMER)
		update()
})
chrome.runtime.onInstalled.addListener(() => {
	init()
	update()
})
