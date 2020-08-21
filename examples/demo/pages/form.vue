<template>
  <div class="page-form">
    <wd-cell-group class="group" title="基础信息" border>
      <wd-input label="优惠券名称" label-width="100px" maxlength="20" show-word-limit required suffix-icon="wd-icon-warn-bold" clearable v-model="couponName" placeholder="请输入优惠券名称" @click-suffix-icon="handleIconClick" />
      <wd-select-picker label="推广平台" label-width="100px" v-model="platform" :columns="platformList" placeholder="请选择推广平台" />
      <wd-picker label="优惠方式" label-width="100px" name="promotion" align-right v-model="promotion" :columns="promotionlist" bind:confirm="handlePromotion" />
      <wd-cell title="券面额" required title-width="100px">
        <div style="text-align: left;">
          <div class="inline-txt" style="margin-left: 0;">满</div>
          <wd-input
            no-border
            style="display: inline-block; width: 70px; vertical-align: middle;"
            placeholder="请输入金额"
            v-model="threshold"
          />
          <div class="inline-txt">减</div>
          <wd-input
            no-border
            style="display: inline-block; width: 70px; vertical-align: middle;"
            placeholder="请输入金额"
            v-model="price"
          />
        </div>
      </wd-cell>
    </wd-cell-group>
    <wd-cell-group class="group" title="时间和地址" border>
      <wd-datetime-picker label="时间" label-width="100px" v-model="date" />
      <wd-col-picker label="地址" label-width="100px" v-model="address" :columns="area" :column-change="areaChange" />
    </wd-cell-group>
    <wd-cell-group class="group" title="其他信息" border>
      <wd-input
        label="活动细则"
        label-width="100px"
        type="textarea"
        v-model="content"
        maxlength="300"
        show-word-limit
        rows="5"
        placeholder="请输入活动细则信息"
        clearable
      />
      <wd-cell title="发货数量" center>
        <wd-input-number v-model="count" />
      </wd-cell>
      <wd-cell title="这里显示的是多文字标题包含非常的文字" title-width="240px" center>
        <wd-switch v-model="switchVal" />
      </wd-cell>
      <wd-input label="卡号" label-width="100px" suffix-icon="wd-icon-camera" placeholder="请输入卡号" clearable v-model="cardId" />
      <wd-input label="手机号" label-width="100px" placeholder="请输入手机号" clearable v-model="phone" />
    </wd-cell-group>
    <div class="tip">
      <wd-checkbox v-model="read">
        已阅读并同意<span style="color: #4D80F0">《借款额度合同及相关授权》</span>
      </wd-checkbox>
    </div>
    <wd-button suck @click="handleSubmit">提交</wd-button>
  </div>
</template>

<script>
import areaData from 'china-area-data'

export default {
  data () {
    return {
      couponName: '',
      platform: [],
      platformList: [
        {
          value: '1',
          label: '京东'
        }, {
          value: '2',
          label: '开普勒'
        }, {
          value: '3',
          label: '手Q'
        }, {
          value: '4',
          label: '微信'
        }, {
          value: '5',
          label: '1号店'
        }, {
          value: '6',
          label: '十元街'
        }, {
          value: '7',
          label: '京东极速版'
        }
      ],
      promotion: '1',
      promotionlist: [
        {
          value: '1',
          label: '满减'
        }, {
          value: '2',
          label: '无门槛'
        }
      ],
      threshold: '',
      price: '',
      date: new Date(),
      address: [],
      area: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key]
        }
      })],
      areaChange ({ selectedItem, resolve, finish }) {
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          finish()
        }
      },
      content: '',
      count: 1,
      read: false,
      switchVal: true,
      cardId: '',
      phone: ''
    }
  },
  methods: {
    handleIconClick () {
      this.$toast.info('优惠券提示信息')
    },
    handleSubmit () {
      const { couponName } = this

      if (!couponName) {
        this.couponNameError = true
        
        this.$toast.error('请填写优惠券名称')
        return
      }

      const value = {
        couponName: this.couponName,
        platform: this.platform,
        promotion: this.promotion,
        threshold: this.threshold,
        price: this.price,
        date: this.date,
        address: this.address,
        content: this.content,
        count: this.count,
        read: this.read,
        switchVal: this.switchVal,
        cardId: this.cardId,
        phone: this.phone
      }

      this.$messageBox.alert(`获取的数据为 ${JSON.stringify(value)}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-form {
  padding-bottom: 16px;
}
.inline-txt {
  display: inline-block;
  font-size: 14px;
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  vertical-align: middle;
  line-height: 20px;
}
.group {
  margin-top: 12px;
}
.tip {
  margin: 10px 15px 25px;
  color: #999;
  font-size: 12px;
}
</style>