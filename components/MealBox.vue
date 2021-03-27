<template>
  <li class="mealBox">
    <h1 :class="['mealTitle', { [id]: id }]">
      <i class="icon" />
      {{ title }}
    </h1>
    <ul v-if="meals.length" :id="id" class="dispArea">
      <li
        v-for="(meal, index) in meals"
        :key="index"
        class="meal"
      >
        <span @mousedown="mouseDownMenu($event, meal.id)">
          {{
            meal.name
          }}
        </span>
        <button @click="removeItem(id, index)">
          <i
            class="closeIcon"
          />
        </button>
      </li>
    </ul>
    <div v-else :id="id" class="dropArea">
      <p>
        ここに食事を
        <br />
        ドロップしてください！
      </p>
    </div>
    <div class="point">
      <span class="stapleFood">{{ points.stapleFood }}</span>
      <span class="sideDish">{{ points.sideDish }}</span>
      <span class="mainDish">{{ points.mainDish }}</span>
      <span class="dairyProduct">{{ points.dairyProduct }}</span>
      <span class="fruit">{{ points.fruit }}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    meals: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      points: {
        energy: 0,
        stapleFood: 0,
        sideDish: 0,
        mainDish: 0,
        dairyProduct: 0,
        fruit: 0
      }
    };
  },
  watch: {
    meals () {
      this.points = this.meals.reduce((obj, meal) => {
        obj.energy += meal.kcal || 0;
        obj.stapleFood += meal.points.stapleFood || 0;
        obj.sideDish += meal.points.sideDish || 0;
        obj.mainDish += meal.points.mainDish || 0;
        obj.dairyProduct += meal.points.dairyProduct || 0;
        obj.fruit += meal.points.fruit || 0;
        return obj;
      }, {
        energy: 0,
        stapleFood: 0,
        sideDish: 0,
        mainDish: 0,
        dairyProduct: 0,
        fruit: 0
      });
    }
  },
  methods: {
    /**
     * バツアイコンが押されたときに、対象の要素を消す
     */
    removeItem (category, index) {
      this.$props.meals.splice(index, 1);
    }
  }
};
</script>
