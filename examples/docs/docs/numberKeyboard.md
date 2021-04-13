## InputNumber 数字键盘

[2.3.0版本新增]()

模拟数字键盘输入。

### 按需引入

```javascript
import Vue from 'vue'
import { NumberKeyboard } from 'wot-design'

Vue.use(NumberKeyboard)
```

### 基本用法

数字键盘需要通过设置 `show` 属性手动唤起，监听 `input` 键盘输入事件、`delete` 键盘删除事件、`blur` 键盘失去焦点事件、`confirm` 键盘完成事件。
```html
<wd-cell title="基本用法" @touchstart.native.stop="keyboard = 'default'" />
<number-keyboard :show="keyboard === 'default'" @input="onInput" @delete="onDelete" @blur="keyboard = ''" @confirm="onConfirm" />

<script>
export default {
  data () {
    return {
      keyboard: ''
    }
  },
  methods: {
    onInput (value) {
      console.log(`输入: ${value}`)
    },
    onDelete () {
      console.log('删除')
    },
    onConfirm () {
      console.log('完成')
    }
  }
}
</script>
```

> 默认点击数字键盘以外的地方会关闭数字键盘，通过阻止touchstart事件的冒泡可以避免关闭数字键盘。

### 带小数点输入

设置 `extra-key` 属性为 '.'。

```html
<wd-cell title="基本用法" @touchstart.native.stop="keyboard = 'default'" />
<number-keyboard extra-key="." :show="keyboard === 'default'" @input="onInput" @delete="onDelete" @blur="keyboard = ''" @confirm="onConfirm" />

<script>
export default {
  data () {
    return {
      keyboard: ''
    }
  },
  methods: {
    onInput (value) {
      console.log(`输入: ${value}`)
    },
    onDelete () {
      console.log('删除')
    },
    onConfirm () {
      console.log('完成')
    }
  }
}
</script>
```

### 身份证类型输入

设置 `extra-key` 属性为 'X'。

```html
<wd-cell title="基本用法" @touchstart.native.stop="keyboard = 'default'" />
<number-keyboard extra-key="X" :show="keyboard === 'default'" @input="onInput" @delete="onDelete" @blur="keyboard = ''" @confirm="onConfirm" />

<script>
export default {
  data () {
    return {
      keyboard: ''
    }
  },
  methods: {
    onInput (value) {
      console.log(`输入: ${value}`)
    },
    onDelete () {
      console.log('删除')
    },
    onConfirm () {
      console.log('完成')
    }
  }
}
</script>
```

### 数据双向绑定

使用 `v-model` 属性。

```html
<wd-input label="基本用法" readonly :value="value" @touchstart.native.stop="keyboard = 'default'" />
<number-keyboard :show="keyboard === 'default'" v-model="value" @blur="keyboard = ''" @confirm="onConfirm" />

<script>
export default {
  data () {
    return {
      keyboard: '',
      value: ''
    }
  },
  methods: {
    onConfirm () {
      console.log('完成')
    }
  }
}
</script>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|--------|
| value/v-model | 绑定值 | string | - | - | 2.3.0 |
| show | 是否展示 | boolean | - | - | 2.3.0 |
| maxlength | 输入最大长度 | number | - | - | 2.3.0 |
| extra-key | 自定义按钮 | string | - | - | 2.3.0 |
| confirm-text | 确定按钮文案 | string | - | '完成' | 2.3.0 |
| close-on-click-outside | 是否点击键盘外的地方关闭 | boolean | - | true | 2.3.0 |
| close-on-popstate | 页面返回时自动关闭 | boolean | - | true | 2.3.0 |
| teleport | 指定挂载的 HTML 节点, 可以为字符串，也可以为对象，为对象时有 `to` 和 `disabled` 属性，`to` 表示挂载点，`disabled` 表示挂载到当前节点上 | string / object  | - | 'body' | 2.3.0 |
| z-index | 键盘层级 | number | - | 100 | 2.3.0 |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型），见 [底部安全区域适配](#/components/commonProblems#di-bu-an-quan-qu-yu-gua-pei-iphone-x-lei-xing-de-ji-xing) | boolean | - | true | 2.3.0 |

### Events

| 事件名称 | 说明 | 参数 | 版本 |
|---------|-----|-----|-----|
| input | 键盘输入事件 | key: 当前输入的键值 | 2.3.0 |
| blur | 失去焦点事件，监听该事件控制键盘显隐 | - | 2.3.0 |
| delete | 点击删除时触发 | - | 2.3.0 |
| confirm | 点击完成时触发 | value | 2.3.0 |
| close | 点击关闭按钮时触发 | - | 2.3.0 |
| show | 键盘完全弹出时触发 | - | 2.3.0 |
| hide | 键盘完全收起时触发 | - | 2.3.0 |
