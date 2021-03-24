export const state = () => ({
  genders: [
    {
      value: 'male',
      label: '男'
    },
    {
      value: 'female',
      label: '女'
    }
  ],
  activeLevels: [
    {
      value: 'low',
      label: '低い'
    },
    {
      value: 'middle',
      label: '普通'
    }
  ],
  amounts: [
    {
      type: 1,
      energyMin: 1600,
      energyMax: 2000,
      stapleFoodMin: 4,
      stapleFoodMax: 5,
      sideDishMin: 5,
      sideDishMax: 6,
      mainDishMin: 3,
      mainDishMax: 4,
      dairyProductMin: 2,
      dairyProductMax: 2,
      fruitMin: 2,
      fruitMax: 2
    },
    {
      type: 2,
      energyMin: 2000,
      energyMax: 2400,
      stapleFoodMin: 5,
      stapleFoodMax: 7,
      sideDishMin: 5,
      sideDishMax: 6,
      mainDishMin: 3,
      mainDishMax: 5,
      dairyProductMin: 2,
      dairyProductMax: 2,
      fruitMin: 2,
      fruitMax: 2
    },
    {
      type: 3,
      energyMin: 2400,
      energyMax: 2800,
      stapleFoodMin: 7,
      stapleFoodMax: 8,
      sideDishMin: 6,
      sideDishMax: 7,
      mainDishMin: 4,
      mainDishMax: 6,
      dairyProductMin: 2,
      dairyProductMax: 3,
      fruitMin: 2,
      fruitMax: 3
    }
  ]
});

export const getters = {
  genders (state) {
    return state.genders;
  },
  activeLevels (state) {
    return state.activeLevels;
  },
  amount: (state) => (type) => {
    return state.amounts.find(x => x.type === type);
  }
};
