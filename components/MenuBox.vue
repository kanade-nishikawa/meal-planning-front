<template>
  <ul class="menuArea">
    <li class="menuLabelArea">
      <ul>
        <li
          v-for="label of categories"
          :key="label"
          :class="['menuLabel', label, { active: viewCategory === label}]" @click="changeCategory(label)"
        >
          {{ convert(label) }}
        </li>
      </ul>
    </li>
    <li class="menuBoxArea">
      <ul>
        <li
          v-for="menu of filterMenu"
          :key="menu.id"
          class="menuBox"
          @mousedown="mouseDownMenu($event, menu.id)"
        >
          {{
            menu.name
          }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      categories: [],
      viewCategory: '',
      codeMst: this.$store.getters['codeMaster/categories']
    };
  },
  computed: {
    filterMenu () {
      return this.$props.menus.filter(menu => menu.category === this.$data.viewCategory);
    }
  },
  mounted () {
    // 今回のカテゴリ全種を配列に入れておく
    this.$data.categories = this.$props.menus.reduce((arr, menu, index, self) => {
      if (self.findIndex(m => m.category === menu.category) === index) {
        arr.push(menu.category);
      }
      return arr;
    }, []);

    // 初期表示を指定
    this.$data.viewCategory = this.$data.categories[0];
  },
  methods: {
    changeCategory (newCategory) {
      this.$data.viewCategory = newCategory;
    },
    convert (val) {
      return this.$data.codeMst.find(x => x.value === val)?.label;
    },
    /**
     * 以下、index.vueのmethodsを呼び出す用
     */
    mouseDownMenu (event, id) {
      this.$nuxt.$emit('mouseDownMenu', event, id);
    }
  }
};
</script>
