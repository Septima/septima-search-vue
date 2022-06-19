import { createApp } from 'vue'
import App from './App.vue'

/*const options = {
  controller: { blankBehavior: 'search' },
  searchers: [
    {
      _type: 'Septima.Search.S3Searcher',
      _options: {
        showPdfLink: true,
        showLinkToWeb: true,
        host: 'https://onedoor.test.septima.dk',
        organisation: 'septima',
        configuration: 'kortdage',
        authorization: { Bearer: { token: '0000-0000-0000-0001' } },
      },
    },
  ],
}*/

const Controller = (await import('@septima/septima-search/src/js/Controller.js')).default as any
const controller = new Controller([], { blankBehavior: 'search' })
const S3Searcher = (await import('@septima/septima-search/src/js/searchers/S3Searcher.js'))
  .default as any
const s3searcher = new S3Searcher({
  showPdfLink: true,
  showLinkToWeb: true,
  host: 'https://onedoor.test.septima.dk',
  organisation: 'septima',
  configuration: 'kortdage',
  authorization: { Bearer: { token: '0000-0000-0000-0001' } },
})
controller.addSearcher(s3searcher)

createApp(App, { controller }).mount('#app')
