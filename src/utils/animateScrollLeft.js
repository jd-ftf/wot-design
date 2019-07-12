export default ($el, to, duration) => {
  let count = 0
  const from = $el.scrollLeft
  const frames = duration === 0 ? 1 : Math.round(duration / 16)

  function animate () {
    $el.scrollLeft += (to - from) / frames

    if (++count < frames) {
      requestAnimationFrame(animate)
    }
  }

  animate()
}
