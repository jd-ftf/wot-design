<template>
  <div class="wot-search-input">
    <input
      type="text"
      class="wot-search-input__inner"
      id="search_input"
      placeholder="搜索文档"
    >
  </div>
</template>
<script>
import 'docsearch.js/dist/cdn/docsearch.min.css'
import docsearch from 'docsearch.js'

export default {
  mounted () {
    docsearch({
      apiKey: '2e031c5218bf2d41b5b9aa75aec4f725',
      indexName: 'wot-design-mini',
      inputSelector: '#search_input',
      debug: false // Set debug to true if you want to inspect the dropdown
    })
  }
}
</script>

<style lang="scss">

.wot-search-input {
  margin-right: 30px;
}
.wot-search-input__inner {
  display: block;
  width: 100%;
  padding: 10px 15px;
  font-size: inherit;
  color: #333;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #ebeef5;
  border-radius: 5px;
  &:hover{
    cursor: pointer;
  }
}
.algolia-autocomplete{
  .algolia-docsearch-suggestion--title,
  .algolia-docsearch-suggestion--subcategory-column {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }
  .algolia-docsearch-suggestion--wrapper {
    border-bottom: 1px solid #ddd;
    padding-bottom: 8px;
  }
  .algolia-docsearch-suggestion--highlight{
    color:#5468ff !important;
    background: rgba(143,187,237,.3) !important;
  }
  .ds-dropdown-menu:before {
    width: 10px;
    height: 10px;
    top: -5px;
  }
  .ds-dropdown-menu .ds-suggestions {
    padding-top: 30px;
    &::before{
      content: "Search Result";
      position: absolute;
      top: -10px;
      left: 20px;
      font-weight: bolder;
      font-size: 16px;
      color: #303133;
    }
    &::after{
      content: " ";
      position: absolute;
      top: 12px;
      left: 10px;
      width: 3px;
      height: 16px;
      background-color: #5468ff;
    }
  }
}
</style>
