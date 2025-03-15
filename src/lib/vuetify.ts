import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { type ThemeDefinition } from 'vuetify'
import colors from 'vuetify/util/colors'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme: {
        colors: {
          background: colors.grey.lighten3,
          error: colors.red.base,
          info: colors.blue.accent4,
          warning: colors.yellow.accent3,
          success: colors.green.accent3,
          surface: colors.grey.lighten5,
          primary: colors.grey.lighten2,
          secondary: colors.indigo.accent1,
          cards_text_color: colors.grey.lighten5,
          text_color: colors.grey.darken4,
          default_btn_bc: colors.grey.darken4,
          icon_color: colors.grey.darken4,

          nav_bc: colors.grey.lighten1,
          nav_drawer_bc: colors.grey.lighten2,

          settings_drawer_bc: colors.grey.lighten2,
          admin_bc: colors.lightBlue.lighten3,
          teacher_bc: colors.orange.accent2,
          student_bc: colors.blueGrey.lighten3,

          main_bc: colors.grey.lighten3,

          kivett_elem_bc: colors.grey.lighten1,
          kivett_adatok_bc: colors.grey.lighten2,

          result_div_bc: colors.grey.lighten1,
        },
      },
      darkTheme: {
        colors: {
          background: colors.grey.darken4,
          error: colors.red.lighten1,
          info: colors.blue.lighten1,
          warning: colors.yellow.darken2,
          success: colors.green.lighten2,
          surface: colors.grey.darken3,
          primary: colors.grey.darken3,
          secondary: colors.indigo.darken3,
          text_color: colors.grey.lighten5,
          default_btn_bc: colors.grey.lighten5,
          icon_color: colors.grey.lighten5,
          
          nav_bc: colors.grey.darken3,
          nav_drawer_bc: colors.grey.darken2,

          settings_drawer_bc: colors.grey.darken2,
          admin_bc: colors.lightBlue.lighten3,
          teacher_bc: colors.orange.accent2,
          student_bc: colors.blueGrey.lighten3,

          main_bc: colors.grey.darken1,

          kivett_elem_bc: colors.grey.darken4,
          kivett_adatok_bc: colors.grey.darken3,

          result_div_bc: colors.grey.darken2,
        },
      },
    },
  },
})

export default vuetify
