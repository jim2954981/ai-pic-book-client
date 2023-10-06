Component({
  properties: {
    imageSrc: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    time: {
      type: String,
      value: ''
    },
    cardId: {
      type: String,
      value: ''
    }
  },
  methods: {
    onCardTap(event) {
      const cardId = event.currentTarget.dataset.id;
      this.triggerEvent('cardTap', { cardId });
    }
  }
});