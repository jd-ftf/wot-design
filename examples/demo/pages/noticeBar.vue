<template>
  <div>
    <space title="基本用法">
      <jm-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        left-icon="bell"
      />
    </space>
    <space title="禁止滚动">
      <jm-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        :scrollable="false"
      />
    </space>
    <space title="多行展示">
      <jm-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        wrapable
        :scrollable="false"
      />
    </space>
    <space title="可关闭的">
      <jm-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        closable
      />
    </space>
    <space title="自定义颜色">
      <jm-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        left-icon="bell"
        closable
        color="#0083ff"
        background-color="#d9ebfd"
      />
    </space>
  </div>
</template>
