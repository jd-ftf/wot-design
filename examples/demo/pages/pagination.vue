<template>
  <div class="page-pagination">
    <demo-block title="基本用法" transparent>
      <wd-pagination v-model="page1" :total="total1"></wd-pagination>
    </demo-block>
    <demo-block title="Icon图标" transparent>
      <wd-pagination v-model="page2" :total="total2" show-icon></wd-pagination>
    </demo-block>
    <demo-block title="文字提示" transparent>
      <wd-pagination v-model="page3" :page-size="pageSize3" :total="total3" show-message show-icon></wd-pagination>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page1: 1,
      total1: 190,
      page2: 1,
      total2: 19,
      page3: 1,
      total3: 160,
      pageSize3: 20
    }
  }
}
</script>
