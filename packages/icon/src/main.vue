<script>
export default {
  name: 'JmIcon',
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
        class: `jm-icon-${name}`,
        style: {
          color,
          fontSize: size
        }
      }
    )
  }
}
</script>
