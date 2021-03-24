<template>
  <div class="sideContent">
    適量<br />
    エネルギー：
    年齢：{{ age }}歳
    活動量：{{ acitveLevelDisp }}
  </div>
</template>

<script>
export default {
  data () {
    const addElements = {
      acitveLevelDisp: '',
      activeLevels: [
        {
          value: 'low',
          label: '低い'
        },
        {
          value: 'middle',
          label: '普通'
        }
      ]
    };

    return Object.assign(addElements, this.$store.commit('info/getters'));
  },
  watch: {
    activeLevel (newVal, oldVal) {
      this.convertKey('acitveLevelDisp', this.activeLevels, newVal);
    }
  },
  methods: {
    convertKey (keyName, options, value) {
      console.log(options.find(x => x.value === value))
      this[keyName] = options.find(x => x.value === value)?.label;
    }
  }
}
</script>
