import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import * as originalRules from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';

// 全てのルールをインポート
let rule;
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule], // eslint-disable-line
  });
}

// メッセージを設定
localize('ja', ja);

// カスタムルールの設定
extend('required', { message: '必須項目です。' });
extend('integer', { message: '数値で入力してください。' });
extend('max', { message: '{length}文字以下で入力してください。' });

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
