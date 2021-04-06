<template>
  <div>
    <wd-cell-group border>
      <wd-cell title="弹出默认键盘" is-link @touchstart.native.stop="keyboard = 'default'"></wd-cell>
      <wd-cell title="带小数点输入" is-link @touchstart.native.stop="keyboard = 'dot'"></wd-cell>
      <wd-cell title="身份证输入" is-link @touchstart.native.stop="keyboard = 'x'"></wd-cell>
      <wd-cell title="修改完成按钮文案" is-link @touchstart.native.stop="keyboard = 'text'"></wd-cell>
      <wd-input label="数据双向绑定" readonly :value="value1" placeholder="请输入" @touchstart.native.stop="keyboard = 'value'" />
    </wd-cell-group>
    <wd-number-keyboard :show="keyboard === 'default'" @input="onInput1" @blur="keyboard = ''" />
    <wd-number-keyboard :show="keyboard === 'dot'" extra-key="." @input="onInput2" @blur="keyboard = ''" />
    <wd-number-keyboard :show="keyboard === 'x'" extra-key="X" @input="onInput3" @blur="keyboard = ''" />
    <wd-number-keyboard :show="keyboard === 'text'" confirm-text="提交" @input="onInput4" @blur="keyboard = ''" />
    <wd-number-keyboard :show="keyboard === 'value'" v-model="value1" :maxlength="6" @blur="keyboard = ''" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyboard: '',
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      value1: '21'
    }
  },
  methods: {
    onInput1 (value) {
      this.$toast(`输入: ${value}`)
    },
    onInput2 (value) {
      this.$toast(`输入: ${value}`)
    },
    onInput3 (value) {
      this.$toast(`输入: ${value}`)
    },
    onInput4 (value) {
      this.$toast(`输入: ${value}`)
    }
  }
}
</script>
