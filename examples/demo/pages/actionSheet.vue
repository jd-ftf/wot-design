<template>
  <div>
    <demo-block title="基本用法">
      <wd-button type="primary" @click="show1 = true">弹出菜单</wd-button>
      <wd-action-sheet v-model="show1" :actions="actions1" @select="select1" />
    </demo-block>
    <demo-block title="选项状态">
      <wd-button type="primary" @click="show2 = true">弹出菜单</wd-button>
      <wd-action-sheet v-model="show2" :actions="actions2" />
    </demo-block>
    <demo-block title="取消按钮">
      <wd-button type="primary" @click="show3 = true">弹出菜单</wd-button>
      <wd-action-sheet v-model="show3" :actions="actions1" cancel-text="取消" />
    </demo-block>
    <demo-block title="自定义面板单行">
      <wd-button type="primary" @click="show4 = true">弹出菜单</wd-button>
      <wd-action-sheet v-model="show4" :panels="panels1" cancel-text="取消" @select="select2" />
    </demo-block>
    <demo-block title="自定义面板多行">
      <wd-button type="primary" @click="show5 = true">弹出菜单</wd-button>
      <wd-action-sheet v-model="show5" :panels="panels2" cancel-text="取消" @select="select3" />
    </demo-block>
    <demo-block title="标题">
      <wd-button type="primary" @click="show6 = true">弹出菜单</wd-button>
      <wd-action-sheet v-model="show6" title="标题">
        <p style="padding: 0 15px 150px 15px; margin: 0;">内容</p>
      </wd-action-sheet>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show1: false,
      actions1: [
        {
          name: '选项1'
        }, {
          name: '选项2'
        }, {
          name: '选项3',
          subname: '描述信息'
        }
      ],
      show2: false,
      actions2: [
        {
          name: '颜色',
          color: '#4d80f0'
        }, {
          name: '禁用',
          disabled: true
        }, {
          loading: true
        }
      ],
      panels1: [
        {
          iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
          title: '微信好友'
        },
        {
          iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
          title: '微信朋友圈'
        },
        {
          iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
          title: 'QQ好友'
        },
        {
          iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
          title: '微信收藏'
        },
        {
          iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
          title: '微信朋友圈'
        },
        {
          iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
          title: 'QQ好友'
        }
      ],
      panels2: [
        [
          {
            iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友'
          },
          {
            iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            title: '微信朋友圈'
          },
          {
            iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
            title: 'QQ好友'
          },
          {
            iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
            title: '微信收藏'
          },
          {
            iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友'
          },
          {
            iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            title: '微信朋友圈'
          },
          {
            iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友'
          },
          {
            iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            title: '微信朋友圈'
          }
        ],
        [
          {
            iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
            title: 'QQ好友'
          },
          {
            iconUrl: '//img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
            title: '微信收藏'
          },
          {
            iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友'
          }
        ]
      ],
      show3: false,
      show4: false,
      show5: false,
      show6: false
    }
  },
  methods: {
    select1 (item, index) {
      this.$toast(`当前选中项: ${item.name}, 下标: ${index}`)
    },
    select2 (item, index) {
      this.$toast(`当前选中项: ${item.title}, 下标: ${index}`)
    },
    select3 (item, rowIndex, colIndex) {
      this.$toast(`当前选中项: ${item.title}, 行下标: ${rowIndex}, 列下标: ${colIndex}`)
    }
  }
}
</script>
