###### 2. Autocomplete功能实现

`framework7-vue`没有`Autocomplete`组件，需要自己手动实现，`Autocomplete`主要通过js进行配置和初始化，自定义选项较多。
`Autocomplete`需要使用到`f7-list`组件作为输入的容器，代码如下：

:::demo link=/toast
```html
<f7-list form>
  <f7-list-item>
    <f7-label>Fruit</f7-label>
    <f7-input type="text" placeholder="Fruit" id="autocomplete-dropdown"></f7-input>
  </f7-list-item>
</f7-list>
```
:::
