import type { Descendant } from 'slate'
import type { Literal, Parent, Root } from 'mdast'
import type { Node } from 'unist'
import type { CustomElement, CustomText, ListItem } from '../../types/slate'
import type { SlateAst } from '..'
import { composeMdastPhrasingContent, isCustomTextSlate, isMdastBlockQuote, isMdastBreak, isMdastCodeBlock, isMdastEmphasis, isMdastHeading, isMdastImage, isMdastInlineCode, isMdastLink, isMdastList, isMdastMdxJsxFlowElement, isMdastMdxJsxTextElement, isMdastMdxjsEsm, isMdastParagraph, isMdastRoot, isMdastStrong, isMdastText, isMdastThematicBreak, isMdxJsxAttribute, isNotNull, jsImportParser } from './utils'

type ModulePath = string

interface Module {
  defaultAlias: string | undefined
  components: string[]
  path: ModulePath
}

export interface MarkdownParseContext {
  modules: Record<ModulePath, Module>
  components: Record<string, Module>
}

export const emptyContext: MarkdownParseContext = {
  modules: {},
  components: {},
}

interface MarkdownInput {
  node: Root | Parent | Literal | Node
  parent?: Root | Parent | null
  context: MarkdownParseContext
  index?: number
}

export const parse = (
  { node, parent = null, context, index = 0 }: MarkdownInput,
): null | Descendant[] | Descendant => {
  if (isMdastRoot(node)) {
    // only root return
    return node.children
      .map((node, index) => parse({ node, parent, context, index }))
      .filter<Descendant>(isNotNull)
  }
  if (isMdastHeading(node)) {
    const slateChildren = node.children
      .map((child, index) => { return parse({ node: child, parent: node, context, index }) })
      .filter<Descendant>(isNotNull)
      .filter(isCustomTextSlate)

    return {
      type: 'heading',
      depth: node.depth,
      children: slateChildren,
    }
  }

  if (isMdastList(node)) {
    const children: ListItem[] = node.children.map((listItem) => {
      const children = listItem.children
        .map((child, index) => { return parse({ node: child, parent: node, context, index }) })
        .filter<CustomElement>(isNotNull)

      return {
        type: 'list-item',
        spread: listItem.spread ?? undefined,
        children,
      }
    })

    return {
      type: 'list',
      spread: node.spread ?? undefined,
      ordered: node.ordered ?? false,
      start: node.start ?? undefined,
      children,
    }
  }
  if (isMdastMdxJsxTextElement(node)) {
    const { name = '', attributes } = node

    if (!name || !context.components?.[name])
      return null

    const mdxJsxAttributes = attributes
      .filter(isMdxJsxAttribute)

    return {
      type: 'mdxJsxTextElement',
      element: {
        name,
        attributes: mdxJsxAttributes,
        children: node.children
          .map((node, index) => parse({ node, parent, context, index }))
          .filter<CustomText>(isNotNull),
      },
      children: [
        {
          text: '',
        },
      ],
    }
  }

  if (isMdastMdxJsxFlowElement(node)) {
    const { name = '', attributes } = node

    if (!name || !context.components?.[name])
      return null

    const mdxJsxAttributes = attributes
      .filter(isMdxJsxAttribute)

    return {
      type: 'mdxJsxFlowElement',
      element: {
        name,
        attributes: mdxJsxAttributes,
        children: node.children
          .map((node, index) => parse({ node, parent, context, index }))
          .filter<Descendant>(isNotNull),
      },
      children: [
        {
          text: '',
        },
      ],
    }
  }

  if (isMdastMdxjsEsm(node)) {
    // TODO syntax: "import * as alias from 'path'"
    // TODO syntax: "import { comp as alias } from 'path'"
    const { path, defaultAlias, components } = jsImportParser(node.value)

    const module = {
      defaultAlias: defaultAlias ?? undefined,
      components,
      path,
    }

    context.modules[path] = { ...context.modules?.[path] ?? {}, ...module }

    if (defaultAlias)
      context.components[defaultAlias] = module

    for (const component of components)
      context.components[component] = module

    return null
  }

  if (isMdastParagraph(node)) {
    return {
      type: 'paragraph',
      children: node.children
        .map((node, index) => parse({ node, parent, context, index }))
        .filter<CustomText>(isNotNull),
    }
  }

  if (isMdastCodeBlock(node)) {
    return {
      type: 'code',
      lang: node.lang ?? undefined,
      meta: node.meta ?? undefined,
      children: [
        { text: node.value },
      ],
    }
  }

  if (isMdastThematicBreak(node)) {
    return {
      type: 'thematic-break',
      children: [{ text: '' }],
    }
  }

  if (isMdastImage(node)) {
    return {
      type: 'image',
      children: [{ text: '' }],
      url: node.url ?? undefined, // prevent null value
      alt: node.alt ?? undefined,
      title: node.title ?? undefined,
    }
  }

  if (isMdastBlockQuote(node)) {
    return {
      type: 'block-quote',
      children: node.children
        .map((node, index) => parse({ node, parent, context, index }))
        .filter<Descendant>(isNotNull),
    }
  }

  if (isMdastStrong(node) || isMdastEmphasis(node) || isMdastLink(node) || isMdastInlineCode(node))
  // TODO, 改成 isInline 來 check 上面的東西，不然會檢查兩次
    return composeMdastPhrasingContent(node)

  if (isMdastBreak(node)) {
    return {
      text: '\n',
    }
  }

  if (isMdastText(node)) {
    const a = node
    return { text: node.value }
  }

  return { text: '' }
}

const markdownAstToSlate = (markdownAst: Root) => {
  // context is mutable
  const context: MarkdownParseContext = structuredClone(emptyContext)

  const children = parse({
    node: markdownAst,
    context,
    index: 0,
  }) as SlateAst | null

  return {
    children,
    context,
  }
}

export default markdownAstToSlate
