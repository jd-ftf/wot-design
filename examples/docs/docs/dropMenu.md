# DropMenu 下拉菜单

### 按需引入

```javascript
import Vue from 'vue'
import { DropMenu, DropMenuItem } from 'wot-design'

Vue.use(DropMenu)
Vue.use(DropMenuItem)
```

## 代码演示

### 基础用法

基础用法需要绑定 `v-model` 值以及 `options` 属性。

 `options` 属性是一个一维对象数组，数组项的数据结构为：label（选项文本），value（选项值），tip（选项说明）。

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value1" :options="option1" />
  <wd-drop-menu-item v-model="value2" :options="option2" />
</wd-drop-menu>

<script>
export default {
  data () {
    return {
      value1: 1,
      value2: 0,
      option1: [
        {
          label: '全部商品',
          value: 0
        }, {
          label: '新款商品',
          value: 1,
          tip: '这是补充信息'
        }, {
          label: '这是比较长的筛选条件这是比较长的筛选条件',
          value: 2
        }
      ],
      option2: [
        {
          label: '综合',
          value: 0
        }, {
          label: '销量',
          value: 1
        }, {
          label: '上架时间',
          value: 2
        }
      ]
    }
  }
}
</script>
```

### 自定义菜单内容

通过默认插槽 `default` 可以自定义 `DropMenuItem` 的内容，此时需要使用实例上的 `close` 方法手动控制菜单的关闭。

可以通过 `title` 设置菜单标题。

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value1" :options="option1" />
  <wd-drop-menu-item title="筛选" ref="dropMenuItem">
    <div>
      <wd-cell title="标题文字" value="内容" />
      <wd-cell title="标题文字" label="描述信息" value="内容" />
      <div style="padding: 0 10px 20px; box-sizing: border-box;">
        <wd-button block size="large" @click="confirm">主要按钮</wd-button>
      </div>
    </div>
  </wd-drop-menu-item>
</wd-drop-menu>

<script>
export default {
  data() {
    return {
      value1: 0,
      option1: [
        {
          label: '全部商品',
          value: 0
        }, {
          label: '新款商品',
          value: 1
        }, {
          label: '活动商品',
          value: 2
        }
      ]
    }
  },
  methods: {
    confirm () {
      this.$refs.dropMenuItem.close()
    }
  }
}
</script>
```

### 自定义菜单选项

自己通过 flex 布局做自定义筛选展示。

```html
<div style="display: flex; background: #fff; text-align: center;">
  <wd-drop-menu style="flex: 1;">
    <wd-drop-menu-item v-model="value4" :options="option1" />
  </wd-drop-menu>
  <div style="flex: 1;">
    <wd-sort-button v-model="value5" title="价格" />
  </div>
</div>
```

### 向上展开

将`direction`属性值设置为`up`，菜单即可向上展开

```html
<wd-drop-menu direction="up">
  <wd-drop-menu-item v-model="value1" :options="option1" />
  <wd-drop-menu-item v-model="value2" :options="option2" />
</wd-drop-menu>
```

### 禁用菜单

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value1" disabled :options="option1" />
  <wd-drop-menu-item v-model="value2" :options="option2" />
</wd-drop-menu>
```

### DropMenu Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| direction | 菜单展开方向，可选值为`up` 或 `down` | string | up | down | - |
| close-outside | 是否开启点击外部关闭 | boolean | - | true | - |
| modal | 是否展示蒙层 | boolean | - | true | - |
| close-on-click-modal | 是否点击蒙层时关闭 | boolean | - | true | - |
| close-on-popstate | 页面返回时自动关闭 | boolean | - | true | - |
| duration | 菜单展开收起动画时间，单位 ms | number | - | 200 | - |

### DropMenuItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|---------|
| value / v-model | 当前选中项对应选中的 value | string / number | - | - | - |
| disabled | 禁用菜单 | boolean | - | false | - |
| value-key | 选项对象中，value对应的 key | string | - | value | - |
| label-key | 选项对象中，展示的文本对应的 key | string | - | label | - |
| tip-key | 选项对象中，选项说明对应的 key | string | - | tip | - |
| options | 列表数据，对应数据结构 `[{text: '标题', value: '0', tip: '提示文字'}]` | array | - | - | - |
| icon-name | 选中的图标名称(可选名称在wd-icon组件中) | string | - | check | - |
| title | 菜单标题 | string | - | - | - |

### DropdownItem Event

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| change | 菜单选项修改时触发 | value | - |

### DropdownItem Methods

| 方法名 | 说明 | 参数 | 返回值 | 最低版本 |
|------|------|------|------|---------|
| close | 关闭菜单 | - | - | - |
| open | 展开菜单 | - | - | - |

### DropMenu Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| default | 菜单内容 | - |

### DropMenuItem Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| default | 菜单自定义内部内容 | - |
| title | 菜单自定义标题 | - |
