<template>
  <div>
    <demo-block title="基本用法" transparent>
      <wd-row>
        <wd-col span="24" class="dark">span: 24</wd-col>
      </wd-row>
      <wd-row>
        <wd-col span="12" class="dark">span: 12</wd-col>
        <wd-col span="12" class="light">span: 12</wd-col>
      </wd-row>
      <wd-row>
        <wd-col span="8" class="dark">span: 8</wd-col>
        <wd-col span="8" class="light">span: 8</wd-col>
        <wd-col span="8" class="dark">span: 8</wd-col>
      </wd-row>
      <wd-row>
        <wd-col span="6" class="dark">span: 6</wd-col>
        <wd-col span="6" class="light">span: 6</wd-col>
        <wd-col span="6" class="dark">span: 6</wd-col>
        <wd-col span="6" class="light">span: 6</wd-col>
      </wd-row>
    </demo-block>
    <demo-block title="分栏偏移" transparent>
      <wd-row>
        <wd-col span="4" class="dark">span: 4</wd-col>
        <wd-col span="8" offset="4" class="light">span: 8 offset: 4</wd-col>
      </wd-row>
      <wd-row>
        <wd-col span="8" offset="4" class="dark">span: 8 offset: 4</wd-col>
        <wd-col span="8" offset="4" class="light">span: 8 offset: 4</wd-col>
      </wd-row>
    </demo-block>
    <demo-block title="分栏间隔" transparent>
      <wd-row gutter="20">
        <wd-col span="8" class="dark">span: 8</wd-col>
        <wd-col span="8" class="light">span: 8</wd-col>
        <wd-col span="8" class="dark">span: 8</wd-col>
      </wd-row>
    </demo-block>
    <demo-block title="Flex布局" transparent>
      <!-- 左对齐 -->
      <wd-row flex>
        <wd-col span="6" class="dark">span: 6</wd-col>
        <wd-col span="6" class="light">span: 6</wd-col>
        <wd-col span="6" class="dark">span: 6</wd-col>
      </wd-row>
      <!-- 居中 -->
      <wd-row flex justify="center">
        <wd-col span="6" class="dark">span: 6</wd-col>
        <wd-col span="6" class="light">span: 6</wd-col>
        <wd-col span="6" class="dark">span: 6</wd-col>
      </wd-row>
      <!-- 右对齐 -->
      <wd-row flex justify="end">
        <wd-col span="6" class="dark">span: 6</wd-col>
        <wd-col span="6" class="light">span: 6</wd-col>
        <wd-col span="6" class="dark">span: 6</wd-col>
      </wd-row>
      <!-- 两端对齐 -->
      <wd-row flex justify="space-between">
        <wd-col span="6" class="dark">span: 6</wd-col>
        <wd-col span="6" class="light">span: 6</wd-col>
        <wd-col span="6" class="dark">span: 6</wd-col>
      </wd-row>
      <!-- 平均间隔 -->
      <wd-row flex justify="space-around">
        <wd-col span="6" class="dark">span: 6</wd-col>
        <wd-col span="6" class="light">span: 6</wd-col>
        <wd-col span="6" class="dark">span: 6</wd-col>
      </wd-row>
    </demo-block>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.dark,
.light {
  color: #fff;
  font-size: 12px;
  line-height: 34px;
  height: 34px;
  text-align: center;
  margin-bottom: 10px;
  background-clip: content-box;
}

.dark {
  background-color: #39a9ed;
}

.light {
  background-color: #66c6f2;
}
</style>
