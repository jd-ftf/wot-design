import Upload from './src/main'

Upload.install = Vue => {
  Vue.component(Upload.name, Upload)
}

export default Upload
