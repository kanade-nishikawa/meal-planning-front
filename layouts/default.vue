<template>
  <div>
    <header>
      {{ sumStapleFood }}
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

    <info-modal v-if="isInfoModal" />
  </div>
</template>

<script>
import InfoModal from '@/components/InfoModal.vue';

export default {
  components: { InfoModal },
  data () {
    return {
      isMenu: false,
      isInfoModal: false
    };
  },
  mounted () {
    this.$nuxt.$on('closeInfoModal', this.closeInfoModal);
  },
  methods: {
    openInfoModal () {
      this.isMenu = false;
      this.isInfoModal = true;
    },
    closeInfoModal () {
      this.isInfoModal = false;
    }
  }
};
</script>
