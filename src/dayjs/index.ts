import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import 'dayjs/locale/zh-cn'
import { App } from 'vue'

dayjs.extend(isLeapYear)
dayjs.locale('zh-cn')

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    readonly $dayjs: never
  }
}

export default {
  install: (app: App<Element>): void => {
    app.config.globalProperties.$dayjs = dayjs
  }
}
