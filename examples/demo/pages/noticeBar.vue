<template>
  <div>
    <demo-block title="基本用法" transparent>
      <wd-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        left-icon="bell"
      />
    </demo-block>
    <demo-block title="禁止滚动" transparent>
      <wd-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        :scrollable="false"
      />
    </demo-block>
    <demo-block title="多行展示" transparent>
      <wd-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        wrapable
        :scrollable="false"
      />
    </demo-block>
    <demo-block title="可关闭的" transparent>
      <wd-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        closable
      />
    </demo-block>
    <demo-block title="自定义颜色" transparent>
      <wd-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        left-icon="bell"
        closable
        color="#0083ff"
        background-color="#d9ebfd"
      />
    </demo-block>
  </div>
</template>
