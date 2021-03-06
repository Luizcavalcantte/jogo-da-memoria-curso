let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];

    if (card.flipped || this.lockMode) {
      return false;
    }
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },
  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGamoOver() {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  techs: [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
  ],
  cards: null,

  createCardsFromTechs: function () {
    this.cards = [];
    this.techs.forEach((tech) => {
      this.cards.push(this.createPairFromTech(tech));
    });
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  createPairFromTech: function (tech) {
    return [
      { id: this.createIdFromTech(tech), icon: tech, flipped: false },
      { id: this.createIdFromTech(tech), icon: tech, flipped: false },
    ];
  },

  createIdFromTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },

  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let ramdomIndex = 0;
    while (currentIndex !== 0) {
      ramdomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      //o codigo a baixo é responssavel por inverter os valores de current e random index
      [this.cards[ramdomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[ramdomIndex],
      ];
    }
  },
};
