import React from 'react'
import type { Element as SlateElement } from 'slate'
import type { RenderElementProps, RenderLeafProps } from 'slate-react'
import type * as SlateCustom from '../types/slate'
import * as Text from './Text'

export interface CustomRenderElement<TElement extends SlateElement> extends RenderElementProps {
  element: TElement
}

type HeadingProps = CustomRenderElement<SlateCustom.Heading>

const Heading = ({ attributes, children, element }: HeadingProps) => {
  switch (element.depth) {
    case 1:
      return <h1 {...attributes}>{children}</h1>
    case 2:
      return <h2 {...attributes}>{children}</h2>
    case 3:
      return <h3 {...attributes}>{children}</h3>
    case 4:
      return <h4 {...attributes}>{children}</h4>
    case 5:
      return <h5 {...attributes}>{children}</h5>
    case 6:
      return <h6 {...attributes}>{children}</h6>
    default:
      return null
  }
}

const Link = ({ attributes, children, element }: CustomRenderElement<SlateCustom.Link>) => {
  return <a {...attributes} href={element.url} >
    {children}
  </a>
}

const Image = ({ attributes, children, element }: CustomRenderElement<SlateCustom.Image>) => {
  return <span {...attributes}>
    {children}
    <img
        {...attributes}
        src={element.url}
        alt={element.alt}
        // TEMP
        style={{ height: '100px' }}
      />
  </span>
}

const Blockquote = ({ attributes, children }: CustomRenderElement<SlateCustom.BlockQuote>) => {
  return <blockquote {...attributes}>{children}</blockquote>
}

const OrderedList = ({ attributes, children, element }: CustomRenderElement<SlateCustom.OrderedList>) => {
  return <ol {...attributes}>{children}</ol>
}

const UnorderedList = ({ attributes, children, element }: CustomRenderElement<SlateCustom.UnorderedList>) => {
  return <ul {...attributes}>{children}</ul>
}

const ListItem = ({ attributes, children, element }: CustomRenderElement<SlateCustom.ListItem>) => {
  return <li {...attributes}>{children}</li>
}

const Code = ({ attributes, children, element }: CustomRenderElement<SlateCustom.Code>) => {
  return <pre {...attributes}>{children}</pre>
}

const CustomComponent = ({ attributes, children, element }: CustomRenderElement<SlateCustom.MdxJsxTextElement | SlateCustom.MdxJsxFlowElement>) => {
  if (element.type === 'mdxJsxTextElement') {
    return (
    <span {...attributes} contentEditable={false}>
      mdxJsxTextElement: {element.element.name}
      <input></input>
      {children}
    </span>
    )
  }
  if (element.type === 'mdxJsxFlowElement') {
    let render

    if (Text.isTextJsxElement(element))
      render = <Text.Render element={element}/>

    const defaultContent = <div>
    mdxJsxFlowElement: {element.element.name}
    <input></input>
      {children}
    </div>

    return (
    <div {...attributes} contentEditable={false}>
      {render ?? defaultContent}
      {children}
    </div>
    )
  }
  return null
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'block-quote':
      return <Blockquote {...{ attributes, children, element }}>{children}</Blockquote>
    case 'list':
      return element.ordered
        ? <OrderedList {...{ attributes, children, element }}/>
        : <UnorderedList {...{ attributes, children, element }}/>
    case 'list-item':
      return <ListItem {...{ attributes, children, element }}/>
    case 'heading':
      return <Heading {...{ attributes, children, element }}/>
    case 'link':
      return <Link {...{ attributes, children, element }}/>
    case 'mdxJsxFlowElement':
      return <CustomComponent {...{ attributes, children, element }} />
    case 'mdxJsxTextElement':
      return <CustomComponent {...{ attributes, children, element }} />
    case 'image':
      return <Image {...{ attributes, children, element }} />
    case 'code':
      return <Code {...{ attributes, children, element }} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold)
    children = <strong>{children}</strong>
  if (leaf.code)
    children = <code>{children}</code>
  if (leaf.emphasis)
    children = <em>{children}</em>

  return (
    <span
      {...attributes}
    >
      {children}
    </span>
  )
}

export { Element, Leaf }
