<template>
  <div class="container">
    <div class="mainContents">
      <div class="meals">
        <h1>
          <i class="icon" />
          献立
        </h1>
        <ul class="mealArea">
          <meal-box :id="'breakfast'" :title="'朝ごはん'" :meals="meals.breakfast" />
          <meal-box :id="'lunch'" :title="'昼ごはん'" :meals="meals.lunch" />
          <meal-box :id="'dinner'" :title="'夜ごはん'" :meals="meals.dinner" />
          <meal-box :id="'snack'" :title="'間食'" :meals="meals.snack" />
        </ul>
      </div>

      <div class="menus">
        <h1>
          <i class="icon" />
          レシピ
        </h1>
        <menu-box :menus="menus" />
      </div>
    </div>
    <side-content :sum-points="sumPoints" />
  </div>
</template>

<script>
import SideContent from '@/components/SideContent.vue';
import MealBox from '@/components/MealBox.vue';
import MenuBox from '@/components/MenuBox.vue';

export default {
  components: { SideContent, MealBox, MenuBox },
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
    this.$nuxt.$on('mouseDownMenu', this.mouseDownMenu);
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
