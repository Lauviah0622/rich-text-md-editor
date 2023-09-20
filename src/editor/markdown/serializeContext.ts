import type { MarkdownParseContext } from './markdownAstToSlate/markdownAstToSlate'
import type { Module } from '.'

const moduleToSyntax = (module: Module): string => {
  if (module?.defaultAlias) {
    return `import ${module.defaultAlias} from "${module.path}"`
  }
  else {
    const components = module.components.join(', ')
    const compSyntax = `{ ${components} }`

    return `import ${compSyntax} from "${module.path}"`
  }
}

const serializeContext = (modules: MarkdownParseContext['modules']) => {
  return Object.values(modules).map(moduleToSyntax).join('\n')
}

export default serializeContext
