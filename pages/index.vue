<template>
  <div class="container">
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
  data: () => {
    return {
      meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: []
      },
      // menusは仮置き。あとで値をDBから取ってくるようにしたい。。。
      menus: [
        {
          id: '0000001',
          name: '唐揚げ（中）',
          kcal: 101,
          protain: 13.8,
          fat: 24.52,
          carbohydrate: 3.92
        },
        {
          id: '0000002',
          name: 'ごはん（1膳）',
          kcal: 269,
          protain: 4,
          fat: 0.48,
          carbohydrate: 59.36
        },
        {
          id: '0000003',
          name: 'サラダ（100g）',
          kcal: 269,
          protain: 4,
          fat: 0.48,
          carbohydrate: 59.36
        }
      ],
      element: '',
      draggedMenuId: '',
      placeHolder: ''
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
      this.element.style.top = `${event.pageY - 20}px`
      this.element.style.left = `${event.pageX - 20}px`
    },

    /**
     * ドラッグで動かしている際、以下を実行する
     * 1. ドラッグされているイベントをマウスの位置-20pxの場所へ追従させる
     * 2. .dropAreaまたは.dispAreaの範囲内に入った場合、対象の要素の背景色を変更する
     */
    dragMenu (event) {
      // ドラッグされているイベントをマウスに追従させる
      this.element.style.top = `${event.pageY - 20}px`
      this.element.style.left = `${event.pageX - 20}px`

      // ドロップ対象の.dropAreaまたは.dispAreaの範囲内に入った場合、対象の要素の背景色を変更する
      // 範囲外になったら、背景色を元に戻す
      const targetAreas = document.querySelectorAll('.dropArea, .dispArea')
      targetAreas.forEach((targetArea) => {
        const target = targetArea.getBoundingClientRect()
        if (
          event.pageY >= target.top &&
          event.pageY <= target.bottom &&
          event.pageX >= target.left &&
          event.pageX <= target.right
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
          event.pageY >= target.top &&
          event.pageY <= target.bottom &&
          event.pageX >= target.left &&
          event.pageX <= target.right
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
    }
  }
}
</script>
