<template>
  <div>
    <ul class="icon-list">
      <li v-for="icon in icons" :key="icon">
        <div>
          <wd-icon :name="icon" size="22px" />
        </div>
        <p>{{ icon }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import icons from '../icon.json'

export default {
  data () {
    return {
      icons
    }
  }
}
</script>

<style lang="scss">
.icon-list {
  display: flex;
  margin: 15px;
  flex-wrap: wrap;
  background: #fff;

  li {
    width: 25%;
    padding: 15px 0;
    text-align: center;
  }
  p {
    margin: 10px 0;
    color: #999;
  }
}
</style>
