<template>
  <div class="wrapper">
    <div class="infoModal">
      <h1 class="infoModalHeader">
        適量設定
        <a @click="closeInfoModal()"><i class="closeIcon" /></a>
      </h1>
      <div class="infoContent">
        <ValidationObserver ref="obs" v-slot="{ invalid }">
          <form @submit.prevent>
            <div class="inputField">
              <p class="itemName">
                性別
              </p>
              <ValidationProvider v-slot="{ errors }" name="gender" rules="required">
                <radio v-model="gender" rules="required" name="gender" :options="genders" :checked="gender" />
                <div v-if="errors.length" class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <div class="inputField">
              <p class="itemName">
                年齢
              </p>
              <number v-model="age" rules="required|integer" :min="0" :maxlength="3" span-content="歳" />
            </div>
            <div class="inputField">
              <p class="itemName">
                活動量
              </p>
              <ValidationProvider v-slot="{ errors }" name="activeLevel" rules="required">
                <radio v-model="activeLevel" rules="required" name="activeLevel" :options="activeLevels" :checked="activeLevel" />
                <div v-if="errors.length" class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <button class="confirmButton" :disabled="invalid" @click="setInfo()">
              完了
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import Number from '~/components/parts/Number.vue';
import Radio from '~/components/parts/Radio.vue';

export default {
  components: { Number, Radio },
  data () {
    // storeのデータを取得。ある場合はstoreの値を初期値としたいため
    const info = this.$store.getters['info/state'];

    return {
      gender: info?.gender,
      age: info?.age,
      activeLevel: info?.activeLevel,
      genders: this.$store.getters['codeMaster/genders'],
      activeLevels: this.$store.getters['codeMaster/activeLevels']
    };
  },
  methods: {
    setInfo () {
      this.$store.commit('info/setter', { gender: this.gender, age: this.age, activeLevel: this.activeLevel });
      this.closeInfoModal();
    },
    closeInfoModal () {
      this.$nuxt.$emit('closeInfoModal');
    }
  }
};
</script>
