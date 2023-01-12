import MarkdownIt from 'markdown-it'

const handlePlugin = (plugin) => plugin.default || plugin

export default ({ app }, inject) => {
  const md = new MarkdownIt('default', {"xhtmlOut":false,"linkify":true,"breaks":false})

  md.use(handlePlugin(require('markdown-it-div')))

  md.use(handlePlugin(require('markdown-it-imsize')))

  inject('md', md)
}
