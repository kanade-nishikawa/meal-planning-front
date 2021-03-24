<template>
  <div class="sideContent">
    栄養バランス<br />
    エネルギー(kcal)：{{ sumPoints.energy }}<br />
    主食：{{ sumPoints.stapleFood }}<br />
    副菜：{{ sumPoints.sideDish }}<br />
    主菜：{{ sumPoints.mainDish }}<br />
    牛乳・乳製品：{{ sumPoints.dairyProduct }}<br />
    果物：{{ sumPoints.fruit }}<br />
    <br />
    <br />
    適量<br />
    エネルギー(kcal)：{{ amount ? `${amount.energyMin} ～ ${amount.energyMax}` : '' }}<br />
    主食：{{ amount ? `${amount.stapleFoodMin} ～ ${amount.stapleFoodMax}` : '' }}<br />
    副菜：{{ amount ? `${amount.sideDishMin} ～ ${amount.sideDishMax}` : '' }}<br />
    主菜：{{ amount ? `${amount.mainDishMin} ～ ${amount.mainDishMax}` : '' }}<br />
    牛乳・乳製品：{{ amount ? `${amount.dairyProductMin} ～ ${amount.dairyProductMax}` : '' }}<br />
    果物：{{ amount ? `${amount.fruitMin} ～ ${amount.fruitMax}` : '' }}<br />
    <br />
    入力データ<br />
    性別:{{ genderDisp }}<br />
    年齢：{{ info.age }}歳<br />
    活動量：{{ acitveLevelDisp }}<br />
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
  }
};
</script>
