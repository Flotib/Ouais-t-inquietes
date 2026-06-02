var app = new Vue({

	el: '#app',

	data: {

		shiftPressed: false,

		gamePopup: {
			open: false,

			title: "",
			message: "",

			sips: null,
			shots: null,
			remainingSips: null,

			onClose: null
		},

		aceMenuOpen: false,

		secondLifeChoicePop: null,
		secondLifeResultPop: null,

		sipDistributionPopup: {
			open: false,
			totalSips: 0,
			remainingSips: 0,
			distributions: [],
			playerId: null
		},

		shotDistributionPopup: {
			open: false,
			shots: 0,
			playerId: null
		},

		playerSipAnimations: [],

		playerSipStatAnimationKeys: {},

		pendingPlayerCreation: false,
		pendingPlayerName: "",

		editingPlayerId: null,
		editingPlayerName: "",

		draggingPlayerId: null,
		dragInsertIndex: null,
		dragInsertPosition: null,

		playerReorderAnimationsEnabled: false,

		deck: [],

		cardTheme: "classic",

		selectedPlaymatPresetId: "default",

		discardPile: [],

		cardsInPlay: [],

		cardTrackerSuits: [
			{
				id: "hearts",
				label: "Cœurs",
				icon: "♥",
				color: "red"
			},
			{
				id: "diamonds",
				label: "Carreaux",
				icon: "♦",
				color: "red"
			},
			{
				id: "clubs",
				label: "Trèfles",
				icon: "♣",
				color: "black"
			},
			{
				id: "spades",
				label: "Piques",
				icon: "♠",
				color: "black"
			}
		],

		cardTrackerValues: [
			{ id: "ace", label: "A", short: "A" },
			{ id: "king", label: "K", short: "K" },
			{ id: "queen", label: "Q", short: "Q" },
			{ id: "jack", label: "J", short: "J" },
			{ id: "10", label: "10", short: "10" },
			{ id: "9", label: "9", short: "9" },
			{ id: "8", label: "8", short: "8" },
			{ id: "7", label: "7", short: "7" },
			{ id: "6", label: "6", short: "6" },
			{ id: "5", label: "5", short: "5" },
			{ id: "4", label: "4", short: "4" },
			{ id: "3", label: "3", short: "3" },
			{ id: "2", label: "2", short: "2" }
		],

		flyingCards: [],

		holoMaskCache: {},
		holoMaskGeneration: {},

		freresPredictionPopup: {
			open: false,
			callback: null
		},

		choicePopup: {
			open: false,
			title: "",
			message: "",
			type: null,
			options: [],
			selectedValue: null,
			selectedSuit: null,
			onConfirm: null
		},

		playmatColors: {
			main: "#163126",
			mid: "#0c1714",
			dark: "#070b0a"
		},

		playmatPresetName: "",

		playmatPresets: [
			{
				id: "default",
				name: "Défaut",
				colors: {
					main: "#163126",
					mid: "#0c1714",
					dark: "#070b0a"
				}
			}
		],

		maxCardsOnTable: 52,

		playAreaWidth: 0,

		playAreaHeight: 0,

		maxRowsOnTable: 3,

		discardViewOpen: false,

		battleStackViewOpen: false,

		battleFastReveal: false,

		hoveredDiscardCardIndex: null,

		hoveredBattleStackCardIndex: null,

		lockedPlayedCardsForSips: null,
		lockedDiscardSips: null,

		battleDrawInProgress: false,
		battleRevealFinished: false,

		battleFoundOrder: [],
		pendingBattleAutoReveal: false,

		settingsOpen: false,
		gamePopupsEnabled: true,
		playAreaFeedback: null,
		turnFailed: false,

		availableCardThemes: [
			{
				id: "classic",
				label: "Classique",
			},
			{
				id: "pixeldark",
				label: "Pixel dark",
			},
			{
				id: "bicycleblizzard",
				label: "Bicycle Blizzard",
			}
		],

		players: [

			{
				id: 1,
				name: "Florian",
				hp: 0,
				savedOnce: false,
				sessionSips: 0,
			},
			{
				id: 2,
				name: "Liam",
				hp: 0,
				savedOnce: false,
				sessionSips: 0,
			},

		],

		currentPlayerIndex: 0,

		cardsPlayedThisTurn: 0,

		playersStats: {},

		actions: [
			{ id: "plus", label: "+" },
			{ id: "minus", label: "-" },
			{ id: "equal", label: "=" },

			{ id: "color", label: "Couleur" },
			{ id: "suit", label: "Signe" },
			{ id: "value", label: "Valeur" },
			{ id: "card", label: "Divination" },

			{ id: "purple", label: "Purple" },
			{ id: "fion", label: "Fion" },
			{ id: "ouais", label: "Ouais t'inquiètes" },
			{ id: "jumelles", label: "Jumelles" },
			{ id: "jack", label: "Jack" },
			{ id: "pinte", label: "Pinte" },
			{ id: "freres", label: "Frères de rots" },
			{ id: "sexe", label: "Le Cul, Le Sexe, L'Amour" },

			{ id: "combat", label: "Combat" },
			{ id: "perfect", label: "Perfect" },
			{ id: "cachecache", label: "Cache-cache" },
			{ id: "damidot", label: "Les gros nibards à Valérie Damidot" },
		],

		battleSetupOpen: false,
		battleMode: false,
		battleChoices: {},
		battleChoiceIndex: 0,
		battleSelectedValue: "ace",
		battleSelectedSuit: "hearts",
		battleLoserId: null,
		battleAutoRevealRunning: false,

		battleValues: [
			{ id: "ace", label: "As" },
			{ id: "2", label: "2" },
			{ id: "3", label: "3" },
			{ id: "4", label: "4" },
			{ id: "5", label: "5" },
			{ id: "6", label: "6" },
			{ id: "7", label: "7" },
			{ id: "8", label: "8" },
			{ id: "9", label: "9" },
			{ id: "10", label: "10" },
			{ id: "jack", label: "Valet" },
			{ id: "queen", label: "Dame" },
			{ id: "king", label: "Roi" }
		],

		battleSuits: [
			{ id: "hearts", label: "♥" },
			{ id: "diamonds", label: "♦" },
			{ id: "clubs", label: "♣" },
			{ id: "spades", label: "♠" }
		],

		sipMultiplier: 1,
		sipDivider: 1,
		aceMode: null,

		damidotMode: false,
		damidotPhase: null, // "placement" | "choose-side" | "reveal" | "resolved"
		damidotChosenSide: null,

		secondLifeMode: false,
		secondLifeCards: [],
		secondLifeSelectedCard: null,
		secondLifeResolving: false,
		secondLifeContext: "second-life",

	},

	computed: {

		currentCardThemeConfig() {

			return this.availableCardThemes.find(theme => {
				return theme.id === this.cardTheme;
			}) || null;

		},

		currentCardThemeNeedsMask() {

			if (!this.currentCardThemeConfig)
				return false;

			return this.currentCardThemeConfig.readytoplay === false;

		},

		predictionActions() {

			const predictionIds = [
				"plus",
				"minus",
				"equal",
				"color",
				"suit",
				"value",
				"card"
			];

			return this.actions.filter(action => {
				return predictionIds.includes(action.id);
			});

		},

		moveActions() {

			const moveOrder = [
				"fion",
				"purple",
				"combat",

				"perfect",
				"cachecache",

				"ouais",
				"jumelles",
				"jack",

				"pinte",
				"freres",
				"damidot",
				"sexe"
			];

			const moves = this.actions.filter(action => {
				return !this.predictionActions.some(prediction => {
					return prediction.id === action.id;
				});
			});

			return moves.sort((a, b) => {
				return moveOrder.indexOf(a.id) - moveOrder.indexOf(b.id);
			});

		},

		battleLoserPlayer() {

			if (!this.battleLoserId)
				return null;

			return this.players.find(player => {
				return player.id === this.battleLoserId;
			}) || null;

		},

		isActionBarHidden() {

			return (
				this.damidotMode ||
				this.secondLifeMode ||
				this.battleMode ||
				this.battleSetupOpen
			);

		},

		battleStackShadowStyle() {

			if (!this.battleMode) {
				return {
					"--battle-stack-shadow-opacity": 0,
					"--battle-stack-shadow-width": "0px",
					"--battle-stack-shadow-height": "0px",
					"--battle-stack-shadow-blur": "0px",
					"--battle-stack-shadow-y": "0px"
				};
			}

			const cardCount =
				this.cardsInPlay.length;

			const shadowProgress =
				Math.min(cardCount / 52, 1);

			const width =
				160 + shadowProgress * 180;

			const height =
				70 + shadowProgress * 95;

			const blur =
				12 + shadowProgress * 34;

			const opacity =
				0.16 + shadowProgress * 0.42;

			const y =
				18 + shadowProgress * 26;

			return {
				"--battle-stack-shadow-opacity": opacity,
				"--battle-stack-shadow-width": `${width}px`,
				"--battle-stack-shadow-height": `${height}px`,
				"--battle-stack-shadow-blur": `${blur}px`,
				"--battle-stack-shadow-y": `${y}px`
			};

		},

		distributablePlayers() {

			return this.players.filter(player => {
				return player.id !== this.sipDistributionPopup.playerId;
			});

		},

		shotDistributablePlayers() {

			return this.players.filter(player => {
				return player.id !== this.shotDistributionPopup.playerId;
			});

		},

		playmatStyle() {

			return {
				"--playmat-main": this.playmatColors.main,
				"--playmat-mid": this.playmatColors.mid,
				"--playmat-dark": this.playmatColors.dark
			};

		},

		aceModeLabel() {

			if (this.aceMode === "high")
				return "fort";

			if (this.aceMode === "low")
				return "faible";

			return "indéfini";

		},

		totalPlayedCardsForSips() {

			if (this.battleMode && this.lockedPlayedCardsForSips !== null) {
				return this.lockedPlayedCardsForSips;
			}

			return this.discardPile.length + this.cardsInPlay.length;

		},

		discardSips() {

			if (this.battleMode && this.lockedDiscardSips !== null) {
				return this.lockedDiscardSips;
			}

			const multiplier =
				this.sipMultiplier || 1;

			const divider =
				this.sipDivider || 1;

			let baseSips = 0;

			if (this.totalPlayedCardsForSips === 1) {
				baseSips = 1 * multiplier;
			}
			else {
				baseSips = Math.floor(
					(this.totalPlayedCardsForSips / 2) * multiplier
				);
			}

			return Math.floor(baseSips / divider);

		},

		canCurrentPlayerUseSecondLife() {

			if (!this.currentPlayer)
				return false;

			return (
				this.discardSips >= 10 &&
				this.cardsPlayedThisTurn < 5 &&
				!this.currentPlayer.savedOnce
			);

		},

		battleRoyaleAvailable() {

			return this.deck.length === 0 && !this.battleMode;

		},

		battleCurrentPlayer() {

			return this.players[this.battleChoiceIndex];

		},

		backCardImage() {
			return this.getCardBackTexturePath();
		},

		cardsRemaining() {
			return this.deck.length;
		},

		deckSize() {
			return 52;
		},

		currentPlayer() {
			return this.players[this.currentPlayerIndex];
		},

		visibleDeckStack() {

			const maxVisibleCards = 12;
			const visibleCardsAmount = Math.min(this.deck.length, maxVisibleCards);

			const cards = [];

			for (let i = 0; i < visibleCardsAmount; i++) {

				cards.push({
					id: `deck-back-${i}`,
					image: this.getCardBackTexturePath(),
					style: {
						transform: `translate(${i * 1.2}px, ${-i * 1.2}px)`,
						zIndex: i
					}
				});

			}

			return cards;

		},

		visibleDiscardStack() {

			const maxVisibleCards = 12;

			const visibleCards = this.discardPile.slice(-maxVisibleCards);

			return visibleCards.map((card, index) => {

				return {
					...card,
					stackKey: `${card.uniqueKey}-discard-stack-${index}`,
					style: {
						transform: `translate(${index * 1.2}px, ${-index * 1.2}px)`,
						zIndex: index
					}
				};

			});

		},

		cardsPerRow() {

			if (this.cardsInPlay.length === 0)
				return 1;

			return Math.ceil(this.cardsInPlay.length / this.maxRowsOnTable);

		},

		overlapCardStyle() {

			const cardWidth = 150;
			const cardHeight = 210;

			const availableWidth =
				Math.max(this.playAreaWidth - 40, cardWidth);

			let columnGap = 0;

			if (this.maxCardsPerRow > 1) {
				columnGap =
					(availableWidth - cardWidth) / (this.maxCardsPerRow - 1);
			}

			columnGap = Math.min(165, columnGap);
			columnGap = Math.max(35, columnGap);

			return {
				gridTemplateColumns: `repeat(${this.maxCardsPerRow}, 0px)`,
				gridTemplateRows: `repeat(${this.usedRowsOnTable}, ${cardHeight}px)`,
				columnGap: `${columnGap}px`
			};

		},

		cardsContainerStyle() {

			return {
				gap: `${this.dynamicCardGap}px`
			};

		},

		maxCardsPerRow() {

			const theoreticalMax =
				Math.ceil(this.maxCardsOnTable / this.maxRowsOnTable);

			const cardWidth = 150;
			const minColumnGap = 35;

			const availableWidth =
				Math.max(this.playAreaWidth - 40, cardWidth);

			const maxThatCanFit =
				Math.floor((availableWidth - cardWidth) / minColumnGap) + 1;

			return Math.max(
				1,
				Math.min(theoreticalMax, maxThatCanFit)
			);

		},

		usedRowsOnTable() {

			if (this.cardsInPlay.length === 0)
				return 1;

			return Math.ceil(this.cardsInPlay.length / this.maxCardsPerRow);

		},

	},

	watch: {

		playmatColors: {
			deep: true,
			handler() {
				this.saveSettings();
			}
		},

		playmatPresets: {
			deep: true,
			handler() {
				this.saveSettings();
			}
		},

		selectedPlaymatPresetId() {
			this.saveSettings();
		},

		cardTheme() {
			this.refreshAllCardTextures();
			this.saveSettings();
		},

		gamePopupsEnabled() {
			this.saveSettings();
		},

		battleSelectedValue() {
			this.fixBattleSelectedSuit();
		},

		discardSips() {
			this.updatePlayersLives();
		},

	},

	methods: {

		getActionCardCost(actionId) {

			const costs = {
				plus: 1,
				minus: 1,
				equal: 1,
				color: 1,
				suit: 1,
				value: 1,
				card: 1,

				fion: 2,
				purple: 2,
				combat: 2,

				perfect: 3,
				cachecache: 3,

				ouais: 4,
				jumelles: 4,
				jack: 4,

				pinte: 5,
				freres: 6,
				damidot: 8,
				sexe: 10
			};

			return costs[actionId] || 1;

		},

		getActionDisplayLabel(action) {

			if (!action)
				return "";

			const labels = {
				damidot: "Valérie Damidot",
				ouais: "Ouais t'inquiètes",
				sexe: "Cul Sexe Amour"
			};

			return labels[action.id] || action.label;

		},

		isActionDisabled(action) {

			if (!action)
				return true;

			if (this.secondLifeMode || this.battleMode || this.damidotMode)
				return true;

			if (action.id === "perfect" && this.cardsPlayedThisTurn > 0)
				return true;

			const cost =
				this.getActionCardCost(action.id);

			if (this.deck.length < cost)
				return true;

			return false;

		},

		getMoveEmoji(actionId) {

			const emojis = {
				purple: "🟣",
				fion: "🍑",
				ouais: "🔥",
				jumelles: "👯",
				jack: "🃏",
				pinte: "🍺",
				freres: "💨",
				sexe: "😏",
				combat: "⚔️",
				perfect: "✨",
				cachecache: "🫣",
				damidot: "🎀"
			};

			return emojis[actionId] || "🎴";

		},

		getBattlePreviewCardImage() {

			return this.getCardTexturePath(
				this.battleSelectedValue,
				this.battleSelectedSuit
			);

		},

		getBattleValueShortLabel(valueId) {

			const labels = {
				ace: "A",
				jack: "J",
				queen: "D",
				king: "K"
			};

			return labels[valueId] || valueId;

		},

		applyFinalSipDivider(divider) {

			this.sipDivider =
				(this.sipDivider || 1) * divider;

		},

		resetDamidotState() {

			this.damidotMode = false;
			this.damidotPhase = null;
			this.damidotChosenSide = null;

			this.cardsInPlay.forEach(card => {

				if (!card || !card.damidotCard)
					return;

				this.$set(card, "damidotCard", false);
				this.$set(card, "damidotSide", null);
				this.$set(card, "damidotSlotIndex", null);

			});

		},

		isDamidotSlotOccupied(side, slotIndex) {

			return this.cardsInPlay.some(card => {
				return card &&
					card.damidotCard &&
					card.damidotSide === side &&
					card.damidotSlotIndex === slotIndex;
			});

		},

		getDamidotScoreValue(card, aceMode = null) {

			if (!card)
				return 0;

			if (card.value === "ace") {

				if (aceMode === "low")
					return 1;

				if (aceMode === "high")
					return 11;

				return 11;

			}

			const values = {
				"2": 2,
				"3": 3,
				"4": 4,
				"5": 5,
				"6": 6,
				"7": 7,
				"8": 8,
				"9": 9,
				"10": 10,
				jack: 11,
				queen: 12,
				king: 13
			};

			return values[card.value] || 0;

		},

		getDamidotGroupTotals(side) {

			const revealedCards = this.getDamidotCardsBySide(side).filter(card => {
				return card.faceUp;
			});

			let fixedTotal = 0;
			let aceCount = 0;

			revealedCards.forEach(card => {

				if (card.value === "ace") {
					aceCount++;
					return;
				}

				fixedTotal += this.getDamidotScoreValue(card);

			});

			const lowTotal = fixedTotal + (aceCount * 1);
			const highTotal = fixedTotal + (aceCount * 11);

			return {
				low: lowTotal,
				high: highTotal,
				aceCount: aceCount
			};

		},

		getDamidotGroupTotalLabel(side) {

			const totals = this.getDamidotGroupTotals(side);

			if (totals.aceCount === 0)
				return `${totals.low}`;

			if (this.aceMode === "low")
				return `${totals.low}`;

			if (this.aceMode === "high")
				return `${totals.high}`;

			return `${totals.low} <span class="damidot-score-or">ou</span> ${totals.high}`;

		},

		getDamidotResolvedScore(side, aceMode = null) {

			const cards = this.getDamidotCardsBySide(side);

			return cards.reduce((sum, card) => {
				return sum + this.getDamidotScoreValue(card, aceMode);
			}, 0);

		},

		getDamidotSideHasFourDifferentSuits(side) {

			const suits = new Set(
				this.getDamidotCardsBySide(side).map(card => {
					return card.suit;
				})
			);

			return suits.size === 4;

		},

		checkDamidotCompletion() {

			if (!this.damidotMode || this.damidotPhase !== "reveal")
				return;

			const damidotCards =
				this.getDamidotCards();

			if (damidotCards.length !== 8)
				return;

			const allRevealed =
				damidotCards.every(card => {
					return card.faceUp;
				});

			if (!allRevealed)
				return;

			this.damidotPhase = "ready-to-resolve";

		},

		finishDamidot() {

			if (!this.damidotMode)
				return;

			if (this.damidotPhase !== "ready-to-resolve")
				return;

			const damidotCards =
				this.getDamidotCards();

			const damidotKeys =
				damidotCards.map(card => {
					return card.uniqueKey;
				});

			this.resolveDamidot();

			damidotCards.forEach(card => {

				if (!card)
					return;

				this.$set(card, "faceUp", true);
				this.$set(card, "invisible", false);

				this.$set(card, "damidotCard", false);
				this.$set(card, "damidotSide", null);
				this.$set(card, "damidotSlotIndex", null);

			});

			this.cardsInPlay =
				this.cardsInPlay.filter(card => {

					if (!card)
						return false;

					if (damidotKeys.includes(card.uniqueKey)) {

						this.discardPile.push(card);

						return false;

					}

					return true;

				});

			this.damidotMode = false;
			this.damidotPhase = null;
			this.damidotChosenSide = null;

		},
		getSuitOptions() {

			return [
				{ label: "♥", value: "hearts", className: "choice-red" },
				{ label: "♦", value: "diamonds", className: "choice-red" },
				{ label: "♣", value: "clubs", className: "choice-black" },
				{ label: "♠", value: "spades", className: "choice-black" }
			];

		},

		getValueOptions() {

			return this.battleValues.map(value => {
				return {
					label: value.label,
					value: value.id
				};
			});

		},

		getSuitLabel(suit) {

			const labels = {
				hearts: "♥",
				diamonds: "♦",
				clubs: "♣",
				spades: "♠"
			};

			return labels[suit] || suit;

		},

		applySipMultiplierBonus(multiplier) {

			if (this.sipMultiplier <= 1) {
				this.sipMultiplier = multiplier;
				return;
			}

			this.sipMultiplier += multiplier;

		},

		applySipMultiplierDivider(divider) {

			this.sipMultiplier =
				Math.max(
					0.5,
					this.sipMultiplier / divider
				);

		},

		giveShotsToEveryoneExceptCurrent(amount = 1) {

			if (!this.currentPlayer)
				return;

			this.players.forEach(player => {

				if (player.id === this.currentPlayer.id)
					return;

				this.addSipsToPlayer(
					player,
					amount * 10
				);

			});

		},

		compareCardPrediction(card, referenceCard, prediction) {

			if (!card || !referenceCard)
				return false;

			if (prediction === "equal") {
				return card.value === referenceCard.value;
			}

			const aceModeForMove =
				this.getBestAceModeForMove(
					[referenceCard, card],
					mode => {

						if (prediction === "higher") {
							return this.getCardPower(card, mode) >
								this.getCardPower(referenceCard, mode);
						}

						if (prediction === "lower") {
							return this.getCardPower(card, mode) <
								this.getCardPower(referenceCard, mode);
						}

						return false;

					}
				);

			if (prediction === "higher") {
				return this.getCardPower(card, aceModeForMove) >
					this.getCardPower(referenceCard, aceModeForMove);
			}

			if (prediction === "lower") {
				return this.getCardPower(card, aceModeForMove) <
					this.getCardPower(referenceCard, aceModeForMove);
			}

			return false;

		},

		getCardsPowerSum(cards) {

			return cards.reduce((sum, card) => {
				return sum + this.getCardPower(card);
			}, 0);

		},

		getDamidotCards() {

			return this.cardsInPlay.filter(card => {
				return card && card.damidotCard;
			});

		},

		getDamidotCardsBySide(side) {

			return this.getDamidotCards().filter(card => {
				return card.damidotSide === side;
			});

		},

		killPlayerBecauseNotEnoughCards(player, message) {

			if (!player)
				return;

			player.hp = 0;
			player.savedOnce = true;

			this.showPlayerDeathPopup(player, {
				title: "Perte du joueur",
				message: message || `${player.name} meurt car il n'y a plus assez de cartes.`
			});

		},

		askPerfectMove() {

			if (this.cardsPlayedThisTurn > 0) {
				this.showGamePopup(
					"Perfect",
					"Perfect ne peut être joué qu'en début de tour."
				);
				return;
			}

			if (this.deck.length < 3) {
				this.showGamePopup(
					"Impossible",
					"Pas assez de cartes pour Perfect."
				);
				return;
			}

			this.openChoicePopup({
				title: "Perfect",
				message: "Optionnel : prédis le signe qui ne sortira pas.",
				type: "buttons",
				options: [
					{ label: "Pas de prédiction", value: null },
					...this.getSuitOptions()
				],

				onConfirm: predictedMissingSuit => {
					this.playPerfect(predictedMissingSuit);
				}
			});

		},

		playPerfect(predictedMissingSuit = null) {

			const cards =
				this.drawMoveCards(3);

			setTimeout(() => {

				const suits =
					cards.map(card => {
						return card.suit;
					});

				const uniqueSuits =
					new Set(suits);

				const success =
					cards.length === 3 &&
					uniqueSuits.size === 3;

				const allSuits =
					["hearts", "diamonds", "clubs", "spades"];

				const missingSuit =
					allSuits.find(suit => {
						return !uniqueSuits.has(suit);
					});

				const predictionSuccess =
					success &&
					predictedMissingSuit &&
					predictedMissingSuit === missingSuit;

				this.showMoveResult(
					"Perfect",
					success
				);

				if (predictionSuccess) {

					this.applySipMultiplierBonus(2);

					this.showMoveBonus(
						"Perfect bonus",
						`Le ${this.getSuitLabel(missingSuit)} n'est pas sorti : multiplicateur de gorgées +x2.`
					);

				}

				setTimeout(() => {
					this.nextTurn();
				}, 900);

			}, 1100);

		},

		askCacheCacheMove() {

			if (this.deck.length < 3) {
				this.showGamePopup(
					"Impossible",
					"Pas assez de cartes pour Cache-cache."
				);
				return;
			}

			const firstCard =
				this.drawCardFaceUp();

			setTimeout(() => {
				this.askCacheCachePrediction(firstCard, 1);
			}, 650);

		},

		askCacheCachePrediction(referenceCard, step) {

			this.openChoicePopup({
				title: "Cache-cache",
				message: `Carte ${step + 1} : elle sera +, -, ou = ?`,
				type: "buttons",
				options: [
					{ label: "+", value: "higher" },
					{ label: "-", value: "lower" },
					{ label: "=", value: "equal" }
				],

				onConfirm: prediction => {
					this.resolveCacheCacheStep(
						referenceCard,
						prediction,
						step
					);
				}
			});

		},

		resolveCacheCacheStep(referenceCard, prediction, step) {

			const card =
				this.drawCardFaceDown();

			setTimeout(() => {

				this.$set(card, "faceUp", true);

				const success =
					this.compareCardPrediction(
						card,
						referenceCard,
						prediction
					);

				if (!success) {
					this.showMoveResult(
						"Cache-cache",
						false
					);
					return;
				}

				if (step >= 2) {
					this.showMoveResult(
						"Cache-cache",
						true
					);
					return;
				}

				setTimeout(() => {
					this.askCacheCachePrediction(
						card,
						step + 1
					);
				}, 650);

			}, 650);

		},

		getCardThemeExtension(themeId) {

			if (themeId === "classic") {
				return "svg";
			}

			return "png";

		},

		getCardThemeBackImage(themeId) {

			return `assets/cards/${themeId}/back.${this.getCardThemeExtension(themeId)}`;

		},

		getHoloMaskKey(card) {

			if (!card)
				return "";

			return this.getCardDisplayImage(card);

		},

		isHoloMaskReady(card) {

			const key =
				this.getHoloMaskKey(card);

			return !!this.holoMaskCache[key];

		},

		getHoloMaskStyle(card) {

			const key =
				this.getHoloMaskKey(card);

			if (!key)
				return {};

			if (!this.holoMaskCache[key]) {
				this.generateHoloMask(card);
			}

			return {
				"--holo-mask-image": this.holoMaskCache[key]
					? `url("${this.holoMaskCache[key]}")`
					: "none"
			};

		},

		generateHoloMask(card) {

			const imagePath =
				this.getHoloMaskKey(card);

			if (!imagePath)
				return;

			if (this.holoMaskCache[imagePath])
				return;

			if (this.holoMaskGeneration[imagePath])
				return;

			this.$set(this.holoMaskGeneration, imagePath, true);

			const image =
				new Image();

			image.onload = () => {

				const width =
					image.naturalWidth || image.width;

				const height =
					image.naturalHeight || image.height;

				if (!width || !height) {
					this.$delete(this.holoMaskGeneration, imagePath);
					return;
				}

				const canvas =
					document.createElement("canvas");

				canvas.width = width;
				canvas.height = height;

				const context =
					canvas.getContext("2d");

				context.clearRect(0, 0, width, height);
				context.drawImage(image, 0, 0, width, height);

				const imageData =
					context.getImageData(0, 0, width, height);

				const pixels =
					imageData.data;

				for (let index = 0; index < pixels.length; index += 4) {

					const alpha =
						pixels[index + 3];

					/*
						RGB blanc partout où la texture existe.
						Alpha conservé depuis le PNG/SVG.
						Donc :
						- transparent = pas d'holo
						- opaque = holo visible
						- semi-transparent = holo partiel
					*/
					pixels[index] = 255;
					pixels[index + 1] = 255;
					pixels[index + 2] = 255;
					pixels[index + 3] = alpha;

				}

				context.putImageData(imageData, 0, 0);

				const maskDataUrl =
					canvas.toDataURL("image/png");

				this.$set(this.holoMaskCache, imagePath, maskDataUrl);
				this.$delete(this.holoMaskGeneration, imagePath);

				this.$forceUpdate();

			};

			image.onerror = () => {

				console.warn("Impossible de générer le masque holo :", imagePath);

				this.$delete(this.holoMaskGeneration, imagePath);

			};

			image.src = imagePath;

		},

		getCardDisplayImage(card) {
			if (!card)
				return "";

			if (card.value && card.suit) {
				return this.getCardTexturePath(card.value, card.suit);
			}

			return card.image || "";
		},

		getFlyingCardDisplayImage(flyingCard) {
			if (!flyingCard)
				return "";

			if (flyingCard.value && flyingCard.suit) {
				return this.getCardTexturePath(flyingCard.value, flyingCard.suit);
			}

			return flyingCard.frontImage || "";
		},

		refreshCardTexture(card) {
			if (!card)
				return;

			if (!card.value || !card.suit)
				return;

			card.image = this.getCardTexturePath(card.value, card.suit);
		},

		refreshAllCardTextures() {
			this.deck.forEach(card => {
				this.refreshCardTexture(card);
			});

			this.cardsInPlay.forEach(card => {
				this.refreshCardTexture(card);
			});

			this.discardPile.forEach(card => {
				this.refreshCardTexture(card);
			});

			this.flyingCards.forEach(flyingCard => {
				if (flyingCard.value && flyingCard.suit) {
					flyingCard.frontImage = this.getCardTexturePath(flyingCard.value, flyingCard.suit);
				}

				flyingCard.backImage = this.getCardBackTexturePath();
			});

			this.$forceUpdate();
		},

		getCardTextureExtension(themeId = this.cardTheme) {

			const jpgThemes = [
				"bicycleblizzard"
			];

			if (jpgThemes.includes(themeId))
				return "jpg";

			if (themeId === "pixeldark")
				return "png";

			return "svg";

		},

		getCardTrackerCardId(value, suit) {
			return `${value}_of_${suit}`;
		},

		isCardOutOfDeck(value, suit) {
			const cardId = this.getCardTrackerCardId(value, suit);

			const inDiscard = this.discardPile.some(card => {
				return card.id === cardId;
			});

			const onTable = this.cardsInPlay.some(card => {
				return card.id === cardId;
			});

			return inDiscard || onTable;
		},

		getCardTrackerCellClass(value, suit) {
			const suitData = this.cardTrackerSuits.find(existingSuit => {
				return existingSuit.id === suit;
			});

			const isRed = suitData && suitData.color === "red";
			const isOut = this.isCardOutOfDeck(value, suit);

			return [
				isRed ? "card-tracker-red" : "card-tracker-black",
				isOut ? "card-tracker-out" : "card-tracker-in-deck"
			];
		},

		getCardTrackerCellTitle(value, suit) {
			const isOut = this.isCardOutOfDeck(value.id, suit.id);

			return `${value.label} de ${suit.label} — ${isOut ? "sortie / sur table" : "encore dans le deck"}`;
		},

		getCardTrackerOutCount() {
			const outCards = new Set();

			this.discardPile.forEach(card => {
				if (card && card.id) {
					outCards.add(card.id);
				}
			});

			this.cardsInPlay.forEach(card => {
				if (card && card.id) {
					outCards.add(card.id);
				}
			});

			return outCards.size;
		},

		allowPlayerDrop(event) {

			if (!this.shiftPressed)
				return;

			if (!this.draggingPlayerId)
				return;

			if (event && event.dataTransfer) {
				event.dataTransfer.dropEffect = "move";
			}

		},

		startPlayerDrag(player, event) {

			if (!this.shiftPressed)
				return;

			this.playerReorderAnimationsEnabled = true;

			this.draggingPlayerId = player.id;

			const currentIndex =
				this.players.findIndex(existingPlayer => {
					return existingPlayer.id === player.id;
				});

			this.dragInsertIndex = currentIndex;
			this.dragInsertPosition = "before";

			if (event && event.dataTransfer) {
				event.dataTransfer.effectAllowed = "move";
				event.dataTransfer.setData("text/plain", String(player.id));

				if (event.dataTransfer.setDragImage) {
					const playerCard = event.currentTarget.closest(".player-card");

					if (playerCard) {
						const dragImage = playerCard.cloneNode(true);

						dragImage.classList.add("player-drag-preview");

						dragImage.style.position = "fixed";
						dragImage.style.left = "-9999px";
						dragImage.style.top = "-9999px";
						dragImage.style.width = playerCard.offsetWidth + "px";
						dragImage.style.height = playerCard.offsetHeight + "px";
						dragImage.style.margin = "0";
						dragImage.style.pointerEvents = "none";

						document.body.appendChild(dragImage);

						event.dataTransfer.setDragImage(dragImage, 26, 26);

						setTimeout(() => {
							if (dragImage.parentNode) {
								dragImage.parentNode.removeChild(dragImage);
							}
						}, 0);
					}
				}
			}

		},

		updatePlayerInsertPosition(playerIndex, event) {

			if (!this.shiftPressed)
				return;

			if (!this.draggingPlayerId)
				return;

			if (event && event.dataTransfer) {
				event.dataTransfer.dropEffect = "move";
			}

			const cardElement =
				event.currentTarget;

			const rect =
				cardElement.getBoundingClientRect();

			const cursorY =
				event.clientY;

			const middleY =
				rect.top + rect.height / 2;

			if (cursorY < middleY) {
				this.dragInsertIndex = playerIndex;
				this.dragInsertPosition = "before";
			}
			else {
				this.dragInsertIndex = playerIndex + 1;
				this.dragInsertPosition = "after";
			}

		},

		updatePlayerInsertPositionFromList(event) {

			if (!this.shiftPressed)
				return;

			if (!this.draggingPlayerId)
				return;

			if (event && event.dataTransfer) {
				event.dataTransfer.dropEffect = "move";
			}

			const cursorY =
				event.clientY;

			let insertIndex =
				this.players.length;

			for (let index = 0; index < this.players.length; index++) {

				const player =
					this.players[index];

				const playerElement =
					document.querySelector(`[data-player-id="${player.id}"]`);

				if (!playerElement)
					continue;

				const rect =
					playerElement.getBoundingClientRect();

				const middleY =
					rect.top + rect.height / 2;

				if (cursorY < middleY) {
					insertIndex = index;
					break;
				}

			}

			this.dragInsertIndex = insertIndex;
			this.dragInsertPosition = "between";

		},

		setPlayerInsertIndex(index, event) {

			if (!this.shiftPressed)
				return;

			if (!this.draggingPlayerId)
				return;

			if (event && event.dataTransfer) {
				event.dataTransfer.dropEffect = "move";
			}

			this.dragInsertIndex = index;
			this.dragInsertPosition = "between";

		},

		dropPlayerAtInsertIndex() {

			if (!this.shiftPressed)
				return;

			if (!this.draggingPlayerId)
				return;

			if (this.dragInsertIndex === null)
				return;

			const fromIndex =
				this.players.findIndex(player => {
					return player.id === this.draggingPlayerId;
				});

			if (fromIndex === -1)
				return;

			let toIndex =
				this.dragInsertIndex;

			if (fromIndex < toIndex) {
				toIndex--;
			}

			if (toIndex < 0) {
				toIndex = 0;
			}

			if (toIndex > this.players.length - 1) {
				toIndex = this.players.length - 1;
			}

			if (fromIndex === toIndex) {
				this.endPlayerDrag();
				return;
			}

			const currentPlayerId =
				this.currentPlayer ? this.currentPlayer.id : null;

			const movedPlayer =
				this.players.splice(fromIndex, 1)[0];

			this.players.splice(toIndex, 0, movedPlayer);

			if (currentPlayerId !== null) {

				const newCurrentPlayerIndex =
					this.players.findIndex(player => {
						return player.id === currentPlayerId;
					});

				if (newCurrentPlayerIndex !== -1) {
					this.currentPlayerIndex = newCurrentPlayerIndex;
				}

			}

			this.$nextTick(() => {
				this.updateSipAnimationPositions();
			});

			this.endPlayerDrag();

		},

		endPlayerDrag() {

			this.draggingPlayerId = null;
			this.dragInsertIndex = null;
			this.dragInsertPosition = null;

			setTimeout(() => {
				this.playerReorderAnimationsEnabled = false;
			}, 260);

		},

		updateSipAnimationPositions() {

			this.playerSipAnimations.forEach(animation => {

				const playerElement =
					document.querySelector(`[data-player-id="${animation.playerId}"]`);

				const playersList =
					document.querySelector(".players-list");

				if (!playerElement || !playersList) {
					this.$set(animation, "visible", false);
					return;
				}

				const playerRect =
					playerElement.getBoundingClientRect();

				const listRect =
					playersList.getBoundingClientRect();

				const isVisible =
					playerRect.bottom >= listRect.top &&
					playerRect.top <= listRect.bottom;

				this.$set(animation, "visible", isVisible);

				if (!isVisible)
					return;

				this.$set(animation, "x", playerRect.left - 10);
				this.$set(animation, "y", playerRect.top + playerRect.height / 2 - 20);

			});

		},

		debugGiveRandomSips() {

			if (this.players.length === 0)
				return;

			const randomPlayerIndex =
				Math.floor(Math.random() * this.players.length);

			const player =
				this.players[randomPlayerIndex];

			const randomSips =
				Math.floor(Math.random() * 10) + 1;

			this.addSipsToPlayer(
				player,
				randomSips
			);

		},

		hasActiveSipAnimation(playerId) {

			return this.playerSipAnimations.some(animation => {
				return animation.playerId === playerId;
			});

		},

		getSipStatAnimationKey(playerId) {

			return this.playerSipStatAnimationKeys[playerId] || 0;

		},

		addAllSipsToPlayer(player) {

			if (this.sipDistributionPopup.remainingSips <= 0)
				return;

			let entry = this.sipDistributionPopup.distributions.find(entry => {
				return entry.playerId === player.id;
			});

			if (!entry) {

				entry = {
					playerId: player.id,
					sips: 0
				};

				this.sipDistributionPopup.distributions.push(entry);

			}

			entry.sips += this.sipDistributionPopup.remainingSips;
			this.sipDistributionPopup.remainingSips = 0;

		},

		openFreresPredictionPopup(callback) {

			this.freresPredictionPopup.open = true;
			this.freresPredictionPopup.callback = callback;

		},

		selectFreresPrediction(value) {

			const callback =
				this.freresPredictionPopup.callback;

			this.freresPredictionPopup.open = false;
			this.freresPredictionPopup.callback = null;

			if (callback) {
				callback(value);
			}

		},

		openShotDistribution(shots, sourcePlayerId) {

			this.shotDistributionPopup = {
				open: true,
				shots: shots,
				playerId: sourcePlayerId
			};

		},

		giveShotsToPlayer(player) {

			const shots =
				this.shotDistributionPopup.shots;

			this.addSipsToPlayer(
				player,
				shots * 10
			);

			this.shotDistributionPopup.open = false;

		},

		showPlayerSipGain(playerId, amount) {

			if (!amount || amount <= 0)
				return;

			this.$nextTick(() => {

				const playerElement =
					document.querySelector(`[data-player-id="${playerId}"]`);

				let x = window.innerWidth - 285;
				let y = 120;

				if (playerElement) {

					const rect =
						playerElement.getBoundingClientRect();

					/*
						Le point d'ancrage est proche du bord gauche
						de la fiche joueur.
						
						Le texte est ensuite aligné à droite sur ce point,
						donc +1000 grandit vers la gauche et ne mange pas
						la fiche joueur.
					*/
					x = rect.left - 10;
					y = rect.top + rect.height / 2 - 20;

				}

				/*
					On supprime l'ancienne animation du même joueur.
					Comme ça, si le joueur reprend des gorgées avant la fin,
					l'ancien +X disparaît et le nouveau repart proprement.
				*/
				this.playerSipAnimations =
					this.playerSipAnimations.filter(animation => {
						return animation.playerId !== playerId;
					});

				/*
					On force aussi le texte des stats à rejouer son animation.
				*/
				this.$set(
					this.playerSipStatAnimationKeys,
					playerId,
					Date.now() + Math.random()
				);

				const animationId =
					Date.now() + Math.random();

				const rotation =
					Math.random() * 8 - 4;

				const offset =
					Math.random() * 8 - 4;

				this.playerSipAnimations.push({
					id: animationId,
					playerId: playerId,
					amount: amount,
					rotation: rotation,
					offset: offset,
					x: x,
					y: y,
					visible: true
				});

				this.$nextTick(() => {
					this.updateSipAnimationPositions();
				});

				setTimeout(() => {

					this.playerSipAnimations =
						this.playerSipAnimations.filter(animation => {
							return animation.id !== animationId;
						});

				}, 2450);

			});

		},

		openSipDistribution(totalSips, sourcePlayerId) {

			this.sipDistributionPopup = {
				open: true,
				totalSips: totalSips,
				remainingSips: totalSips,
				playerId: sourcePlayerId,
				distributions: []
			};

		},

		addSipToPlayer(player) {

			if (this.sipDistributionPopup.remainingSips <= 0)
				return;

			let entry = this.sipDistributionPopup.distributions.find(entry => {
				return entry.playerId === player.id;
			});

			if (!entry) {

				entry = {
					playerId: player.id,
					sips: 0
				};

				this.sipDistributionPopup.distributions.push(entry);

			}

			entry.sips++;

			this.sipDistributionPopup.remainingSips--;

		},

		removeSipFromPlayer(player) {

			const entry = this.sipDistributionPopup.distributions.find(entry => {
				return entry.playerId === player.id;
			});

			if (!entry || entry.sips <= 0)
				return;

			entry.sips--;

			this.sipDistributionPopup.remainingSips++;

		},

		getDistributedSips(playerId) {

			const entry = this.sipDistributionPopup.distributions.find(entry => {
				return entry.playerId === playerId;
			});

			return entry ? entry.sips : 0;

		},

		validateSipDistribution() {

			this.sipDistributionPopup.distributions.forEach(entry => {

				const player = this.players.find(player => {
					return player.id === entry.playerId;
				});

				if (!player)
					return;

				player.sessionSips =
					(player.sessionSips || 0) +
					entry.sips;

				this.showPlayerSipGain(
					player.id,
					entry.sips
				);

			});

			this.closeSipDistribution();

		},

		closeSipDistribution() {

			this.sipDistributionPopup.open = false;

		},

		getBestAceModeForMove(cards, successCallback) {

			if (this.aceMode !== null) {
				return this.aceMode;
			}

			const hasAce = cards.some(card => {
				return card.value === "ace";
			});

			if (!hasAce) {
				return null;
			}

			const lowSuccess = successCallback("low");
			const highSuccess = successCallback("high");

			if (lowSuccess) {
				this.aceMode = "low";
				this.showMoveBonus("As défini", "L'As est maintenant faible pour toute la session.");
				return "low";
			}

			if (highSuccess) {
				this.aceMode = "high";
				this.showMoveBonus("As défini", "L'As est maintenant fort pour toute la session.");
				return "high";
			}

			this.aceMode = "high";
			this.showMoveBonus("As défini", "L'As est maintenant fort pour toute la session.");

			return "high";

		},

		savePlaymatPreset() {

			const name = this.playmatPresetName.trim();

			if (!name) {
				this.showGamePopup("Impossible", "Donne un nom au preset.");
				return;
			}

			const preset = {
				id: `preset-${Date.now()}`,
				name: name,
				colors: {
					main: this.playmatColors.main,
					mid: this.playmatColors.mid,
					dark: this.playmatColors.dark
				}
			};

			this.playmatPresets.push(preset);
			this.selectedPlaymatPresetId = preset.id;
			this.playmatPresetName = "";

			this.saveSettings();

		},

		applySelectedPlaymatPreset() {

			const preset = this.playmatPresets.find(preset => {
				return preset.id === this.selectedPlaymatPresetId;
			});

			if (!preset)
				return;

			this.playmatColors = {
				main: preset.colors.main,
				mid: preset.colors.mid,
				dark: preset.colors.dark
			};

			this.saveSettings();

		},

		showPlayerDeathPopup(player, options = {}) {

			if (!player)
				return;

			const sips = options.sips !== undefined
				? options.sips
				: this.discardSips;

			const shots = Math.floor(sips / 10);
			const remainingSips = sips % 10;

			this.addSipsToPlayer(player, sips);

			this.showMandatoryPopup(
				options.title || "Perte du joueur",
				options.message || `${player.name} meurt 💀.`,
				{
					sips: sips,
					shots: shots,
					remainingSips: remainingSips,

					onClose: () => {

						this.resetDeckOnly();

						this.endSecondLifeChallenge();

						this.currentPlayerIndex++;

						if (this.currentPlayerIndex >= this.players.length) {
							this.currentPlayerIndex = 0;
						}

					}
				}
			);

		},

		showSecondLifeResultPop(type) {

			this.secondLifeResultPop = {
				type: type,
				text: type === "win" ? "Gagné !" : "Perdu !"
			};

			setTimeout(() => {
				this.secondLifeResultPop = null;
			}, 1200);

		},

		showDeathPopup(player, options = {}) {

			const sips = this.discardSips;
			const shots = Math.floor(sips / 10);
			const remainingSips = sips % 10;

			this.addSipsToPlayer(player, sips);

			this.showMandatoryPopup(
				"Perte du joueur",
				`${player.name} meurt 💀.`,
				{
					sips: sips,
					shots: shots,
					remainingSips: remainingSips,

					onClose: () => {

						if (options.restartAfterClose) {

							this.endSecondLifeChallenge();
							this.resetDeckOnly();

							this.currentPlayerIndex++;

							if (this.currentPlayerIndex >= this.players.length) {
								this.currentPlayerIndex = 0;
							}

						}

					}
				}
			);

		},

		showSecondLifeChoicePop(card) {

			const cardElement = document.querySelector(
				`[data-card-key="${card.uniqueKey}"]`
			);

			if (!cardElement)
				return;

			const drawArea = document.querySelector(".draw-area");

			if (!drawArea)
				return;

			const cardRect = cardElement.getBoundingClientRect();
			const areaRect = drawArea.getBoundingClientRect();

			const rotation = Math.random() * 12 - 6;

			this.secondLifeChoicePop = {
				style: {
					left: `${cardRect.left - areaRect.left + cardRect.width / 2}px`,
					top: `${cardRect.top - areaRect.top - 28}px`,
					transform: `translate(-50%, -50%) rotate(${rotation}deg)`
				}
			};

			setTimeout(() => {
				this.secondLifeChoicePop = null;
			}, 900);

		},

		closeAceMenu(event) {

			const container =
				event.target.closest(".ace-mode-container");

			if (!container) {
				this.aceMenuOpen = false;
			}

		},

		setAceMode(mode) {

			this.aceMode = mode;
			this.aceMenuOpen = false;

		},

		resolveAceModeForComparison(referenceCard, drawnCard, expectedDirection) {

			if (this.aceMode !== null)
				return this.aceMode;

			if (referenceCard.value !== "ace" && drawnCard.value !== "ace")
				return null;

			const refLow = this.getCardPower(referenceCard, "low");
			const refHigh = this.getCardPower(referenceCard, "high");

			const drawnLow = this.getCardPower(drawnCard, "low");
			const drawnHigh = this.getCardPower(drawnCard, "high");

			const modes = ["low", "high"];

			const winningMode = modes.find(mode => {

				const referencePower =
					referenceCard.value === "ace"
						? this.getCardPower(referenceCard, mode)
						: this.getCardPower(referenceCard);

				const drawnPower =
					drawnCard.value === "ace"
						? this.getCardPower(drawnCard, mode)
						: this.getCardPower(drawnCard);

				if (expectedDirection === "higher") {
					return drawnPower > referencePower;
				}

				if (expectedDirection === "lower") {
					return drawnPower < referencePower;
				}

				return false;

			});

			if (winningMode) {

				this.aceMode = winningMode;

				this.showMoveBonus(
					"As défini",
					`L'As est maintenant ${winningMode === "high" ? "fort" : "faible"} pour toute la session.`
				);

				return winningMode;

			}

			this.aceMode = "high";

			this.showMoveBonus(
				"As défini",
				"L'As est maintenant fort pour toute la session."
			);

			return this.aceMode;

		},

		handleKeyDown(event) {

			if (event.key === "Shift") {
				this.shiftPressed = true;
			}

			this.handleEscapeKey(event);

		},

		handleKeyUp(event) {

			if (event.key === "Shift") {
				this.shiftPressed = false;
			}

		},

		showMandatoryPopup(title, message = "", options = {}) {

			this.showGamePopup(title, message, options);

		},

		showMoveBonus(title, message) {

			if (this.gamePopupsEnabled) {
				this.showGamePopup(title, message);
			}

		},

		saveSettings() {

			const settings = {
				cardTheme: this.cardTheme,
				gamePopupsEnabled: this.gamePopupsEnabled,

				playmatColors: this.playmatColors,
				playmatPresets: this.playmatPresets,
				selectedPlaymatPresetId: this.selectedPlaymatPresetId
			};

			localStorage.setItem(
				"ouaisTinquietesSettings",
				JSON.stringify(settings)
			);

		},

		loadSettings() {

			const savedSettings = localStorage.getItem("ouaisTinquietesSettings");

			if (!savedSettings)
				return;

			const settings = JSON.parse(savedSettings);

			if (settings.cardTheme !== undefined) {
				this.cardTheme = settings.cardTheme;
			}

			if (settings.gamePopupsEnabled !== undefined) {
				this.gamePopupsEnabled = settings.gamePopupsEnabled;
			}

			if (settings.playmatColors !== undefined) {
				this.playmatColors = settings.playmatColors;
			}

			if (settings.playmatPresets !== undefined) {
				this.playmatPresets = settings.playmatPresets;
			}

			if (settings.selectedPlaymatPresetId !== undefined) {
				this.selectedPlaymatPresetId = settings.selectedPlaymatPresetId;
			}

		},

		flashPlayAreaFeedback(type) {

			this.playAreaFeedback = null;

			this.$nextTick(() => {

				this.playAreaFeedback = type;

				setTimeout(() => {
					this.playAreaFeedback = null;
				}, 850);

			});

		},

		showMoveResult(moveName, success) {

			if (!success) {
				this.turnFailed = true;
			}

			// Toujours faire le feedback visuel
			this.flashPlayAreaFeedback(
				success ? "success" : "fail"
			);

			// Les popups deviennent optionnelles
			if (!this.gamePopupsEnabled) {
				return;
			}

			this.showGamePopup(
				moveName,
				success ? "Coup réussi ✅" : "Coup raté ❌"
			);

		},

		addSipsToPlayer(player, amount) {

			if (!player || amount <= 0)
				return;

			if (player.sessionSips === undefined) {
				this.$set(player, "sessionSips", 0);
			}

			player.sessionSips += amount;

			this.showPlayerSipGain(
				player.id,
				amount
			);

		},

		handleEscapeKey(event) {

			if (event.key !== "Escape")
				return;

			if (this.gamePopup.open) {
				this.closeGamePopup();
				return;
			}

			if (this.choicePopup.open) {
				this.closeChoicePopup();
				return;
			}

			if (this.discardViewOpen) {
				this.closeDiscardView();
				return;
			}

			if (this.battleStackViewOpen) {
				this.closeBattleStackView();
				return;
			}

			if (this.battleSetupOpen) {
				this.closeBattleSetup();
				return;
			}

		},

		canPlayBouffon() {

			const lastCard = this.getLastReferenceCard();

			if (!lastCard)
				return false;

			if (!lastCard.faceUp)
				return false;

			return (
				lastCard.value === "7" ||
				lastCard.value === 7
			);

		},

		forceInterruptMove(player, moveId) {

			if (this.battleMode || this.secondLifeMode)
				return;

			if (!player)
				return;

			const previousPlayerIndex = this.currentPlayerIndex;

			const targetIndex = this.players.findIndex(existingPlayer => {
				return existingPlayer.id === player.id;
			});

			if (targetIndex === -1)
				return;

			this.currentPlayerIndex = targetIndex;
			this.cardsPlayedThisTurn = 0;

			if (moveId === "freres") {

				this.openChoicePopup({
					title: "Frères de rots",
					message: "Choisis une valeur. Si le move passe, tu distribues 1 gorgée par apparition.",
					type: "buttons",

					options: this.battleValues.map(value => {
						return {
							label: value.label,
							value: value.id
						};
					}),

					onConfirm: predictedValue => {
						this.playForcedFreresDeRots(
							player,
							previousPlayerIndex,
							predictedValue
						);
					}
				});

			}

			if (moveId === "bouffon") {
				this.playForcedBouffon(player, previousPlayerIndex);
			}

		},

		playForcedFreresDeRots(player, previousPlayerIndex, predictedValue) {

			if (this.deck.length < 6) {
				this.showGamePopup("Impossible", "Pas assez de cartes pour Frères de rots.");
				this.currentPlayerIndex = previousPlayerIndex;
				return;
			}

			const cards = this.drawMoveCards(6);

			setTimeout(() => {

				const colors = this.countColors(cards);

				const success =
					(colors.red || 0) === 3 &&
					(colors.black || 0) === 3;

				const occurrences = cards.filter(card => {
					return card.value === predictedValue;
				}).length;

				this.showMoveResult("Frères de rots", success);

				if (success) {

					this.cardsPlayedThisTurn = 3;
					this.clearPlayArea();

					if (occurrences > 0) {
						this.openSipDistribution(
							occurrences,
							player.id
						);
					}

					return;

				}

				this.turnFailed = true;

			}, 1600);

		},

		playForcedBouffon(player, previousPlayerIndex) {

			const referenceCard = this.getLastReferenceCard();

			if (!referenceCard || referenceCard.value !== "7") {
				this.showGamePopup(
					"Bouffon",
					"Le Bouffon ne peut être joué que par-dessus un 7."
				);

				this.currentPlayerIndex = previousPlayerIndex;
				return;
			}

			if (this.deck.length < 7) {
				this.showGamePopup("Impossible", "Pas assez de cartes pour le Bouffon.");
				this.currentPlayerIndex = previousPlayerIndex;
				return;
			}

			const cards = this.drawMoveCards(7);

			setTimeout(() => {

				const success = cards.some(card => {
					return (
						card.value === "ace" ||
						card.value === "king" ||
						card.value === "7"
					);
				});

				this.showMoveResult("Bouffon", success);

				if (success) {
					this.cardsPlayedThisTurn = 3;
					this.clearPlayArea();
					return;
				}

				this.turnFailed = true;

			}, 1800);

		},

		canPlayForcedFreres() {

			return !this.battleMode &&
				!this.secondLifeMode &&
				this.deck.length >= 6;

		},

		canPlayForcedBouffon() {

			return (
				!this.battleMode &&
				!this.secondLifeMode &&
				this.deck.length >= 7 &&
				this.canPlayBouffon()
			);

		},

		askColorMove() {

			this.openChoicePopup({
				title: "Couleur",
				message: "Choisis la couleur de la prochaine carte.",
				type: "buttons",
				options: [
					{ label: "Rouge", value: "red", className: "choice-red" },
					{ label: "Noir", value: "black", className: "choice-black" }
				],
				onConfirm: color => {
					this.playColor(color);
				}
			});

		},

		askSuitMove() {

			this.openChoicePopup({
				title: "Signe",
				message: "Choisis le signe de la prochaine carte.",
				type: "buttons",
				options: [
					{ label: "♥", value: "hearts", className: "choice-red" },
					{ label: "♦", value: "diamonds", className: "choice-red" },
					{ label: "♣", value: "clubs", className: "choice-black" },
					{ label: "♠", value: "spades", className: "choice-black" }
				],
				onConfirm: suit => {
					this.playSuit(suit);
				}
			});

		},

		askValueMove() {

			this.openChoicePopup({
				title: "Valeur",
				message: "Choisis la valeur de la prochaine carte.",
				type: "buttons",
				options: this.battleValues.map(value => {
					return {
						label: value.label,
						value: value.id
					};
				}),
				onConfirm: value => {
					this.playValue(value);
				}
			});

		},

		askSpecificCardMove() {

			this.openChoicePopup({
				title: "Carte",
				message: "Choisis exactement la prochaine carte.",
				type: "card",
				selectedValue: "ace",
				selectedSuit: "hearts",
				onConfirm: choice => {
					this.playSpecificCard(choice.value, choice.suit);
				}
			});

		},

		askJackMove() {

			this.openChoicePopup({
				title: "Jack",
				message: "La somme des 4 cartes sera...",
				type: "buttons",
				options: [
					{ label: "Inférieure à 30", value: "lower" },
					{ label: "Égale à 30", value: "equal" },
					{ label: "Supérieure à 30", value: "higher" }
				],
				onConfirm: prediction => {
					this.playJack(prediction);
				}
			});

		},

		openChoicePopup(config) {

			this.choicePopup.open = true;
			this.choicePopup.title = config.title || "";
			this.choicePopup.message = config.message || "";
			this.choicePopup.type = config.type || "buttons";
			this.choicePopup.options = config.options || [];
			this.choicePopup.selectedValue = config.selectedValue || "ace";
			this.choicePopup.selectedSuit = config.selectedSuit || "hearts";
			this.choicePopup.onConfirm = config.onConfirm || null;

		},

		closeChoicePopup() {

			this.choicePopup.open = false;
			this.choicePopup.title = "";
			this.choicePopup.message = "";
			this.choicePopup.type = null;
			this.choicePopup.options = [];
			this.choicePopup.selectedValue = null;
			this.choicePopup.selectedSuit = null;
			this.choicePopup.onConfirm = null;

		},

		confirmChoice(value) {

			const callback = this.choicePopup.onConfirm;

			this.closeChoicePopup();

			if (callback) {
				callback(value);
			}

		},

		getLastReferenceCard() {

			if (this.cardsInPlay.length > 0) {
				return this.cardsInPlay[this.cardsInPlay.length - 1];
			}

			if (this.discardPile.length > 0) {
				return this.discardPile[this.discardPile.length - 1];
			}

			return null;

		},

		drawMoveCards(amount, options = {}) {

			const drawnCards = [];

			const delay = options.delay ?? 90;

			for (let i = 0; i < amount; i++) {

				setTimeout(() => {

					const card = this.drawCard({
						faceUp: options.faceUp !== undefined ? options.faceUp : true,
						flip: options.flip !== undefined ? options.flip : true
					});

					if (card) {
						drawnCards.push(card);
					}

				}, i * delay);

			}

			return drawnCards;

		},

		hasSameValue(cards) {

			const values = cards.map(card => card.value);

			return values.some((value, index) => {
				return values.indexOf(value) !== index;
			});

		},

		countColors(cards) {

			return cards.reduce((acc, card) => {

				if (!acc[card.color]) {
					acc[card.color] = 0;
				}

				acc[card.color]++;

				return acc;

			}, {});

		},

		countSuits(cards) {

			return cards.reduce((acc, card) => {

				if (!acc[card.suit]) {
					acc[card.suit] = 0;
				}

				acc[card.suit]++;

				return acc;

			}, {});

		},

		countValues(cards) {

			return cards.reduce((acc, card) => {

				if (!acc[card.value]) {
					acc[card.value] = 0;
				}

				acc[card.value]++;

				return acc;

			}, {});

		},

		isFaceCard(card) {

			if (["jack", "queen", "king"].includes(card.value)) {
				return true;
			}

			if (card.value === "ace" && this.aceMode === "high") {
				return true;
			}

			return false;

		},

		getPossibleJackSums(cards) {

			let sums = [0];

			cards.forEach(card => {

				if (card.value === "ace") {

					const newSums = [];

					sums.forEach(sum => {
						newSums.push(sum + 1);
						newSums.push(sum + 11);
					});

					sums = newSums;

					return;

				}

				const value = this.getCardPower(card);

				sums = sums.map(sum => {
					return sum + value;
				});

			});

			return sums;

		},

		randomizeBattleChoice() {

			const availableCards = [];

			this.battleValues.forEach(value => {

				this.battleSuits.forEach(suit => {

					if (!this.isBattleCardTaken(value.id, suit.id)) {

						availableCards.push({
							value: value.id,
							suit: suit.id
						});

					}

				});

			});

			if (availableCards.length === 0) {
				this.showGamePopup(
					"Impossible",
					"Plus aucune carte disponible."
				);
				return;
			}

			const randomIndex = Math.floor(Math.random() * availableCards.length);
			const randomCard = availableCards[randomIndex];

			this.battleSelectedValue = randomCard.value;
			this.battleSelectedSuit = randomCard.suit;

		},

		getBattlePlayerResultClass(player) {

			if (!this.battleMode || !this.battleChoices[player.id])
				return "";

			if (this.battleLoserId && this.battleLoserId === player.id)
				return "battle-player-loser";

			const choice = this.battleChoices[player.id];

			if (!choice.found)
				return "";

			if (choice.foundOrder === 1)
				return "battle-player-gold";

			if (choice.foundOrder === 2)
				return "battle-player-silver";

			if (choice.foundOrder === 3)
				return "battle-player-bronze";

			return "battle-player-safe";

		},

		showGamePopup(title, message = "", options = {}) {

			this.gamePopup.title = title;
			this.gamePopup.message = message;

			this.gamePopup.sips = options.sips ?? null;
			this.gamePopup.shots = options.shots ?? null;
			this.gamePopup.remainingSips =
				options.remainingSips ?? null;

			this.gamePopup.open = true;
			this.gamePopup.onClose = options.onClose || null;

		},

		closeGamePopup() {

			const onClose = this.gamePopup.onClose;

			this.gamePopup.open = false;
			this.gamePopup.title = "";
			this.gamePopup.message = "";
			this.gamePopup.onClose = null;
			this.gamePopup.sips = null;
			this.gamePopup.shots = null;
			this.gamePopup.remainingSips = null;

			if (onClose) {
				onClose();
			}

		},

		debugSecondLifeBattle() {

			if (!this.currentPlayer)
				return;

			if (this.deck.length < 4) {
				alert("Pas assez de cartes pour debug la bataille.");
				return;
			}

			const duplicatedValue = this.findDuplicatedValueInDeck();

			if (!duplicatedValue) {
				alert("Impossible de trouver deux cartes de même valeur dans le deck.");
				return;
			}

			this.secondLifeMode = true;
			this.secondLifeCards = [];
			this.secondLifeSelectedCard = null;
			this.secondLifeResolving = false;

			this.clearPlayArea();

			setTimeout(() => {

				const leftCard = this.forceDrawSpecificSecondLifeCard(
					"left",
					this.currentPlayer.id,
					duplicatedValue
				);

				const rightCard = this.forceDrawSpecificSecondLifeCard(
					"right",
					this.currentPlayer.id,
					duplicatedValue
				);

				if (!leftCard || !rightCard) {
					alert("Erreur debug bataille.");
					this.endSecondLifeChallenge();
					return;
				}

			}, 600);

		},

		findDuplicatedValueInDeck() {

			const valueCounts = {};

			this.deck.forEach(card => {

				if (!valueCounts[card.value]) {
					valueCounts[card.value] = 0;
				}

				valueCounts[card.value]++;

			});

			const duplicatedValue = Object.keys(valueCounts).find(value => {
				return valueCounts[value] >= 2;
			});

			return duplicatedValue || null;

		},

		forceDrawSpecificSecondLifeCard(side, playerId, value) {

			const cardIndex = this.deck.findIndex(card => {
				return card.value === value;
			});

			if (cardIndex === -1)
				return null;

			const rawCard = this.deck.splice(cardIndex, 1)[0];

			const card = this.prepareCardForPlay(rawCard, {
				faceUp: false
			});

			card.ownerId = playerId;
			card.secondLifeCard = true;
			card.secondLifeSide = side;
			card.secondLifeStackIndex = this.secondLifeCards.filter(existingCard => {
				return existingCard.secondLifeSide === side;
			}).length;

			card.invisible = true;

			this.secondLifeCards.push(card);

			this.animateLayoutChange(() => {
				this.cardsInPlay.push(card);
			});

			this.$nextTick(() => {

				const deckElement = document.querySelector(".deck");
				const targetElement = document.querySelector(`[data-card-key="${card.uniqueKey}"]`);

				if (!deckElement || !targetElement) {
					card.invisible = false;
					return;
				}

				this.animateCard({
					backImage: this.backCardImage,
					frontImage: card.image,
					fromElement: deckElement,
					toElement: targetElement,

					flip: false,
					startFaceUp: false,
					endFaceUp: false,

					onComplete: () => {
						card.invisible = false;
					}
				});

			});

			return card;

		},

		restartGame() {

			this.battleDrawInProgress = false;
			this.battleRevealFinished = false;

			this.lockedPlayedCardsForSips = null;
			this.lockedDiscardSips = null;

			this.battleSetupOpen = false;
			this.battleMode = false;
			this.battleChoices = {};
			this.battleChoiceIndex = 0;
			this.battleLoserId = null;
			this.battleAutoRevealRunning = false;
			this.battleStackViewOpen = false;
			this.hoveredBattleStackCardIndex = null;

			this.cardsInPlay = [];
			this.discardPile = [];
			this.flyingCards = [];

			this.turnFailed = false;
			this.playersStats = {};
			this.cardsPlayedThisTurn = 0;
			this.currentPlayerIndex = 0;

			this.resetDamidotState();
			this.sipDivider = 1;

			this.createDeck();
			this.shuffleDeck();

			this.battleFoundOrder = [];
			this.pendingBattleAutoReveal = false;

			this.players.forEach(player => {
				player.hp = 0;
				player.savedOnce = false;
			});
		},

		pluralize(count, singular, plural) {

			return count > 1 ? plural : singular;

		},

		cardsText(count) {

			return `${count} ${this.pluralize(count, "carte", "cartes")}`;

		},

		sipsText(count) {

			return `${count} ${this.pluralize(count, "gorgée", "gorgées")}`;

		},

		toggleAceMode() {

			if (this.aceMode === null) {
				this.aceMode = "Haut";
				return;
			}

			if (this.aceMode === "Haut") {
				this.aceMode = "Bas";
				return;
			}

			this.aceMode = null;

		},

		handlePlayerDeath(player = this.currentPlayer) {

			if (!player)
				return;

			if (this.canCurrentPlayerUseSecondLife) {

				this.startSecondLifeChallenge(player);

				return;

			}

			player.hp = 0;
			player.savedOnce = true;

			this.showPlayerDeathPopup(player, {
				title: "Perte du joueur",
				message: `${player.name} perd le Ouais t'inquiètes 💀.`,

				onClose: () => {

					this.resetDeckOnly();

					this.currentPlayerIndex++;

					if (this.currentPlayerIndex >= this.players.length) {
						this.currentPlayerIndex = 0;
					}

				}
			});

		},

		startSecondLifeChallenge(player, context = "second-life") {

			if (!player)
				return;

			if (this.deck.length < 2) {

				if (context === "second-life") {

					this.killPlayerBecauseNotEnoughCards(
						player,
						`${player.name} meurt car il n'y a pas assez de cartes pour tenter une seconde chance.`
					);

				}
				else {

					this.showGamePopup(
						"Combat",
						"Pas assez de cartes pour lancer le Combat."
					);

				}

				return;

			}

			this.secondLifeContext = context;

			this.secondLifeMode = true;
			this.secondLifeCards = [];
			this.secondLifeSelectedCard = null;
			this.secondLifeResolving = false;
			this.secondLifeChoicePop = null;

			this.clearPlayArea();

			setTimeout(() => {

				this.drawSecondLifeCard(
					"left",
					player.id,
					context
				);

				setTimeout(() => {

					this.drawSecondLifeCard(
						"right",
						player.id,
						context
					);

				}, 650);

			}, 850);

		},

		drawSecondLifeCard(side, playerId, context = "second-life") {

			if (this.deck.length === 0)
				return null;

			const card = this.prepareCardForPlay(this.deck.pop(), {
				faceUp: false
			});

			card.ownerId = playerId;
			card.secondLifeCard = true;
			card.secondLifeSide = side;
			this.$set(card, "secondLifeContext", context);
			card.secondLifeStackIndex = this.secondLifeCards.filter(existingCard => {
				return existingCard.secondLifeSide === side;
			}).length;

			card.invisible = true;

			this.secondLifeCards.push(card);

			this.animateLayoutChange(() => {

				this.cardsInPlay.push(card);

				this.cardsPlayedThisTurn++;

				if (!this.playersStats[card.ownerId]) {
					this.$set(this.playersStats, card.ownerId, 0);
				}

				this.playersStats[card.ownerId]++;

			});

			this.$nextTick(() => {

				const deckElement = document.querySelector(".deck");
				const targetElement = document.querySelector(`[data-card-key="${card.uniqueKey}"]`);

				if (!deckElement || !targetElement) {
					card.invisible = false;
					return;
				}

				this.animateCard({
					backImage: this.backCardImage,
					frontImage: card.image,
					fromElement: deckElement,
					toElement: targetElement,

					flip: false,
					startFaceUp: false,
					endFaceUp: false,

					onComplete: () => {
						card.invisible = false;
					}
				});

			});

			return card;

		},

		selectSecondLifeCard(card) {

			if (!this.secondLifeMode)
				return;

			if (!card || !card.secondLifeCard)
				return;

			if (this.secondLifeResolving)
				return;

			if (card.faceUp)
				return;

			this.secondLifeSelectedCard = card;
			this.secondLifeResolving = true;

			this.showSecondLifeChoicePop(card);

			this.$set(card, "faceUp", true);

			const opponentCard = this.secondLifeCards.find(otherCard => {
				return (
					otherCard &&
					otherCard.uniqueKey !== card.uniqueKey &&
					otherCard.secondLifeStackIndex === card.secondLifeStackIndex &&
					otherCard.secondLifeSide !== card.secondLifeSide
				);
			});

			if (!opponentCard) {
				this.secondLifeResolving = false;
				return;
			}

			setTimeout(() => {

				this.$set(opponentCard, "faceUp", true);

				setTimeout(() => {
					this.resolveSecondLifeDuel(card, opponentCard);
				}, 700);

			}, 700);

		},

		resolveSecondLifeDuel(selectedCard, opponentCard) {

			const aceModeForMove = this.getBestAceModeForMove(
				[selectedCard, opponentCard],
				mode => {
					return this.getCardPower(selectedCard, mode) >
						this.getCardPower(opponentCard, mode);
				}
			);

			const selectedPower = this.getCardPower(selectedCard, aceModeForMove);
			const opponentPower = this.getCardPower(opponentCard, aceModeForMove);

			const player = this.players.find(player => {
				return player.id === selectedCard.ownerId;
			});

			if (selectedCard.secondLifeContext === "combat") {

				if (selectedPower > opponentPower) {

					this.showSecondLifeResultPop("win");

					setTimeout(() => {

						this.showMoveResult(
							"Combat",
							true
						);

						this.finishCombatChallenge();

					}, 900);

					return;

				}

				if (selectedPower < opponentPower) {

					this.showSecondLifeResultPop("lose");

					setTimeout(() => {

						this.showMoveResult(
							"Combat",
							false
						);

						this.endSecondLifeChallenge(true);

					}, 900);

					return;

				}

				this.launchSecondLifeBattle(selectedCard.ownerId);
				return;

			}

			if (selectedPower > opponentPower) {

				this.showSecondLifeResultPop("win");

				setTimeout(() => {

					if (player) {
						player.savedOnce = true;
						player.hp = 0;

						this.showGamePopup(
							"Seconde vie",
							`${player.name} revient à la vie.`
						);
					}

					this.clearPlayArea();

					setTimeout(() => {
						this.endSecondLifeChallenge();
						this.goToNextPlayerAfterSecondLife();
					}, 700);

				}, 900);

				return;

			}

			if (selectedPower < opponentPower) {

				this.showSecondLifeResultPop("lose");

				setTimeout(() => {

					if (player) {

						player.hp = 0;
						player.savedOnce = true;

						this.showPlayerDeathPopup(player, {
							title: "Seconde vie ratée",
							message: `${player.name} meurt 💀.`,

							onClose: () => {

								this.endSecondLifeChallenge();

								this.resetDeckOnly();

								this.currentPlayerIndex++;

								if (this.currentPlayerIndex >= this.players.length) {
									this.currentPlayerIndex = 0;
								}

							}
						});

					}

				}, 900);

				return;

			}

			this.launchSecondLifeBattle(selectedCard.ownerId);

		},

		playDamidot() {

			if (this.deck.length < 8) {
				this.showGamePopup(
					"Impossible",
					"Pas assez de cartes pour Les gros nibards à Valérie Damidot."
				);
				return;
			}

			this.resetDamidotState();

			this.damidotMode = true;
			this.damidotPhase = "placement";

		},

		placeDamidotCardInSlot(side, slotIndex) {

			if (!this.damidotMode || this.damidotPhase !== "placement")
				return;

			if (this.isDamidotSlotOccupied(side, slotIndex))
				return;

			const damidotCards = this.getDamidotCards();

			if (damidotCards.length >= 8)
				return;

			const card = this.drawCard({
				faceUp: false,
				flip: false
			});

			if (!card)
				return;

			this.$set(card, "damidotCard", true);
			this.$set(card, "damidotSide", side);
			this.$set(card, "damidotSlotIndex", slotIndex);

			const placedCount = this.getDamidotCards().length;

			if (placedCount >= 8) {
				this.damidotPhase = "choose-side";
			}

		},

		chooseDamidotSide(side) {

			if (!this.damidotMode || this.damidotPhase !== "choose-side")
				return;

			this.damidotChosenSide = side;
			this.damidotPhase = "reveal";

		},

		handleDamidotCardClick(card) {

			if (!card || !card.damidotCard || !this.damidotMode)
				return;

			if (this.damidotPhase !== "reveal")
				return;

			if (card.faceUp)
				return;

			card.faceUp = true;

			this.$nextTick(() => {
				this.checkDamidotCompletion();
			});

		},

		resolveDamidot() {

			if (!this.damidotChosenSide)
				return;

			const chosenSide =
				this.damidotChosenSide;

			const otherSide =
				chosenSide === "left"
					? "right"
					: "left";

			const damidotCards =
				this.getDamidotCards();

			const hasAce =
				damidotCards.some(card => {
					return card.value === "ace";
				});

			let chosenScore = 0;
			let otherScore = 0;

			if (this.aceMode === "low") {

				chosenScore =
					this.getDamidotResolvedScore(chosenSide, "low");

				otherScore =
					this.getDamidotResolvedScore(otherSide, "low");

			}
			else if (this.aceMode === "high") {

				chosenScore =
					this.getDamidotResolvedScore(chosenSide, "high");

				otherScore =
					this.getDamidotResolvedScore(otherSide, "high");

			}
			else if (hasAce) {

				const chosenLow =
					this.getDamidotResolvedScore(chosenSide, "low");

				const otherLow =
					this.getDamidotResolvedScore(otherSide, "low");

				const chosenHigh =
					this.getDamidotResolvedScore(chosenSide, "high");

				const otherHigh =
					this.getDamidotResolvedScore(otherSide, "high");

				const lowSuccess =
					chosenLow > otherLow;

				const highSuccess =
					chosenHigh > otherHigh;

				if (lowSuccess) {

					this.aceMode = "low";

					chosenScore = chosenLow;
					otherScore = otherLow;

					this.showMoveBonus(
						"As défini",
						"L'As est maintenant faible pour toute la session."
					);

				}
				else if (highSuccess) {

					this.aceMode = "high";

					chosenScore = chosenHigh;
					otherScore = otherHigh;

					this.showMoveBonus(
						"As défini",
						"L'As est maintenant fort pour toute la session."
					);

				}
				else {

					const lowDifference =
						chosenLow - otherLow;

					const highDifference =
						chosenHigh - otherHigh;

					if (lowDifference >= highDifference) {

						this.aceMode = "low";

						chosenScore = chosenLow;
						otherScore = otherLow;

						this.showMoveBonus(
							"As défini",
							"L'As est maintenant faible pour toute la session."
						);

					}
					else {

						this.aceMode = "high";

						chosenScore = chosenHigh;
						otherScore = otherHigh;

						this.showMoveBonus(
							"As défini",
							"L'As est maintenant fort pour toute la session."
						);

					}

				}

			}
			else {

				chosenScore =
					this.getDamidotResolvedScore(chosenSide, null);

				otherScore =
					this.getDamidotResolvedScore(otherSide, null);

			}

			const success =
				chosenScore > otherScore;

			const hasFourDifferentSuits =
				this.getDamidotSideHasFourDifferentSuits(chosenSide);

			this.showMoveResult(
				"Les gros nibards à Valérie Damidot",
				success
			);

			if (hasFourDifferentSuits) {

				if (success) {

					this.applySipMultiplierBonus(3);

					this.showMoveBonus(
						"Damidot bonus",
						"Le groupe choisi a les 4 signes différents : multiplicateur de gorgées +x3."
					);

				}
				else {

					this.applyFinalSipDivider(2);

					this.showMoveBonus(
						"Damidot malus",
						"Le groupe choisi a les 4 signes différents : nombre final de gorgées divisé par 2."
					);

				}

			}

			this.damidotPhase = "resolved";

		},

		goToNextPlayerAfterSecondLife() {

			this.clearPlayArea();

			this.currentPlayerIndex++;

			if (this.currentPlayerIndex >= this.players.length) {
				this.currentPlayerIndex = 0;
			}

			this.cardsPlayedThisTurn = 0;

		},

		launchSecondLifeBattle(playerId) {

			const player = this.players.find(player => {
				return player.id === playerId;
			});

			if (this.deck.length < 2) {

				this.killPlayerBecauseNotEnoughCards(
					player,
					player
						? `${player.name} meurt : égalité, mais il n'y a pas assez de cartes pour continuer la bataille.`
						: "Le joueur meurt : égalité, mais il n'y a pas assez de cartes pour continuer la bataille."
				);

				return;

			}

			this.secondLifeSelectedCard = null;
			this.secondLifeResolving = false;

			const context =
				this.secondLifeCards.some(card => {
					return card.secondLifeContext === "combat";
				})
					? "combat"
					: "second-life";

			setTimeout(() => {

				this.drawSecondLifeCard("left", playerId, context);

				setTimeout(() => {

					this.drawSecondLifeCard("right", playerId, context);

				}, 650);

			}, 500);

		},

		endSecondLifeChallenge(keepCards = false) {

			const secondLifeKeys = this.secondLifeCards.map(card => {
				return card.uniqueKey;
			});

			if (keepCards) {

				this.secondLifeCards.forEach(card => {

					if (!card)
						return;

					this.$set(card, "faceUp", true);
					this.$set(card, "invisible", false);

					this.$set(card, "secondLifeCard", false);
					this.$set(card, "secondLifeSide", null);
					this.$set(card, "secondLifeStackIndex", null);
					this.$set(card, "secondLifeContext", null);

				});

			}
			else {

				this.cardsInPlay = this.cardsInPlay.filter(card => {
					return !card.secondLifeCard && !secondLifeKeys.includes(card.uniqueKey);
				});

			}

			this.secondLifeMode = false;
			this.secondLifeCards = [];
			this.secondLifeSelectedCard = null;
			this.secondLifeResolving = false;
			this.secondLifeChoicePop = null;
			this.secondLifeResultPop = null;
			this.secondLifeContext = "second-life";

		},

		finishCombatChallenge() {

			this.secondLifeCards.forEach(card => {

				if (!card)
					return;

				this.$set(card, "faceUp", true);
				this.$set(card, "invisible", false);

				this.$set(card, "secondLifeCard", false);
				this.$set(card, "secondLifeSide", null);
				this.$set(card, "secondLifeStackIndex", null);
				this.$set(card, "secondLifeContext", null);

			});

			this.secondLifeMode = false;
			this.secondLifeCards = [];
			this.secondLifeSelectedCard = null;
			this.secondLifeResolving = false;
			this.secondLifeChoicePop = null;
			this.secondLifeResultPop = null;
			this.secondLifeContext = "second-life";

		},

		playCombat() {

			if (!this.currentPlayer)
				return;

			this.startSecondLifeChallenge(
				this.currentPlayer,
				"combat"
			);

		},

		getCardPower(card, preferredAceMode = null) {

			if (card.value === "ace") {

				const mode = preferredAceMode || this.aceMode;

				if (mode === "high")
					return 14;

				if (mode === "low")
					return 1;

				return 14;

			}

			const powers = {
				"2": 2,
				"3": 3,
				"4": 4,
				"5": 5,
				"6": 6,
				"7": 7,
				"8": 8,
				"9": 9,
				"10": 10,
				jack: 11,
				queen: 12,
				king: 13
			};

			return powers[card.value];

		},

		isBattleCardTaken(value, suit) {

			const cardId = `${value}_of_${suit}`;

			return Object.values(this.battleChoices).some(choice => {
				return choice.cardId === cardId;
			});

		},

		isBattleValueFullyTaken(value) {

			const suits = ["hearts", "diamonds", "clubs", "spades"];

			return suits.every(suit => {
				return this.isBattleCardTaken(value, suit);
			});

		},

		fixBattleSelectedSuit() {

			if (!this.isBattleCardTaken(this.battleSelectedValue, this.battleSelectedSuit))
				return;

			const availableSuit = this.battleSuits.find(suit => {
				return !this.isBattleCardTaken(this.battleSelectedValue, suit.id);
			});

			if (availableSuit) {
				this.battleSelectedSuit = availableSuit.id;
			}

		},

		openBattleStackView() {

			if (!this.battleMode)
				return;

			if (!this.battleLoserId)
				return;

			if (this.cardsInPlay.length === 0)
				return;

			this.battleStackViewOpen = true;

		},

		closeBattleStackView() {

			this.battleStackViewOpen = false;
			this.hoveredBattleStackCardIndex = null;

		},

		updateHoveredBattleStackCard(event) {

			const total = this.cardsInPlay.length;

			if (total === 0) {
				this.hoveredBattleStackCardIndex = null;
				return;
			}

			const fanElement = event.currentTarget;
			const rect = fanElement.getBoundingClientRect();

			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;

			const activeZoneTop = rect.height - 330;
			const activeZoneBottom = rect.height - 20;

			if (mouseY < activeZoneTop || mouseY > activeZoneBottom) {
				this.hoveredBattleStackCardIndex = null;
				return;
			}

			const centerX = rect.width / 2;
			const spread = Math.min(46, 950 / Math.max(total, 1));

			let closestIndex = 0;
			let closestDistance = Infinity;

			for (let i = 0; i < total; i++) {

				const cardX = centerX + (i - (total - 1) / 2) * spread;
				const distance = Math.abs(mouseX - cardX);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = i;
				}

			}

			this.hoveredBattleStackCardIndex = closestIndex;

		},

		getBattleStackFanCardStyle(index) {

			const total = this.cardsInPlay.length;
			const hoveredIndex = this.hoveredBattleStackCardIndex;
			const isHovered = hoveredIndex === index;
			const hasHover = hoveredIndex !== null;

			const maxAngle = 58;
			const angleStep = total > 1 ? maxAngle / (total - 1) : 0;
			const angle = total > 1 ? -maxAngle / 2 + angleStep * index : 0;

			const spread = Math.min(46, 950 / Math.max(total, 1));

			let x = (index - (total - 1) / 2) * spread;
			let y = Math.abs(angle) * 2.1;

			if (hasHover && !isHovered) {

				const distance = index - hoveredIndex;
				const direction = distance < 0 ? -1 : 1;

				const pushStrength = Math.max(0, 1 - Math.abs(distance) * 0.18);

				x += direction * 70 * pushStrength;
				y += 18 * pushStrength;

			}

			if (isHovered) {

				return {
					transform: `translateX(-50%) translate(${x}px, ${y - 75}px) scale(1.22) rotate(0deg)`,
					zIndex: 9999
				};

			}

			return {
				transform: `translateX(-50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
				zIndex: index
			};

		},

		getBattleChoiceLabel(choice) {

			const valueLabels = {
				ace: "A",
				jack: "J",
				queen: "Q",
				king: "K"
			};

			const suitSymbols = {
				hearts: "♥",
				diamonds: "♦",
				clubs: "♣",
				spades: "♠"
			};

			const value = valueLabels[choice.value] || choice.value;
			const suit = suitSymbols[choice.suit] || "?";

			return `${value}${suit}`;

		},

		getBattleChoiceColorClass(choice) {

			if (choice.suit === "hearts" || choice.suit === "diamonds") {
				return "red-choice";
			}

			return "black-choice";

		},

		handleDeckLeftClick() {

			if (this.secondLifeMode)
				return;

			if (this.battleMode) {
				this.drawBattleRoyaleCard({
					ignoreLock: true,
					fast: false
				});
				return;
			}

			this.drawCardFaceUp();

		},

		openBattleRoyaleSetup() {

			this.clearPlayArea();

			this.battleSetupOpen = true;
			this.battleChoiceIndex = 0;
			this.battleChoices = {};
			this.battleSelectedValue = "ace";
			this.battleSelectedSuit = "hearts";

		},

		confirmBattleChoice() {

			const player = this.battleCurrentPlayer;

			const selectedCardId =
				`${this.battleSelectedValue}_of_${this.battleSelectedSuit}`;

			const cardAlreadyTaken = Object.values(this.battleChoices).some(choice => {
				return choice.cardId === selectedCardId;
			});

			if (cardAlreadyTaken) {

				this.showGamePopup(
					"Impossible.",
					"Carte déjà choisie par un autre joueur."
				);

				return;

			}

			this.$set(this.battleChoices, player.id, {
				playerId: player.id,
				value: this.battleSelectedValue,
				suit: this.battleSelectedSuit,
				cardId: `${this.battleSelectedValue}_of_${this.battleSelectedSuit}`,
				found: false
			});

			this.battleChoiceIndex++;

			if (this.battleChoiceIndex >= this.players.length) {
				this.startBattleRoyale();
				return;
			}

			this.battleSelectedValue = "ace";
			this.battleSelectedSuit = "hearts";
			this.fixBattleSelectedSuit();

		},

		getBattleSuitColorClass(suit) {

			if (suit === "hearts" || suit === "diamonds") {
				return "red-choice";
			}

			return "black-choice";

		},

		startBattleRoyale() {

			this.battleDrawInProgress = false;
			this.battleRevealFinished = false;

			this.battleFoundOrder = [];
			this.pendingBattleAutoReveal = false;

			this.lockedPlayedCardsForSips = this.totalPlayedCardsForSips;
			this.lockedDiscardSips = this.discardSips;

			this.battleSetupOpen = false;
			this.battleMode = true;
			this.battleLoserId = null;
			this.battleAutoRevealRunning = false;

			this.cardsInPlay = [];
			this.discardPile = [];

			this.createDeck();
			this.shuffleDeck();

		},

		drawBattleRoyaleCard(options = {}) {

			if (!this.battleMode)
				return;

			const ignoreLock = options.ignoreLock || false;
			const fast = options.fast || false;

			if (this.battleDrawInProgress && !ignoreLock)
				return;

			if (this.deck.length === 0) {
				this.battleRevealFinished = true;
				return;
			}

			if (!ignoreLock)
				this.battleDrawInProgress = true;

			const card = this.prepareCardForPlay(this.deck.pop(), {
				faceUp: true
			});

			card.ownerId = null;
			card.battleMatched = false;
			card.stackRotation = Math.random() * 10 - 5;

			const matchingChoice = this.getMatchingBattleChoice(card);

			if (matchingChoice) {

				card.battleMatched = true;
				card.faceUp = true;

				matchingChoice.found = true;
				matchingChoice.foundOrder = this.battleFoundOrder.length + 1;

				this.battleFoundOrder.push(matchingChoice.playerId);

			}

			card.invisible = true;

			this.cardsInPlay.push(card);

			this.$nextTick(() => {

				const deckElement = document.querySelector(".deck");

				const targetElement =
					document.querySelector(`[data-card-key="${card.uniqueKey}"]`) ||
					document.querySelector(".battle-stack-target");

				if (!deckElement || !targetElement) {
					card.invisible = false;
					this.battleDrawInProgress = false;
					return;
				}

				this.animateBattleCard({
					card: card,
					backImage: this.backCardImage,
					frontImage: this.getCardDisplayImage(card),
					fromElement: deckElement,
					toElement: targetElement,
					finalRotation: card.stackRotation,
					duration: fast ? 130 : 320,

					onComplete: () => {
						card.faceUp = true;
						card.invisible = false;

						if (!ignoreLock)
							this.battleDrawInProgress = false;

						this.checkBattleRoyaleState();
					}
				});

			});

		},

		animateBattleCard({
			card = null,
			backImage,
			frontImage,
			fromElement,
			toElement,
			finalRotation = 0,
			duration = 520,
			onComplete
		}) {

			const fromRect = fromElement.getBoundingClientRect();
			const toRect = toElement.getBoundingClientRect();

			const isRealTargetCard =
				toElement.classList.contains("card") ||
				toElement.closest(".card");

			const targetCardElement =
				isRealTargetCard
					? toElement.closest(".card") || toElement
					: null;

			const targetRect =
				targetCardElement
					? targetCardElement.getBoundingClientRect()
					: toRect;

			const cardWidth =
				targetRect.width || 150;

			const cardHeight =
				targetRect.height || 210;

			const flyingCard = {
				id: `battle-flying-${Date.now()}-${Math.random()}`,

				duration: duration,

				value: card ? card.value : null,
				suit: card ? card.suit : null,

				backImage: backImage,
				frontImage: frontImage,

				x: fromRect.left + fromRect.width / 2 - cardWidth / 2,
				y: fromRect.top + fromRect.height / 2 - cardHeight / 2,

				toX: targetRect.left + targetRect.width / 2 - cardWidth / 2,
				toY: targetRect.top + targetRect.height / 2 - cardHeight / 2,

				width: cardWidth,
				height: cardHeight,

				rotation: finalRotation,
				scale: 0.95,

				flipped: false,
				battleFlying: true
			};

			this.flyingCards.push(flyingCard);

			requestAnimationFrame(() => {

				requestAnimationFrame(() => {

					flyingCard.x = flyingCard.toX;
					flyingCard.y = flyingCard.toY;
					flyingCard.scale = 1;
					flyingCard.flipped = true;

				});

			});

			setTimeout(() => {

				if (onComplete) {
					onComplete();
				}

				setTimeout(() => {

					this.flyingCards = this.flyingCards.filter(card => {
						return card.id !== flyingCard.id;
					});

				}, 30);

			}, duration);

		},

		getMatchingBattleChoice(card) {

			const choices = Object.values(this.battleChoices);

			return choices.find(choice => {
				return !choice.found && choice.cardId === card.id;
			});

		},

		handleTableCardClick(card) {

			if (this.battleMode)
				return;

			if (this.secondLifeMode) {
				this.selectSecondLifeCard(card);
				return;
			}

			if (card.damidotCard) {
				this.handleDamidotCardClick(card);
				return;
			}

			this.toggleCardFace(card);

		},

		checkBattleRoyaleState() {

			if (this.battleLoserId)
				return;

			const remainingPlayers = this.players.filter(player => {
				const choice = this.battleChoices[player.id];
				return choice && !choice.found;
			});

			if (remainingPlayers.length === 1) {

				const loser = remainingPlayers[0];

				const winnerId = this.battleFoundOrder[0];
				const winner = this.players.find(player => {
					return player.id === winnerId;
				});

				this.battleLoserId = loser.id;
				this.addSipsToPlayer(loser, this.discardSips);
				this.pendingBattleAutoReveal = true;

				const loserSips = this.discardSips;
				const loserShots = Math.floor(loserSips / 10);
				const remainingSips = loserSips % 10;

				this.showMandatoryPopup(
					"BATTLE ROYALE",
					`${winner.name} gagne 🍾.

${loser.name} perd le Ouais t'inquiètes 👎.`,
					{
						sips: loserSips,
						shots: loserShots,
						remainingSips: remainingSips,

						onClose: () => {

							if (this.pendingBattleAutoReveal) {

								this.pendingBattleAutoReveal = false;

								this.autoRevealRemainingBattleCards();

							}

						}
					}
				);

			}

			if (remainingPlayers.length === 0) {
				this.battleRevealFinished = true;
			}

		},

		autoRevealRemainingBattleCards() {

			if (this.battleAutoRevealRunning)
				return;

			this.battleAutoRevealRunning = true;
			this.battleFastReveal = true;

			const interval = setInterval(() => {

				if (this.deck.length === 0) {

					clearInterval(interval);
					this.battleAutoRevealRunning = false;
					this.battleFastReveal = false;
					this.battleRevealFinished = true;
					return;

				}

				this.drawBattleRoyaleCard({
					ignoreLock: true,
					fast: true
				});

			}, 45);

		},

		debugDealAllCards() {

			if (this.deck.length === 0)
				return;

			const delay = 45;

			const interval = setInterval(() => {

				if (this.deck.length === 0) {
					clearInterval(interval);
					return;
				}

				this.drawCardFaceUp();

			}, delay);

		},

		openDiscardView() {

			if (this.discardPile.length === 0)
				return;

			this.discardViewOpen = true;

		},

		closeDiscardView() {

			this.discardViewOpen = false;

		},

		getDiscardFanCardStyle(index) {

			const total = this.discardPile.length;
			const hoveredIndex = this.hoveredDiscardCardIndex;
			const isHovered = hoveredIndex === index;
			const hasHover = hoveredIndex !== null;

			const maxAngle = 58;
			const angleStep = total > 1 ? maxAngle / (total - 1) : 0;
			const angle = total > 1 ? -maxAngle / 2 + angleStep * index : 0;

			const spread = Math.min(46, 950 / Math.max(total, 1));

			let x = (index - (total - 1) / 2) * spread;
			let y = Math.abs(angle) * 2.1;

			if (hasHover && !isHovered) {

				const distance = index - hoveredIndex;
				const direction = distance < 0 ? -1 : 1;

				const pushStrength = Math.max(0, 1 - Math.abs(distance) * 0.18);

				x += direction * 70 * pushStrength;
				y += 18 * pushStrength;

			}

			if (isHovered) {

				return {
					transform: `translateX(-50%) translate(${x}px, ${y - 75}px) scale(1.22) rotate(0deg)`,
					zIndex: 9999
				};

			}

			return {
				transform: `translateX(-50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
				zIndex: index
			};

		},

		updateHoveredDiscardCard(event) {

			const total = this.discardPile.length;

			if (total === 0) {
				this.hoveredDiscardCardIndex = null;
				return;
			}

			const fanElement = event.currentTarget;
			const rect = fanElement.getBoundingClientRect();

			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;

			const activeZoneTop = rect.height - 390;
			const activeZoneBottom = rect.height - 20;

			if (mouseY < activeZoneTop || mouseY > activeZoneBottom) {
				this.hoveredDiscardCardIndex = null;
				return;
			}

			const centerX = rect.width / 2;
			const spread = Math.min(46, 950 / Math.max(total, 1));

			let closestIndex = 0;
			let closestDistance = Infinity;

			for (let i = 0; i < total; i++) {

				const cardX = centerX + (i - (total - 1) / 2) * spread;
				const distance = Math.abs(mouseX - cardX);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = i;
				}

			}

			this.hoveredDiscardCardIndex = closestIndex;

		},

		getTableCardStyle(card, index) {

			if (card.damidotCard) {

				const slotIndex =
					card.damidotSlotIndex || 0;

				const column =
					slotIndex % 2;

				const row =
					Math.floor(slotIndex / 2);

				const groupCenterX =
					card.damidotSide === "left"
						? -194
						: 194;

				const columnOffset =
					column === 0
						? -84
						: 84;

				const damidotTop =
					24;

				const slotWidth =
					150;

				const slotHeight =
					210;

				const slotGap =
					18;

				const slotCenterY =
					damidotTop +
					(slotHeight / 2) +
					row * (slotHeight + slotGap);

				const yOffset =
					slotCenterY - (this.playAreaHeight / 2);

				return {
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: `translate(calc(-50% + ${groupCenterX + columnOffset}px), calc(-50% + ${yOffset}px))`,
					zIndex: 2600 + index
				};

			}

			if (this.battleMode) {

				return {
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: `translate(-50%, -50%) rotate(${card.stackRotation || 0}deg)`,
					zIndex: 1000 + index
				};

			}

			if (card.secondLifeCard) {

				const sideX = card.secondLifeSide === "left" ? -130 : 130;
				const stackOffset = card.secondLifeStackIndex * 8;

				return {
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: `translate(calc(-50% + ${sideX + stackOffset}px), -50%)`,
					zIndex: 3000 + card.secondLifeStackIndex
				};

			}

			const rowIndex = Math.floor(index / this.maxCardsPerRow);
			const columnIndex = index % this.maxCardsPerRow;

			const cardsInThisRow = Math.min(
				this.maxCardsPerRow,
				this.cardsInPlay.length - rowIndex * this.maxCardsPerRow
			);

			const emptySlots = this.maxCardsPerRow - cardsInThisRow;
			const startColumn = Math.floor(emptySlots / 2) + 1;

			return {
				gridRow: rowIndex + 1,
				gridColumn: startColumn + columnIndex,
				zIndex: 1000 + index
			};

		},

		updatePlayAreaSize() {

			const playArea = document.querySelector(".draw-area");

			if (!playArea)
				return;

			const rect = playArea.getBoundingClientRect();

			this.playAreaWidth = rect.width;
			this.playAreaHeight = rect.height;

		},

		getCardTextureValue(value) {
			const valueMap = {
				ace: "a",
				jack: "j",
				queen: "q",
				king: "k"
			};

			return valueMap[value] || value;
		},

		getCardTextureSuit(suit) {
			const suitMap = {
				hearts: "h",
				diamonds: "d",
				clubs: "c",
				spades: "s"
			};

			return suitMap[suit] || suit;
		},

		getCardTextureName(value, suit) {
			return `${this.getCardTextureValue(value)}${this.getCardTextureSuit(suit)}`;
		},

		getCardTexturePath(value, suit) {
			return `assets/cards/${this.cardTheme}/${this.getCardTextureName(value, suit)}.${this.getCardTextureExtension()}`;
		},

		getCardBackTexturePath() {
			return `assets/cards/${this.cardTheme}/back.${this.getCardTextureExtension()}`;
		},
		createDeck() {

			const suits = [
				{
					name: "hearts",
					color: "red"
				},
				{
					name: "diamonds",
					color: "red"
				},
				{
					name: "clubs",
					color: "black"
				},
				{
					name: "spades",
					color: "black"
				}
			];

			const values = [
				"ace",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"jack",
				"queen",
				"king"
			];

			this.deck = [];

			suits.forEach(suit => {

				values.forEach(value => {

					this.deck.push({

						id: `${value}_of_${suit.name}`,

						suit: suit.name,

						value: value,

						color: suit.color,

						image: this.getCardTexturePath(value, suit.name)

					});

				});

			});

		},

		shuffleDeck() {

			for (let i = this.deck.length - 1; i > 0; i--) {

				const j = Math.floor(Math.random() * (i + 1));

				[this.deck[i], this.deck[j]] =
					[this.deck[j], this.deck[i]];

			}

		},

		prepareCardForPlay(card, options = {}) {

			return {
				...card,
				uniqueKey: `${card.id}-${Date.now()}-${Math.random()}`,
				faceUp: options.faceUp !== undefined ? options.faceUp : true,
				invisible: true,
				ownerId: this.currentPlayer ? this.currentPlayer.id : null
			};

		},

		drawCard(options = {}) {

			if (this.deck.length === 0)
				return null;

			if (this.cardsInPlay.length >= this.maxCardsOnTable) {
				alert("La zone de jeu est pleine. Nettoie avant de tirer d'autres cartes.");
				return null;
			}

			const faceUp = options.faceUp !== undefined ? options.faceUp : true;
			const flip = options.flip !== undefined ? options.flip : faceUp;

			const card = this.prepareCardForPlay(this.deck.pop(), {
				faceUp: faceUp
			});

			card.invisible = true;

			this.cardsInPlay.push(card);
			this.cardsPlayedThisTurn++;

			if (!this.playersStats[card.ownerId]) {
				this.$set(this.playersStats, card.ownerId, 0);
			}

			this.playersStats[card.ownerId]++;

			this.$nextTick(() => {

				const deckElement = document.querySelector(".deck");
				const targetElement = document.querySelector(`[data-card-key="${card.uniqueKey}"]`);

				if (!deckElement || !targetElement) {
					card.invisible = false;
					return;
				}

				this.animateCard({
					backImage: this.backCardImage,
					frontImage: card.image,
					fromElement: deckElement,
					toElement: targetElement,

					flip: flip,
					startFaceUp: false,
					endFaceUp: faceUp,

					onComplete: () => {
						card.invisible = false;
					}
				});

			});

			return card;

		},

		drawCardFaceUp() {

			return this.drawCard({
				faceUp: true,
				flip: true
			});

		},

		drawCardFaceDown() {

			if (this.battleMode || this.secondLifeMode)
				return null;

			return this.drawCard({
				faceUp: false,
				flip: false
			});

		},

		drawMultipleCards(amount) {

			for (let i = 0; i < amount; i++) {

				if (this.deck.length === 0)
					return;

				const card = this.deck.pop();

				this.cardsInPlay.push(
					this.prepareCardForPlay(card)
				);

			}

		},

		moveToDiscard(index) {

			const card = this.cardsInPlay[index];

			this.discardPile.push(card);

			this.cardsInPlay.splice(index, 1);

		},

		clearPlayArea() {

			if (this.cardsInPlay.length === 0)
				return;

			const discardElement = document.querySelector(".discard-animation-target");

			if (!discardElement)
				return;

			const cardsToDiscard = [...this.cardsInPlay];

			cardsToDiscard.forEach((card, index) => {

				setTimeout(() => {

					const cardElement = document.querySelector(`[data-card-key="${card.uniqueKey}"]`);

					if (!cardElement)
						return;

					this.animateCard({
						backImage: this.backCardImage,
						frontImage: card.image,
						fromElement: cardElement,
						toElement: discardElement,

						flip: !card.faceUp,
						startFaceUp: card.faceUp,
						endFaceUp: true,

						onStart: () => {
							card.invisible = true;
						},

						onComplete: () => {

							const cardIndex = this.cardsInPlay.findIndex(cardInPlay => {
								return cardInPlay.uniqueKey === card.uniqueKey;
							});

							if (cardIndex !== -1) {

								let removedCard = null;

								removedCard = this.cardsInPlay.splice(cardIndex, 1)[0];

								removedCard.faceUp = true;
								removedCard.invisible = false;

								this.discardPile.push(removedCard);

							}

						}
					});

				}, index * 70);

			});

		},

		moveCardToDiscard(card) {

			const cardIndex = this.cardsInPlay.findIndex(cardInPlay => {
				return cardInPlay.uniqueKey === card.uniqueKey;
			});

			if (cardIndex === -1)
				return;

			const removedCard = this.cardsInPlay.splice(cardIndex, 1)[0];

			setTimeout(() => {

				this.discardPile.push(removedCard);

				if (this.cardsInPlay.length > 0) {

					const nextCard = this.cardsInPlay[0];

					setTimeout(() => {
						this.moveCardToDiscard(nextCard);
					}, 80);

				}

			}, 80);

		},

		executeAction(actionId) {

			if (this.battleMode || this.secondLifeMode)
				return;

			switch (actionId) {

				case "plus":
					this.playPlus();
					break;

				case "minus":
					this.playMinus();
					break;

				case "equal":
					this.playEqual();
					break;

				case "color":
					this.askColorMove();
					break;

				case "suit":
					this.askSuitMove();
					break;

				case "value":
					this.askValueMove();
					break;

				case "card":
					this.askSpecificCardMove();
					break;

				case "combat":
					this.playCombat();
					break;

				case "purple":
					this.playPurple();
					break;

				case "fion":
					this.playFion();
					break;

				case "perfect":
					this.askPerfectMove();
					break;

				case "ouais":
					this.playOuaisTinquietes();
					break;

				case "cachecache":
					this.askCacheCacheMove();
					break;

				case "jumelles":
					this.playJumelles();
					break;

				case "jack":
					this.askJackMove();
					break;

				case "pinte":
					this.playPinte();
					break;

				case "freres":
					this.playFreresDeRots();
					break;

				case "sexe":
					this.playSexe();
					break;

				case "damidot":
					this.playDamidot();
					break;

			}

		},

		playPurple() {

			if (this.deck.length < 2) {
				this.showGamePopup("Impossible", "Pas assez de cartes.");
				return;
			}

			const cards = [];

			cards.push(this.drawCardFaceUp());

			setTimeout(() => {
				cards.push(this.drawCardFaceUp());
			}, 220);

			setTimeout(() => {

				const success =
					cards.length === 2 &&
					cards[0].color !== cards[1].color;

				this.showMoveResult("Purple", success);

			}, 900);

		},

		playCacheCache() {

			if (this.deck.length < 3) {
				this.showGamePopup(
					"Impossible",
					"Pas assez de cartes."
				);
				return;
			}

			this.drawCardFaceUp();

			setTimeout(() => {
				this.drawCardFaceDown();
			}, 320);

			setTimeout(() => {
				this.drawCardFaceDown();
			}, 600);

		},

		playPlus() {

			const referenceCard = this.getLastReferenceCard();

			if (!referenceCard) {
				this.showGamePopup("Impossible", "Aucune carte de référence.");
				return;
			}

			const card = this.drawCardFaceUp();

			setTimeout(() => {

				const aceModeForMove = this.getBestAceModeForMove(
					[referenceCard, card],
					mode => {
						return this.getCardPower(card, mode) >
							this.getCardPower(referenceCard, mode);
					}
				);

				const success =
					this.getCardPower(card, aceModeForMove) >
					this.getCardPower(referenceCard, aceModeForMove);

				this.showMoveResult("+", success);

			}, 600);

		},

		playMinus() {

			const referenceCard = this.getLastReferenceCard();

			if (!referenceCard) {
				this.showGamePopup("Impossible", "Aucune carte de référence.");
				return;
			}

			const card = this.drawCardFaceUp();

			setTimeout(() => {

				const aceModeForMove = this.getBestAceModeForMove(
					[referenceCard, card],
					mode => {
						return this.getCardPower(card, mode) <
							this.getCardPower(referenceCard, mode);
					}
				);

				const success =
					this.getCardPower(card, aceModeForMove) <
					this.getCardPower(referenceCard, aceModeForMove);

				this.showMoveResult("-", success);

			}, 600);

		},
		playEqual() {

			const referenceCard = this.getLastReferenceCard();

			if (!referenceCard) {
				this.showGamePopup("Impossible", "Aucune carte de référence.");
				return;
			}

			const card = this.drawCardFaceUp();

			setTimeout(() => {

				const success = card.value === referenceCard.value;

				this.showMoveResult("=", success);

				if (success) {
					this.openShotDistribution(
						1,
						this.currentPlayer.id
					);
				}

			}, 600);

		},

		playColor(expectedColor) {

			const card = this.drawCardFaceUp();

			setTimeout(() => {
				this.showMoveResult(
					"Couleur",
					card.color === expectedColor
				);
			}, 600);

		},

		playSuit(expectedSuit) {

			const card = this.drawCardFaceUp();

			setTimeout(() => {
				this.showMoveResult(
					"Signe",
					card.suit === expectedSuit
				);
			}, 600);

		},

		playValue(expectedValue) {

			const card = this.drawCardFaceUp();

			setTimeout(() => {

				const success = card.value === expectedValue;

				this.showMoveResult("Valeur", success);

				if (success) {
					this.openShotDistribution(
						1,
						this.currentPlayer.id
					);
				}

			}, 600);

		},

		playSpecificCard(expectedValue, expectedSuit) {

			const card = this.drawCardFaceUp();

			setTimeout(() => {

				const success =
					card.value === expectedValue &&
					card.suit === expectedSuit;

				this.showMoveResult("Carte", success);

				if (success) {

					this.players.forEach(player => {

						if (player.id === this.currentPlayer.id)
							return;

						this.addSipsToPlayer(
							player,
							10
						);

					});

				}

			}, 600);

		},

		playFion() {

			if (this.deck.length < 2) {
				this.showGamePopup("Impossible", "Pas assez de cartes.");
				return;
			}

			const cards = [];

			cards.push(this.drawCardFaceUp());

			setTimeout(() => {
				cards.push(this.drawCardFaceUp());
			}, 220);

			setTimeout(() => {

				const success =
					cards.length === 2 &&
					cards[0].color === cards[1].color;

				this.showMoveResult("Fion", success);

			}, 900);

		},

		playOuaisTinquietes() {

			if (this.deck.length < 4) {
				this.showGamePopup("Impossible", "Pas assez de cartes.");
				return;
			}

			const cards = this.drawMoveCards(4);

			setTimeout(() => {

				const colors = this.countColors(cards);

				const red = colors.red || 0;
				const black = colors.black || 0;

				const success =
					(red === 3 && black === 1) ||
					(red === 1 && black === 3);

				this.showMoveResult("Ouais t'inquiètes", success);

			}, 1100);

		},

		playJumelles() {

			if (this.deck.length < 4) {
				this.showGamePopup("Impossible", "Pas assez de cartes.");
				return;
			}

			const cards = this.drawMoveCards(4);

			setTimeout(() => {

				this.showMoveResult(
					"Jumelles",
					this.hasSameValue(cards)
				);

			}, 1100);

		},

		playJack(prediction) {

			if (this.deck.length < 4) {
				this.showGamePopup("Impossible", "Pas assez de cartes.");
				return;
			}

			const cards = this.drawMoveCards(4);

			setTimeout(() => {

				const possibleSums = this.getPossibleJackSums(cards);

				let success = false;

				if (prediction === "higher") {
					success = possibleSums.some(sum => sum > 30);
				}

				if (prediction === "lower") {
					success = possibleSums.some(sum => sum < 30);
				}

				if (prediction === "equal") {
					success = possibleSums.some(sum => sum === 30);
				}

				this.showMoveResult("Jack", success);

			}, 1100);

		},

		playPinte() {

			if (this.deck.length < 5) {
				this.showGamePopup("Impossible", "Pas assez de cartes.");
				return;
			}

			const cards = this.drawMoveCards(5);

			setTimeout(() => {

				const faceCards = cards.filter(card => {
					return this.isFaceCard(card);
				});

				this.showMoveResult(
					"Pinte",
					faceCards.length >= 2
				);

			}, 1300);

		},

		playFreresDeRots() {

			if (this.deck.length < 6) {
				this.showGamePopup("Impossible", "Pas assez de cartes.");
				return;
			}

			this.openChoicePopup({
				title: "Frères de rots",
				message: "Choisis une valeur. Si le move passe, tu distribues 1 gorgée par apparition.",
				type: "buttons",

				options: this.battleValues.map(value => {
					return {
						label: value.label,
						value: value.id
					};
				}),

				onConfirm: predictedValue => {
					this.resolveFreresDeRots(predictedValue);
				}
			});

		},

		resolveFreresDeRots(predictedValue) {

			const cards = this.drawMoveCards(6);

			setTimeout(() => {

				const colors = this.countColors(cards);

				const success =
					(colors.red || 0) === 3 &&
					(colors.black || 0) === 3;

				const occurrences = cards.filter(card => {
					return card.value === predictedValue;
				}).length;

				this.showMoveResult("Frères de rots", success);

				if (success && occurrences > 0) {
					this.openSipDistribution(
						occurrences,
						this.currentPlayer.id
					);
				}

			}, 1500);

		},

		playSexe() {

			if (this.deck.length < 10) {
				this.showGamePopup("Impossible", "Pas assez de cartes.");
				return;
			}

			const cards = this.drawMoveCards(10);

			setTimeout(() => {

				let aceCount = 0;

				cards.forEach(card => {

					if (card.value !== "ace")
						return;

					if (card.suit === "hearts") {
						aceCount += 2;
					}
					else {
						aceCount += 1;
					}

				});

				const success = aceCount >= 2;

				const bonusSips =
					Math.max(0, aceCount - 2);

				this.showMoveResult(
					"Le sexe / le cul",
					success
				);

				if (success && bonusSips > 0) {
					this.openSipDistribution(
						bonusSips,
						this.currentPlayer.id
					);
				}

			}, 2300);

		},

		animateCard({
			backImage,
			frontImage,
			fromElement,
			toElement,
			flip = false,
			startFaceUp = false,
			endFaceUp = true,
			onStart,
			onComplete
		}) {

			const fromRect = fromElement.getBoundingClientRect();
			const toRect = toElement.getBoundingClientRect();

			const isSecondLifeTarget =
				toElement &&
				(
					toElement.classList.contains("second-life-card") ||
					toElement.closest(".second-life-card")
				);

			const cardWidth = isSecondLifeTarget ? 175 : 150;
			const cardHeight = isSecondLifeTarget ? 245 : 210;

			const flyingCard = {
				id: `flying-${Date.now()}-${Math.random()}`,

				backImage: backImage,
				frontImage: frontImage,

				x: fromRect.left + fromRect.width / 2 - cardWidth / 2,
				y: fromRect.top + fromRect.height / 2 - cardHeight / 2,

				toX: toRect.left + toRect.width / 2 - cardWidth / 2,
				toY: toRect.top + toRect.height / 2 - cardHeight / 2,

				width: cardWidth,
				height: cardHeight,

				rotation: Math.random() * 10 - 5,
				scale: 0.95,

				flipped: startFaceUp
			};

			this.flyingCards.push(flyingCard);

			if (onStart) {
				onStart();
			}

			requestAnimationFrame(() => {

				requestAnimationFrame(() => {

					flyingCard.x = flyingCard.toX;
					flyingCard.y = flyingCard.toY;
					flyingCard.rotation = 0;
					flyingCard.scale = 1;

					if (flip) {
						flyingCard.flipped = endFaceUp;
					}

				});

			});

			setTimeout(() => {

				if (onComplete) {
					onComplete();
				}

				setTimeout(() => {

					this.flyingCards = this.flyingCards.filter(card => {
						return card.id !== flyingCard.id;
					});

				}, 30);

			}, 480);

		},

		getFlyingCardStyle(flyingCard) {

			return {
				"--battle-duration": `${flyingCard.duration || 480}ms`,
				width: `${flyingCard.width || 150}px`,
				height: `${flyingCard.height || 210}px`,
				transform: `translate(${flyingCard.x}px, ${flyingCard.y}px) scale(${flyingCard.scale}) rotate(${flyingCard.rotation}deg)`
			};

		},

		getCardDisplayImage(card) {

			if (card.faceUp)
				return card.image;

			return this.backCardImage;

		},

		toggleCardFace(card) {

			card.faceUp = !card.faceUp;

		},

		animateLayoutChange(callback) {

			const cardElementsBefore = Array.from(
				document.querySelectorAll(".cards-container .card:not(.invisible)")
			);

			const oldPositions = new Map();

			cardElementsBefore.forEach(element => {
				oldPositions.set(
					element.dataset.cardKey,
					element.getBoundingClientRect()
				);
			});

			callback();

			this.$nextTick(() => {

				const cardElementsAfter = Array.from(
					document.querySelectorAll(".cards-container .card:not(.invisible)")
				);

				cardElementsAfter.forEach(element => {

					const oldPosition = oldPositions.get(element.dataset.cardKey);

					if (!oldPosition)
						return;

					const newPosition = element.getBoundingClientRect();

					const deltaX = oldPosition.left - newPosition.left;
					const deltaY = oldPosition.top - newPosition.top;

					if (deltaX === 0 && deltaY === 0)
						return;

					element.style.transition = "none";
					element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

					requestAnimationFrame(() => {

						element.style.transition = "transform 0.32s ease";
						element.style.transform = "translate(0, 0)";

						setTimeout(() => {
							element.style.transition = "";
							element.style.transform = "";
						}, 320);

					});

				});

			});

		},

		getPlayerPlayedCardsCount(playerId) {

			return this.playersStats[playerId] || 0;

		},

		resetDeckOnly() {

			const cardsFromTable = this.cardsInPlay.map(card => {
				return this.cleanCardForDeck(card);
			});

			const cardsFromDiscard = this.discardPile.map(card => {
				return this.cleanCardForDeck(card);
			});

			this.deck = [
				...this.deck,
				...cardsFromTable,
				...cardsFromDiscard
			];

			this.cardsInPlay = [];
			this.secondLifeCards = [];
			this.discardPile = [];

			this.shuffleDeck();

			this.playersStats = {};
			this.cardsPlayedThisTurn = 0;
			this.lockedPlayedCardsForSips = null;
			this.lockedDiscardSips = null;
			this.turnFailed = false;

			this.players.forEach(player => {
				player.hp = 0;
				player.savedOnce = false;
			});

		},

		nextTurn() {

			if (this.players.length === 0)
				return;

			if (!this.shiftPressed && this.cardsPlayedThisTurn < 3)
				return;

			if (!this.shiftPressed && this.turnFailed)
				return;

			this.currentPlayerIndex++;

			if (this.currentPlayerIndex >= this.players.length) {
				this.currentPlayerIndex = 0;
			}

			this.clearPlayArea();
			this.resetDamidotState();
			this.sipDivider = 1;
			this.turnFailed = false;
			this.cardsPlayedThisTurn = 0;

		},

		addPlayer() {

			this.startPendingPlayerCreation();

		},

		startPendingPlayerCreation() {

			if (this.pendingPlayerCreation)
				return;

			this.pendingPlayerCreation = true;
			this.pendingPlayerName = "";

			this.$nextTick(() => {

				if (this.$refs.pendingPlayerInput) {
					this.$refs.pendingPlayerInput.focus();
				}

			});

		},

		cancelPendingPlayerCreation() {

			this.pendingPlayerCreation = false;
			this.pendingPlayerName = "";

		},

		confirmPendingPlayerCreation() {

			const playerName =
				this.pendingPlayerName.trim();

			if (!playerName) {
				this.cancelPendingPlayerCreation();
				return;
			}

			const newPlayer = {
				id: Date.now(),
				name: playerName,
				hp: 0,
				savedOnce: false,
				sessionSips: 0
			};

			this.players.push(newPlayer);

			this.pendingPlayerCreation = false;
			this.pendingPlayerName = "";

			this.$nextTick(() => {
				this.updateSipAnimationPositions();
			});

		},

		startEditingPlayer(player) {
			if (!player)
				return;

			if (this.editingPlayerId !== null && this.editingPlayerId !== player.id) {
				this.cancelEditingPlayer();
			}

			this.editingPlayerId = player.id;
			this.editingPlayerName = player.name;

			this.$nextTick(() => {
				requestAnimationFrame(() => {
					const playerElement = document.querySelector(`[data-player-id="${player.id}"]`);

					if (!playerElement)
						return;

					const input = playerElement.querySelector(".player-name-input");

					if (!input)
						return;

					input.focus();
					input.select();
				});
			});
		},

		confirmEditingPlayer(player) {
			if (!player)
				return;

			if (this.editingPlayerId !== player.id)
				return;

			const newName = this.editingPlayerName.trim();

			if (newName) {
				player.name = newName;
			}

			this.editingPlayerId = null;
			this.editingPlayerName = "";
		},

		cancelEditingPlayer() {

			this.editingPlayerId = null;
			this.editingPlayerName = "";

		},

		removePlayer(player) {

			if (!player)
				return;

			if (this.players.length <= 1) {
				this.showGamePopup(
					"Impossible",
					"Il faut garder au moins un joueur."
				);
				return;
			}

			const removedIndex =
				this.players.findIndex(existingPlayer => {
					return existingPlayer.id === player.id;
				});

			if (removedIndex === -1)
				return;

			this.players.splice(removedIndex, 1);

			this.playerSipAnimations =
				this.playerSipAnimations.filter(animation => {
					return animation.playerId !== player.id;
				});

			this.$delete(this.playersStats, player.id);

			if (this.currentPlayerIndex >= this.players.length) {
				this.currentPlayerIndex = 0;
			}

			if (removedIndex < this.currentPlayerIndex) {
				this.currentPlayerIndex--;
			}

			if (this.editingPlayerId === player.id) {
				this.cancelEditingPlayer();
			}

		},

		updatePlayersLives() {

			const shouldHaveLife = this.discardSips >= 10;

			this.players.forEach(player => {

				if (shouldHaveLife && !player.savedOnce) {
					player.hp = 1;
				}

				if (!shouldHaveLife) {
					player.hp = 0;
					player.savedOnce = false;
				}

			});

		},

		resetAndShuffleDeck() {

			this.resetDeckOnly();

		},


		cleanCardForDeck(card) {

			return {
				id: card.id,
				suit: card.suit,
				value: card.value,
				color: card.color,
				image: card.image
			};

		},

	},

	beforeDestroy() {

		window.removeEventListener(
			"resize",
			this.updateSipAnimationPositions
		);

		window.removeEventListener("keydown", this.handleKeyDown);
		window.removeEventListener("keyup", this.handleKeyUp);
		window.removeEventListener(
			"click",
			this.closeAceMenu
		);

	},

	mounted() {

		window.addEventListener(
			"resize",
			this.updateSipAnimationPositions
		);

		window.addEventListener("keydown", this.handleKeyDown);
		window.addEventListener("keyup", this.handleKeyUp);
		window.addEventListener(
			"click",
			this.closeAceMenu
		);

		this.loadSettings();

		this.createDeck();

		this.shuffleDeck();

		this.updatePlayAreaSize();

		window.addEventListener("resize", this.updatePlayAreaSize);

	}

});