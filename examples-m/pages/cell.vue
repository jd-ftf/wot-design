<template>
  <div class="page-cell">
    <space title="基本用法">
      <jm-cell-group>
        <jm-cell title="标题文字" value="内容" />
        <jm-cell title="标题文字" label="描述信息" value="内容" />
      </jm-cell-group>
    </space>
    <space title="图标">
      <jm-cell-group>
        <jm-cell title="标题文字" value="内容" icon="jm-icon-setting" />
        <jm-cell title="标题文字" value="内容" icon="jm-icon-collect" />
        <jm-cell title="标题文字" value="内容">
          <div class="custom-icon" slot="icon">
            <i class="cell-icon"></i>
          </div>
        </jm-cell>
      </jm-cell-group>
    </space>
    <space title="分组标题">
      <jm-cell-group title="交易管理">
        <jm-cell title="标题文字" value="内容" />
        <jm-cell title="标题文字" label="描述信息" value="内容" />
      </jm-cell-group>
    </space>
    <space title="页面跳转">
      <jm-cell-group>
        <jm-cell title="帮助与反馈" is-link />
        <jm-cell title="设置" value="内容" is-link />
      </jm-cell-group>
    </space>
    <space title="">
      <jm-cell-group title="分类三">
        <jm-cell title="标题文字"></jm-cell>
        <jm-cell title="标题文字" value="说明文字"></jm-cell>
        <jm-cell title="标题文字" is-link value="带链接"></jm-cell>
        <jm-cell title="标题文字" is-link>
          <span style="color: green">这里是元素</span>
        </jm-cell>
        <jm-cell title="标题文字">
          <jm-button size="small" type="primary" plain>按钮</jm-button>
        </jm-cell>
        <jm-cell title="标题" label="描述信息" is-link></jm-cell>
        <jm-cell title="原生跳转" label="跳转到 http://beta-jmw.jd.com" is-link to="http://beta-jmw.jd.com/lib/jm-design/docs.html"></jm-cell>
        <jm-cell title="路由跳转" label="跳转到 /#/button" is-link :to="{ path: '/button' }"></jm-cell>
      </jm-cell-group>
    </space>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss">
.page-cell {
  .end-time{
    margin-left: 8px;
    border: 1px solid #faa21e;
    padding: 0 4px;
    font-size: 10px;
    color: #faa21e;
  }
  .jm-icon-star-fill {
    color: #0083ff;
  }
  .custom-icon {
    position: relative;
    width: 18px;
    height: 100%;
  }
  .cell-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png') no-repeat;
    background-size: cover;
  }
}
</style>
