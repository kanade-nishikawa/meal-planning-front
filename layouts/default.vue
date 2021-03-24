<template>
  <div>
    <header>
      <button :class="['menuButton', { isMenu }]" @click="isMenu = !isMenu">
        <i class="icon" />
      </button>
      <ul v-if="isMenu" class="headerMenu">
        <li class="info">
          <a @click="openInfoModal()">
            <i class="icon" /><span>適量設定</span>
          </a>
        </li>
      </ul>
    </header>
    <Nuxt />
    <side-content />

    <div v-if="isInfoModal" class="wrapper">
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
                <radio v-model="gender" rules="required" name="gender" :options="genders" :checked="gender" />
              </div>
              <div class="inputField">
                <p class="itemName">
                  年齢
                </p>
                <number v-model="age" rules="required|integer" :maxlength="3" span-content="歳" />
              </div>
              <div class="inputField">
                <p class="itemName">
                  活動量
                </p>
                {{ activeLevel }}
                <radio v-model="activeLevel" rules="required" name="activeLevel" :options="activeLevels" :checked="activeLevel" />
              </div>
              <button class="confirmButton" :disabled="invalid" @click="setInfo()">
                完了
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Number from '@/components/Number.vue';
import Radio from '@/components/Radio.vue';
import SideContent from '@/components/SideContent.vue'

export default {
  components: { Number, Radio, SideContent },
  data: () => {
    return {
      gender: null,
      age: null,
      activeLevel: null,
      isMenu: false,
      isInfoModal: false,
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
      ]
    }
  },
  methods: {
    openInfoModal () {
      this.isMenu = false;
      this.isInfoModal = true;
    },
    closeInfoModal () {
      this.isInfoModal = false;
    },
    setInfo () {
      this.$store.commit('info/setters', { gender: this.gender, age: this.age, activeLevel: this.activeLevel });
      this.closeInfoModal();
    }
  }
}
</script>
