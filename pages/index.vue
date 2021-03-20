<template>
  <div class="container">
    <div class="sum">
      # 仮置き
      <span class="stapleFood">主食{{ pointSum('stapleFood') }}</span>
      <span class="sideDish">副菜{{ pointSum('sideDish') }}</span>
      <span class="mainDish">主菜{{ pointSum('mainDish') }}</span>
      <span class="dairyProduct">牛乳・乳製品{{ pointSum('dairyProduct') }}</span>
      <span class="fruit">果物{{ pointSum('fruit') }}</span>
    </div>
    <div class="mainContents">
      <div class="meals">
        <h1>
          <i class="icon" />
          献立
        </h1>
        <li class="mealArea">
          <ul class="mealBox">
            <h1 class="mealTitle breakfast">
              <i class="icon" />
              朝ごはん
            </h1>
            <div v-if="meals.breakfast.length" id="breakfast" class="dispArea">
              <ul
                v-for="(meal, index) in meals.breakfast"
                :key="index"
                class="meal"
              >
                {{
                  meal.name
                }}
                <span>
                  <i
                    class="closeIcon"
                    @click="removeItem('breakfast', index)"
                  />
                </span>
              </ul>
            </div>
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
          </ul>

          <ul class="mealBox">
            <h1 class="mealTitle lunch">
              <i class="icon" />
              昼ごはん
            </h1>
            <div v-if="meals.lunch.length" id="lunch" class="dispArea">
              <ul
                v-for="(meal, index) in meals.lunch"
                :key="index"
                class="meal"
              >
                {{
                  meal.name
                }}
                <span>
                  <i class="closeIcon" @click="removeItem('lunch', index)" />
                </span>
              </ul>
            </div>
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
          </ul>
          <ul class="mealBox">
            <h1 class="mealTitle dinner">
              <i class="icon" />
              夜ごはん
            </h1>
            <div v-if="meals.dinner.length" id="dinner" class="dispArea">
              <ul
                v-for="(meal, index) in meals.dinner"
                :key="index"
                class="meal"
              >
                {{
                  meal.name
                }}
                <span>
                  <i class="closeIcon" @click="removeItem('dinner', index)" />
                </span>
              </ul>
            </div>
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
          </ul>
          <ul class="mealBox">
            <h1 class="mealTitle snack">
              <i class="icon" />
              間食
            </h1>
            <div v-if="meals.snack.length" id="snack" class="dispArea">
              <ul
                v-for="(meal, index) in meals.snack"
                :key="index"
                class="meal"
              >
                {{
                  meal.name
                }}
                <span>
                  <i class="closeIcon" @click="removeItem('snack', index)" />
                </span>
              </ul>
            </div>
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
          </ul>
        </li>
      </div>

      <div class="menus">
        <h1>
          <i class="icon" />
          レシピ
        </h1>
        <li class="menuArea">
          <ul
            v-for="menu of menus"
            :key="menu.id"
            class="menuBox"
            draggable
            @dragstart="dragStartMenu($event, menu.id)"
            @mousedown="mouseDownMenu($event)"
          >
            {{
              menu.name
            }}
          </ul>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
          stapleFood: 0,
          sideDish: 0,
          mainDish: 0,
          dairyProduct: 0,
          fruit: 0
        },
        lunch: {
          stapleFood: 0,
          sideDish: 0,
          mainDish: 0,
          dairyProduct: 0,
          fruit: 0
        },
        dinner: {
          stapleFood: 0,
          sideDish: 0,
          mainDish: 0,
          dairyProduct: 0,
          fruit: 0
        },
        snack: {
          stapleFood: 0,
          sideDish: 0,
          mainDish: 0,
          dairyProduct: 0,
          fruit: 0
        }
      },
      stapleFood: 0,
      sideDish: 0,
      mainDish: 0,
      dairyProduct: 0,
      fruit: 0,
      element: '',
      draggedMenuId: '',
      placeHolder: ''
    }
  },
  watch: {
    meals: {
      handler () {
        const keys = Object.keys(this.meals);
        const result = keys.map((key) => {
          const points = this.meals[key].reduce((obj, meal) => {
            obj.stapleFood += meal.points.stapleFood || 0;
            obj.sideDish += meal.points.sideDish || 0;
            obj.mainDish += meal.points.mainDish || 0;
            obj.dairyProduct += meal.points.dairyProduct || 0;
            obj.fruit += meal.points.fruit || 0;
            return obj;
          }, {
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
    window.addEventListener('drag', this.dragMenu)
    window.addEventListener('dragend', this.dragEndMenu)
  },
  // mount前にリセットしておく
  beforeunMount () {
    window.removeEventListener('drag', this.dragMenu)
    window.removeEventListener('dragend', this.dragEndMenu)
  },
  methods: {
    /**
     * クリックされた際に、以下を実行する。
     * 1. placeHolderの作成（リストの位置がずれないように＆見た目が良いため）
     * 2. クリックされたイベントの初期位置をマウスの位置-20pxに設定
     */
    mouseDownMenu (event) {
      this.element = event.target
      // placeHolder作成
      this.placeHolder = document.createElement('ul')
      this.placeHolder.style.height = `${event.height}px`
      this.placeHolder.classList.add('menuBox', 'placeHolder')
      this.element.parentNode.insertBefore(
        this.placeHolder,
        this.element.nextSibling
      )

      // クリックされたイベントの位置を設定（ドラッグで動くようにfixedに変更）
      this.element.style.position = 'fixed'
      this.element.style.top = `${event.clientY - 20}px`
      this.element.style.left = `${event.clientX - 20}px`
    },

    /**
     * ドラッグで動かしている際、以下を実行する
     * 1. ドラッグされているイベントをマウスの位置-20pxの場所へ追従させる
     * 2. .dropAreaまたは.dispAreaの範囲内に入った場合、対象の要素の背景色を変更する
     */
    dragMenu (event) {
      // ドラッグされているイベントをマウスに追従させる
      this.element.style.top = `${event.clientY - 20}px`
      this.element.style.left = `${event.clientX - 20}px`

      // ドロップ対象の.dropAreaまたは.dispAreaの範囲内に入った場合、対象の要素の背景色を変更する
      // 範囲外になったら、背景色を元に戻す
      const targetAreas = document.querySelectorAll('.dropArea, .dispArea')
      targetAreas.forEach((targetArea) => {
        const target = targetArea.getBoundingClientRect()
        if (
          event.clientY >= target.top &&
          event.clientY <= target.bottom &&
          event.clientX >= target.left &&
          event.clientX <= target.right
        ) {
          targetArea.style.background = '#eceff1'
        } else {
          targetArea.style.background = ''
        }
      })
    },

    /**
     *  ドラッグが終わった際、以下を実行する
     * 1. 最終的なマウスの位置が、.dropAreaまたは.dispAreaの範囲内に入った場合、
     *    対象の要素にドラッグしていたイベント（メニュー）を追加する（dropMenu関数の実行）
     * 2. ドラッグしていたイベントを元の位置に戻す
     */
    dragEndMenu (event) {
      // ドラッグ対象の範囲内に入っているか確認して、入っていればメニューを追加する
      // 一応背景色も戻しておく
      const targetAreas = document.querySelectorAll('.dropArea, .dispArea')
      targetAreas.forEach((targetArea) => {
        targetArea.style.background = ''
        const target = targetArea.getBoundingClientRect()
        if (
          event.clientY >= target.top &&
          event.clientY <= target.bottom &&
          event.clientX >= target.left &&
          event.clientX <= target.right
        ) {
          this.dropMenu(targetArea.id)
        }
      })

      // ドラッグしていたイベントを元の位置に戻す
      this.placeHolder.remove()
      this.element.style.top = 0
      this.element.style.left = 0
      this.element.style.position = 'relative'
    },

    /**
     * dragstartイベントが発火した際、以下を実行する
     * 1. ゴースト画像（あの半透明のやつ）が見えないように、ダミーのdivをゴースト画像として設定する
     * 2. ドラッグされているイベントに紐づくIDを変数に格納しておく
     */
    dragStartMenu (event, id) {
      // ゴースト画像が表示されないようにする
      const dummy = document.createElement('div')
      event.dataTransfer.setDragImage(dummy, 0, 0)

      // イベントのIDを入れておく
      this.draggedMenuId = id
    },

    /**
     * dragEndMenuから呼ばれた際に実行。対象のメニューをカテゴリーに紐づく時間？の献立に追加
     */
    dropMenu (category) {
      const menu = this.menus.find((menu) => menu.id === this.draggedMenuId)
      this.meals[category].push(menu)
    },

    /**
     * バツアイコンが押されたときに、対象の要素を消す
     */
    removeItem (category, index) {
      this.meals[category].splice(index, 1)
    },

    /**
     * 引数で指定されカテゴリのポイントの合計値を産出する
     */
    pointSum (category) {
      return Object.values(this.points).reduce((sum, point) => {
        sum += point[category];
        return sum;
      }, 0);
    }
  }
}
</script>
