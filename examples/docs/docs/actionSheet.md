## ActionSheet 动作面板

### 按需引入

```javascript
import Vue from 'vue'
import { ActionSheet } from 'wot-design'

Vue.use(ActionSheet)
```

### 基本用法

`v-model` 为绑定值，表示是否展示菜单。

`actions` 类型为 `Array`，数组内部对象结构如下：

| 参数      | 类型 | 说明 |
|---------- |---- |---------- |
| name | string | 选项名称 |
| subname | string | 描述信息 |
| color | string | 颜色 |

```html
<wd-button plain @click="show = true">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :actions="actions" @select="select"></wd-action-sheet>

<script>
export default {
  data () {
    return {
      show: false,
      actions: [
        {
          name: '选项1'
        }, {
          name: '选项2'
        }, {
          name: '选项3',
          subname: '描述信息'
        }
      ]
    }
  },
  methods: {
    select (item, index) {
      this.$toast(`当前选中项: ${item.name}, 下标: ${index}`)
    }
  }
}
</script>
```

### 选项状态

可以设置 颜色、禁用、加载 等状态。

```html
<wd-button plain @click="show = true">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :actions="actions"></wd-action-sheet>

<script>
export default {
  data () {
    return {
      show: false,
      actions: [
        {
          name: '颜色',
          color: '#4d80f0'
        }, {
          name: '禁用',
          disabled: true
        }, {
          loading: true
        }
      ]
    }
  }
}
</script>
```

### 取消按钮

设置 `cancel-text` 取消按钮文案，展示取消按钮。

```html
<wd-action-sheet v-model="show" :actions="actions" cancel-text="取消"></wd-action-sheet>
```

### 自定义单行面板

自定义单行面板时，`panels` 类型为一维数组， 数组内部对象结构如下：

| 参数      | 类型 | 说明 |
|---------- |---- |---------- |
| iconUrl | string | 图片地址 |
| title | string | 标题 |

```html
<wd-button plain @click="show = true">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :panels="panels" @select="select"></wd-action-sheet>

<script>
export default {
  data () {
    return {
      show: false,
      panels: [
        {
          iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
          title: '微信好友',
        }
      ]
    }
  },
  methods: {
    select (item, index) {
      this.$toast(`当前选中项: ${item.title}, 下标: ${index}`)
    }
  }
}
</script>
```

#### 多行展示

自定义多行面板时， `panels` 类型为多维数组， 每个数组内部对象结构如下：

| 参数      | 类型 | 说明 |
|---------- |---- |---------- |
| iconUrl | string | 图片地址 |
| title | string | 标题 |

```html
<wd-button plain @click="show = true">弹出菜单</wd-button>
<wd-action-sheet v-model="show" :panels="panels" @select="select"></wd-action-sheet>

<script>
export default {
  data () {
    return {
      show: false,
      panels: [
        [
          {
            iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友',
          }
        ],
        [
          {
            iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友',
          }
        ]
      ]
    }
  },
  methods: {
    select (item, rowIndex, colIndex) {
      this.$toast(`当前选中项: ${item.title}, 行下标: ${rowIndex}, 列下标: ${colIndex}`)
    }
  }
}
</script>
```

### 标题

设置 `title` 展示标题。

```html
<wd-action-sheet v-model="show" title="标题">
  <p style="padding: 15px 15px 150px 15px;">内容</p>
</wd-action-sheet>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值，展示/关闭菜单 | boolean | - | - |
| actions | 菜单选项 | array | - | [] |
| panels | 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示 | array | - | [] |
| title | 标题 | string | - | - |
| cancel-text | 取消按钮文案 | string | - | - |
| close-on-click-action | 点击选项后是否关闭菜单 | boolean | - | true |
| lock-scroll | 锁定背景滚动 | boolean | - | true |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | 
| duration | 动画持续时间 | number | - | 200(ms) |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| select | 点击选项时触发 | 菜单选项或自定义面板一维数组 （item: 选项对象, index: 选项下标），自定义面板二维数组（item: 选项对象, rowIndex: 选项行下标, colIndex选项列下标）|
| open | 弹出层打开时触发 | - |
| opened | 弹出层打开动画结束时触发 | - |
| close | 弹出层关闭时触发 | - |
| closed | 弹出层关闭动画结束时触发 | - |
| click-modal | 点击遮罩时触发 | - |
| cancel | 点击取消按钮时触发 | - |

### Action 数据结构

| 键名 | 说明 | 类型 |
|----- |----- |----- |
| name | 选项名称 | string |
| subname | 描述信息 | string |
| color | 颜色 | string |
| disabled | 禁用 | boolean |
| loading | 加载中状态 | boolean |

### Panel 数据结构

| 键名 | 说明 | 类型 |
|----- |----- |----- |
| iconUrl | 图片地址 | string |
| title | 标题内容 | string |
