<script>
export default {
  name: 'WdIcon',
  props: {
    name: String,
    color: String,
    size: String,
    tag: {
      type: String,
      default: 'i'
    }
  },
  render (createElement) {
    let {
      name,
      color,
      size,
      tag
    } = this

    return createElement(
      tag,
      {
        class: `wd-icon-${name}`,
        style: {
          color,
          fontSize: size
        }
      }
    )
  }
}
</script>
