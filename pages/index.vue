<template>
  <div class="container">
    <div class="mainContents">
      <div class="meals">
        <h1>
          <i class="icon" />
          献立
        </h1>
        <ul class="mealArea">
          <li class="mealBox">
            <h1 class="mealTitle breakfast">
              <i class="icon" />
              朝ごはん
            </h1>
            <ul v-if="meals.breakfast.length" id="breakfast" class="dispArea">
              <li
                v-for="(meal, index) in meals.breakfast"
                :key="index"
                class="meal"
              >
                <span @mousedown="mouseDownMenu($event, meal.id)">
                  {{
                    meal.name
                  }}
                </span>
                <button @click="removeItem('breakfast', index)">
                  <i
                    class="closeIcon"
                  />
                </button>
              </li>
            </ul>
            <div v-else id="breakfast" class="dropArea">
              <p>
                ここに食事を
                <br />
                ドロップしてください！
              </p>
            </div>
            <div class="point">
              <span class="stapleFood">{{ points.breakfast.stapleFood }}</span>
              <span class="sideDish">{{ points.breakfast.sideDish }}</span>
              <span class="mainDish">{{ points.breakfast.mainDish }}</span>
              <span class="dairyProduct">{{ points.breakfast.dairyProduct }}</span>
              <span class="fruit">{{ points.breakfast.fruit }}</span>
            </div>
          </li>

          <li class="mealBox">
            <h1 class="mealTitle lunch">
              <i class="icon" />
              昼ごはん
            </h1>
            <ul v-if="meals.lunch.length" id="lunch" class="dispArea">
              <li
                v-for="(meal, index) in meals.lunch"
                :key="index"
                class="meal"
              >
                <span @mousedown="mouseDownMenu($event, meal.id)">
                  {{
                    meal.name
                  }}

                </span>
                <button @click="removeItem('lunch', index)">
                  <i class="closeIcon" />
                </button>
              </li>
            </ul>
            <div v-else id="lunch" class="dropArea">
              <p>
                ここに食事を
                <br />
                ドロップしてください！
              </p>
            </div>
            <div class="point">
              <span class="stapleFood">{{ points.lunch.stapleFood }}</span>
              <span class="sideDish">{{ points.lunch.sideDish }}</span>
              <span class="mainDish">{{ points.lunch.mainDish }}</span>
              <span class="dairyProduct">{{ points.lunch.dairyProduct }}</span>
              <span class="fruit">{{ points.lunch.fruit }}</span>
            </div>
          </li>
          <li class="mealBox">
            <h1 class="mealTitle dinner">
              <i class="icon" />
              夜ごはん
            </h1>
            <ul v-if="meals.dinner.length" id="dinner" class="dispArea">
              <li
                v-for="(meal, index) in meals.dinner"
                :key="index"
                class="meal"
              >
                <span @mousedown="mouseDownMenu($event, meal.id)">
                  {{
                    meal.name
                  }}
                </span>
                <button @click="removeItem('dinner', index)">
                  <i class="closeIcon" />
                </button>
              </li>
            </ul>
            <div v-else id="dinner" class="dropArea">
              <p>
                ここに食事を
                <br />
                ドロップしてください！
              </p>
            </div>
            <div class="point">
              <span class="stapleFood">{{ points.dinner.stapleFood }}</span>
              <span class="sideDish">{{ points.dinner.sideDish }}</span>
              <span class="mainDish">{{ points.dinner.mainDish }}</span>
              <span class="dairyProduct">{{ points.dinner.dairyProduct }}</span>
              <span class="fruit">{{ points.dinner.fruit }}</span>
            </div>
          </li>
          <li class="mealBox">
            <h1 class="mealTitle snack">
              <i class="icon" />
              間食
            </h1>
            <ul v-if="meals.snack.length" id="snack" class="dispArea">
              <li
                v-for="(meal, index) in meals.snack"
                :key="index"
                class="meal"
              >
                <span @mousedown="mouseDownMenu($event, meal.id)">
                  {{
                    meal.name
                  }}
                </span>
                <button @click="removeItem('snack', index)">
                  <i class="closeIcon" />
                </button>
              </li>
            </ul>
            <div v-else id="snack" class="dropArea">
              <p>
                ここに食事を
                <br />
                ドロップしてください！
              </p>
            </div>
            <div class="point">
              <span class="stapleFood">{{ points.snack.stapleFood }}</span>
              <span class="sideDish">{{ points.snack.sideDish }}</span>
              <span class="mainDish">{{ points.snack.mainDish }}</span>
              <span class="dairyProduct">{{ points.snack.dairyProduct }}</span>
              <span class="fruit">{{ points.snack.fruit }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="menus">
        <h1>
          <i class="icon" />
          レシピ
        </h1>
        <ul class="menuArea">
          <li
            v-for="menu of menus"
            :key="menu.id"
            class="menuBox"
            @mousedown="mouseDownMenu($event, menu.id)"
          >
            {{
              menu.name
            }}
          </li>
        </ul>
      </div>
    </div>
    <side-content :sum-points="sumPoints" />
  </div>
</template>

<script>
import SideContent from '@/components/SideContent.vue';

export default {
  components: { SideContent },
  asyncData () {
    // menusは仮置き。あとで値をDBから取ってくるようにしたい。。。
    const menus = require('../assets/dummy/dummy.json');
    return menus;
  },
  data: () => {
    return {
      meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: []
      },
      menus: [],
      points: {
        breakfast: {
          energy: 0,
          stapleFood: 0,
          sideDish: 0,
          mainDish: 0,
          dairyProduct: 0,
          fruit: 0
        },
        lunch: {
          energy: 0,
          stapleFood: 0,
          sideDish: 0,
          mainDish: 0,
          dairyProduct: 0,
          fruit: 0
        },
        dinner: {
          energy: 0,
          stapleFood: 0,
          sideDish: 0,
          mainDish: 0,
          dairyProduct: 0,
          fruit: 0
        },
        snack: {
          energy: 0,
          stapleFood: 0,
          sideDish: 0,
          mainDish: 0,
          dairyProduct: 0,
          fruit: 0
        }
      },
      element: '',
      draggedMenuId: '',
      placeHolder: '',
      isDrag: false
    };
  },
  computed: {
    sumPoints () {
      return Object.keys(this.points.breakfast).reduce((obj, x) => { obj[x] = this.pointSum(x); return obj; }, {});
    }
  },
  watch: {
    meals: {
      handler () {
        const keys = Object.keys(this.meals);
        const result = keys.map((key) => {
          const points = this.meals[key].reduce((obj, meal) => {
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

          return { [key]: points };
        });

        this.points = Object.assign(...result);
      },
      deep: true
    }
  },
  // 画面上のどこで動かしても、dragイベント等が起きるようにmountしておく
  mounted () {
    window.addEventListener('mousemove', this.mouseMoveMenu);
    window.addEventListener('mouseup', this.mouseUpMenu);
  },
  // mount前にリセットしておく
  beforeunMount () {
    window.removeEventListener('mousemove', this.mouseMoveMenu);
    window.removeEventListener('mouseup', this.mouseUpMenu);
  },
  methods: {
    /**
     * クリックされた際に、以下を実行する。
     * 1. placeHolderの作成（リストの位置がずれないように＆見た目が良いため）
     * 2. クリックされたイベントの初期位置をマウスの位置-20pxに設定
     * 3. ドラッグされているイベントに紐づくIDを変数に格納しておく
     */
    mouseDownMenu (event, id) {
      if (event.target.tagName !== 'LI') {
        this.element = event.target.closest('LI');
      } else {
        this.element = event.target;
      }
      // placeHolder作成
      this.placeHolder = document.createElement('li');
      this.placeHolder.style.height = `${event.height}px`;
      this.placeHolder.classList.add('menuBox', 'placeHolder');
      this.element.parentNode.insertBefore(
        this.placeHolder,
        this.element.nextSibling
      );

      // クリックされたイベントの位置を設定（ドラッグで動くようにfixedに変更）
      this.element.style.position = 'fixed';
      this.element.style.width = '220px';
      this.element.style.top = `${Math.abs(event.clientY - 20)}px`;
      this.element.style.left = `${Math.abs(event.clientX - 20)}px`;

      // イベントのIDを入れておく
      this.draggedMenuId = id;

      // ドラッグの開始
      this.isDrag = true;
    },

    /**
     * ドラッグで動かしている際、以下を実行する
     * 1. ドラッグされているイベントをマウスの位置-20pxの場所へ追従させる
     * 2. .dropAreaまたは.dispAreaの範囲内に入った場合、対象の要素の背景色を変更する
     */
    mouseMoveMenu (event) {
      if (this.isDrag) {
        // ドラッグされているイベントをマウスに追従させる
        this.element.style.top = `${Math.abs(event.clientY - 20)}px`;
        this.element.style.left = `${Math.abs(event.clientX - 20)}px`;

        // ドロップ対象の.dropAreaまたは.dispAreaの範囲内に入った場合、対象の要素の背景色を変更する
        // 範囲外になったら、背景色を元に戻す
        const targetAreas = document.querySelectorAll('.dropArea, .dispArea');
        targetAreas.forEach((targetArea) => {
          const target = targetArea.getBoundingClientRect();
          if (
            event.clientY >= target.top &&
            event.clientY <= target.bottom &&
            event.clientX >= target.left &&
            event.clientX <= target.right
          ) {
            targetArea.style.background = '#eceff1';
          } else {
            targetArea.style.background = '';
          }
        });
      }
    },

    /**
     *  ドラッグが終わった際、以下を実行する
     * 1. 最終的なマウスの位置が、.dropAreaまたは.dispAreaの範囲内に入った場合、
     *    対象の要素にドラッグしていたイベント（メニュー）を追加する（dropMenu関数の実行）
     * 2. ドラッグしていたイベントを元の位置に戻す
     */
    mouseUpMenu (event) {
      if (this.isDrag) {
        // ドラッグ対象の範囲内に入っているか確認して、入っていればメニューを追加する
        // 一応背景色も戻しておく
        const targetAreas = document.querySelectorAll('.dropArea, .dispArea');
        targetAreas.forEach((targetArea) => {
          targetArea.style.background = '';
          const target = targetArea.getBoundingClientRect();
          if (
            event.clientY >= target.top &&
            event.clientY <= target.bottom &&
            event.clientX >= target.left &&
            event.clientX <= target.right
          ) {
            this.dropMenu(targetArea.id);
          }
        });

        // ドラッグしていたイベントを元の位置に戻す
        this.placeHolder.remove();
        this.element.style.top = '';
        this.element.style.left = '';
        this.element.style.width = '';
        this.element.style.position = '';

        // ドラッグの終了
        this.isDrag = false;
      }
    },

    /**
     * dragEndMenuから呼ばれた際に実行。対象のメニューをカテゴリーに紐づく時間？の献立に追加
     */
    dropMenu (category) {
      const menu = this.menus.find((menu) => menu.id === this.draggedMenuId);
      this.meals[category].push(menu);
    },

    /**
     * バツアイコンが押されたときに、対象の要素を消す
     */
    removeItem (category, index) {
      this.meals[category].splice(index, 1);
    },

    /**
     * 引数で指定されカテゴリのポイントの合計値を計算する
     */
    pointSum (category) {
      return Object.values(this.points).reduce((sum, point) => {
        sum += point[category];
        return sum;
      }, 0);
    }
  }
};
</script>
