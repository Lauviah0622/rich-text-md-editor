import type { BaseEditor } from 'slate'

import type { ReactEditor } from 'slate-react'
import type { HistoryEditor } from 'slate-history'
import type { MdxJsxAttribute } from 'mdast-util-mdx'

interface VoidElement {
  // uneditable void slate Element, so children should be empty text
  children: [
    {
      text: ''
    },
  ]
}

interface Parent<TChildren = CustomElement | CustomText> {
  children: TChildren[]
}

const isSlateParent = (e: any) => {
  return Array.isArray(e?.children)
}

interface InlineChildrenParent extends Parent<CustomText | Link | Image | MdxJsxTextElement> {}

interface TextChildrenParent extends Parent<CustomText> {}

interface MdxJsxElement<TChildren = CustomElement | CustomText> extends VoidElement {
  type: string
  element: {
    name: string
    // do not process MdxJsxExpressionAttribute
    attributes: Array<MdxJsxAttribute>
    children: TChildren[]
  }
}

const isMdxJsxElement = (e: any): e is MdxJsxElement => {
  return e.element && e.element?.name && Array.isArray(e.element?.attributes)
}

export interface MdxJsxTextElement extends MdxJsxElement<CustomText> {
  type: 'mdxJsxTextElement'
}

export const isSlateMdxJsxTextElement = (e: any): e is MdxJsxTextElement => {
  return e?.type === 'mdxJsxTextElement' && isMdxJsxElement(e)
}

export interface MdxJsxFlowElement extends MdxJsxElement {
  type: 'mdxJsxFlowElement'
}

export const isSlateMdxJsxFlowElement = (e: any): e is MdxJsxFlowElement => {
  return e?.type === 'mdxJsxFlowElement' && isMdxJsxElement(e)
}

export interface Heading extends InlineChildrenParent {
  type: 'heading'
  depth: 1 | 2 | 3 | 4 | 5 | 6
}

export const isSlateHeading = (e: any): e is Heading => {
  return isSlateParent (e) && e.type === 'heading' && [1, 2, 3, 4, 5, 6].includes(e.depth)
}

export interface Link extends TextChildrenParent {
  type: 'link'
  url: string
}

export const isSlateLink = (e: any): e is Link => {
  return isSlateParent(e) && e?.type === 'link' && typeof e?.url === 'string'
}

export interface Paragraph extends InlineChildrenParent {
  type: 'paragraph'
}

export const isSlateParagraph = (e: any): e is Paragraph => {
  return isSlateParent (e) && e?.type === 'paragraph'
}

export interface Code extends Parent {
  type: 'code'
  children: Paragraph[]
  lang?: string
  meta?: string
}

export const isSlateCode = (e: any): e is Code => {
  return isSlateParent (e) && e?.type === 'code'
}

interface ThematicBreak extends VoidElement {
  type: 'thematic-break'
}

export const isSlateThematicBreak = (e: any): e is ThematicBreak => {
  return e?.type === 'thematic-break'
}

export interface BlockQuote extends Parent {
  type: 'block-quote'
}

export const isSlateBlockQuote = (e: any): e is BlockQuote => {
  return isSlateParent(e) && e?.type === 'block-quote'
}

// refer to Mdast list element https://github.com/syntax-tree/mdast#list
export interface OrderedList extends Parent {
  type: 'list'
  ordered: true
  start?: number
  spread?: boolean
  /**
   * spread means the item of the list is separated by one or more blank line or not
   * ex:
   * spread = false
   *
   * 1. test
   * 2. test
   * 3. test
   *
   *
   * spread = true
   *
   * 1. test
   *
   * 2. test
   * 3. test
   */
  children: ListItem[]
}

export const isSlateOrderedList = (e: any): e is OrderedList => {
  return e?.type === 'list' && e?.ordered
}

export interface UnorderedList extends Parent {
  type: 'list'
  ordered: false
  spread?: boolean
  children: ListItem[]
}

export const isSlateUnorderedList = (e: any): e is UnorderedList => {
  return e?.type === 'list' && !e?.ordered
}

export type List = OrderedList | UnorderedList

export const isSlateList = (e: any): e is List => {
  return e?.type === 'list'
}

// refer to Mdast listItem element https://github.com/syntax-tree/mdast#listitem
export interface ListItem extends Parent {
  type: 'list-item'
  spread?: boolean
  /**
   * spread means the item is occupy one or more line
   * ex:
   *
   * 1. test  //spread = false
   * 2. test
   * 3. test
   *
   *
   * 1. test  //list1: spread = false
   *
   * 2. test  //list2: spread = false
   * 3. test
   *
   *
   *
   * 1. test  //spread = true
   *    123123
   * 2. test
   * 3. test
   *
   *
   *
   *
   * 1. test  //spread = true
   *    123123
   *
   * 2. test
   * 3. test
   */
}

export const isSlateListItem = (e: any): e is ListItem => {
  return isSlateParent(e) && e?.type === 'list-item'
}

export interface Image extends VoidElement {
  type: 'image'
  url: string
  alt?: string
  title?: string
}

export const isSlateImage = (e: any): e is Image => {
  return e?.type === 'image' && typeof e?.url === 'string'
}

// Link Should be CustomElement to prevent some issue when it be implemented as inline Element, And it will be assert as inline element by IisInline function.
export type CustomElement =
| BlockQuote
| Code
| Heading
| Image
| Link
| List
| ListItem
| MdxJsxFlowElement
| Paragraph
| ThematicBreak
| MdxJsxTextElement
| Image

export interface Text {
  text: string
  bold?: boolean
  emphasis?: boolean
  code?: boolean
}

export type CustomText = Text

export const isSlateText = (e: any): e is Text => {
  return typeof e?.text === 'string'
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

export type WithoutChildren<T extends Parent> = Omit<T, 'children'>
