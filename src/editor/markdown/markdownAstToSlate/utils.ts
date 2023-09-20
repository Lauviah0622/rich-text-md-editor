import type * as MdAst from 'mdast'
import type * as MdxAst from 'mdast-util-mdx'
import type { Root } from 'remark-mdx'
import { z } from 'zod'
import type { CustomText, Link as SlateLink } from '../../types/slate'

export const isMdastParagraph = (node: any): node is MdAst.Paragraph => {
  return node.type === 'paragraph'
}

export const isMdastCodeBlock = (node: any): node is MdAst.Code => {
  return node.type === 'code'
}

const isMdastMdxJsxElement = (node: any): node is MdxAst.MdxJsxTextElement | MdxAst.MdxJsxFlowElement => {
  return node.name && Array.isArray(node.attributes) && Array.isArray(node.children)
}

export const isMdastMdxJsxTextElement = (node: any): node is MdxAst.MdxJsxTextElement => {
  return isMdastMdxJsxElement(node) && node.type === 'mdxJsxTextElement'
}

export const isMdastMdxJsxFlowElement = (node: any): node is MdxAst.MdxJsxFlowElement => {
  return isMdastMdxJsxElement(node) && node.type === 'mdxJsxFlowElement'
}

export const isMdastMdxjsEsm = (node: any): node is MdxAst.MdxjsEsm => {
  return node.type === 'mdxjsEsm'
}

export const isMdxJsxAttribute = (attr: any): attr is MdxAst.MdxJsxAttribute => {
  return attr.type === 'mdxJsxAttribute'
}

export const isMdastHeading = (node: any): node is MdAst.Heading => {
  const depth = [1, 2, 3, 4, 5, 6]
  return node.type === 'heading' && depth.includes(node?.depth)
}

export const isMdastBlockQuote = (node: any): node is MdAst.Blockquote => {
  return node.type === 'blockquote'
}

export const isMdastText = (node: any): node is MdAst.Text => {
  return node.type === 'text' && Boolean(node.value)
}

export const isMdastStrong = (node: any): node is MdAst.Strong => {
  return node.type === 'strong' && Boolean(node.children[0])
}

export const isMdastInlineCode = (node: any): node is MdAst.InlineCode => {
  return node.type === 'inlineCode' && Boolean(node.value)
}

export const isMdastBreak = (node: any): node is MdAst.Break => {
  return node.type === 'break'
}

export const isMdastListItem = (node: any): node is MdAst.ListItem => {
  return node.type === 'listItem' && Boolean(node.children)
}

export const isMdastList = (node: any): node is MdAst.List => {
  return node.type === 'list' && Boolean(node.children) && node.children.every(isMdastListItem)
}

export const isMdastEmphasis = (node: any): node is MdAst.Emphasis => {
  return node.type === 'emphasis' && Boolean(node.children[0])
}

export const isMdastThematicBreak = (node: any): node is MdAst.ThematicBreak => {
  return node.type === 'thematicBreak'
}

export const isMdastImage = (node: any): node is MdAst.Image => {
  return node.type === 'image' && Boolean(node.url)
}

export const isMdastLink = (node: any): node is MdAst.Link => {
  return node.type === 'link' && Boolean(node.children[0])
}

export const isMdastRoot = (node: any): node is Root => {
  return node.type === 'root'
}

// not all the block content here
export const isMdastBlockContent = (node: any): node is MdAst.BlockContent => {
  return [
    isMdastHeading, isMdastMdxJsxTextElement, isMdastParagraph,
  ].some(r => r(node))
}

type MdLiteralAttributes = CustomText & Partial<Pick<MdAst.Link, 'url'>>

// which node type should I use? to express the node which has the text
export const composeMdastPhrasingContent = (node: any, literalAttributes: MdLiteralAttributes = { text: '' }): CustomText | SlateLink => {
  if (isMdastInlineCode(node)) {
    // Inline code has no text element In its child
    literalAttributes.code = true
    literalAttributes.text = node.value
    return literalAttributes
  }

  if (isMdastText(node)) {
    literalAttributes.text = node.value
    if (literalAttributes.url) {
      const { url, ...rest } = literalAttributes
      const slateChild: CustomText = rest

      const linkLiteral: SlateLink = {
        type: 'link',
        url,
        children: [slateChild],
      }
      return linkLiteral
    }
    return literalAttributes
  }

  if (isMdastLink(node))
    literalAttributes.url = node.url

  if (isMdastStrong(node))
    literalAttributes.bold = true

  if (isMdastEmphasis(node))
    literalAttributes.emphasis = true

  if (node.children[0])
    return composeMdastPhrasingContent(node.children[0], literalAttributes)

  throw new Error('no text value')
}

export const isNotNull = (value: any): value is NonNullable<any> => {
  return !z.null().safeParse(value).success
}

export const isCustomTextSlate = (node: any): node is CustomText => {
  return node.text && !(node.type)
}

export const jsImportParser = (syntax: string) => {
  const importSyntaxRegex
    = /import(?:(?:(?:[ \n\t]+([^ *\n\t{},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'{}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t{}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/

  const [
    _sourceSyntax,
    defaultAlias,
    destructiveCompSyntax,
    _moduleAlias,
    modulePath,
  ] = syntax.match(importSyntaxRegex) ?? []

  const splitComp = (syntax: string) => {
    // "{ Comp1, Comp2 }" => "Comp1, Comp2"
    const withoutMustache = (syntax.match(/\{(.*)\}/) ?? [])[1] ?? ''

    // "Comp1, Comp2" => ["Comp1", Comp2"]
    const comps = withoutMustache.split(',').map(str => str.trim()).filter(str => str.length > 0)
    return comps
  }
  const components = splitComp(destructiveCompSyntax)
  return {
    defaultAlias: defaultAlias || null,
    components,
    path: modulePath,
  }
}
