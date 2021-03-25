<template>
  <div class="sideContent">
    <p>栄養バランス</p>
    <p :class="{ poor: checkNutrients('energy', sumPoints.energy) }">
      エネルギー(kcal)：{{ sumPoints.energy }}
    </p>
    <p :class="{ poor: checkNutrients('stapleFood', sumPoints.stapleFood) }">
      主食：{{ sumPoints.stapleFood }}
    </p>
    <p :class="{ poor: checkNutrients('sideDish', sumPoints.sideDish) }">
      副菜：{{ sumPoints.sideDish }}
    </p>
    <p :class="{ poor: checkNutrients('mainDish', sumPoints.mainDish) }">
      主菜：{{ sumPoints.mainDish }}
    </p>
    <p :class="{ poor: checkNutrients('dairyProduct', sumPoints.dairyProduct) }">
      牛乳・乳製品：{{ sumPoints.dairyProduct }}
    </p>
    <p :class="{ poor: checkNutrients('fruit', sumPoints.fruit) }">
      果物：{{ sumPoints.fruit }}
    </p>
    <br />
    <br />
    <p>適量</p>
    <p>エネルギー(kcal)：{{ amount ? `${amount.energyMin} ～ ${amount.energyMax}` : '' }}</p>
    <p>主食：{{ amount ? `${amount.stapleFoodMin} ～ ${amount.stapleFoodMax}` : '' }}</p>
    <p>副菜：{{ amount ? `${amount.sideDishMin} ～ ${amount.sideDishMax}` : '' }}</p>
    <p>主菜：{{ amount ? `${amount.mainDishMin} ～ ${amount.mainDishMax}` : '' }}</p>
    <p>牛乳・乳製品：{{ amount ? `${amount.dairyProductMin} ～ ${amount.dairyProductMax}` : '' }}</p>
    <p>果物：{{ amount ? `${amount.fruitMin} ～ ${amount.fruitMax}` : '' }}</p>
    <br />
    <p>入力データ</p>
    <p>性別:{{ genderDisp }}</p>
    <p>年齢：{{ info.age }}歳</p>
    <p>活動量：{{ acitveLevelDisp }}</p>
  </div>
</template>

<script>
export default {
  props: {
    sumPoints: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      genders: this.$store.getters['codeMaster/genders'],
      activeLevels: this.$store.getters['codeMaster/activeLevels']
    };
  },
  computed: {
    info () {
      return this.$store.getters['info/state'];
    },
    genderDisp () {
      return this.genders.find(x => x.value === this.info.gender)?.label;
    },
    acitveLevelDisp () {
      return this.activeLevels.find(x => x.value === this.info.activeLevel)?.label;
    },
    amount () {
      return (this.info.age < 10 && this.info.age >= 70) ||
        (this.info.gender === 'female' && this.info.activeLevel === 'low')
        ? this.$store.getters['codeMaster/amount'](1)
        : this.info.gender === 'female' || (this.info.gender === 'male' && this.info.age < 12) ||
           (this.info.gender === 'male' && this.info.age >= 12 && this.info.activeLevel === 'low')
          ? this.$store.getters['codeMaster/amount'](2)
          : this.info.age ? this.$store.getters['codeMaster/amount'](3) : null;
    }
  },
  methods: {
    checkNutrients (category, nutrient) {
      if (this.amount) {
        if (this.amount[`${category}Min`] > nutrient || this.amount[`${category}Max`] < nutrient) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
