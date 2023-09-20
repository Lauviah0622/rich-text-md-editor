import { Editor, Element, Node, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import type { BlockQuote } from '../types/slate'
import { isSlateBlockQuote } from '../types/slate'
import { Button, Icon } from './components'

export const BlockquoteButton = () => {
  const editor = useSlate()

  const { selection } = editor

  const node = (() => {
    if (!selection)
      return null
    const unhangRange = Editor.unhangRange(editor, selection)
    const nodes = Array.from(
      Editor.nodes<BlockQuote>(editor, {
        match: (n: Node) =>
          !Editor.isEditor(n) && Element.isElement(n) && isSlateBlockQuote(n),
        at: unhangRange,
        mode: 'lowest',
      }),
    )

    if (nodes.length > 0)
      return nodes[0]
  })()

  return (
    <Button
      active={!!node}
      onClick={() => {
        /**
         * this implementation doesn't allow nested blockquote be applied
         */
        if (node) {
          const [_, at] = node
          Transforms.unwrapNodes(editor, { at })
        }
        else {
          const blockQuote: BlockQuote = {
            type: 'block-quote',
            children: [],
          }

          Transforms.wrapNodes(editor, blockQuote, {
            split: true,
            mode: 'highest',
            match: n => !Editor.isEditor(n) && Element.isElement(n),
          })

          const [target] = [
            ...Editor.nodes(editor, { match: n => isSlateBlockQuote(n) }),
          ]

          const children = [...Node.children(target[0], [])]

          console.log('children', children)

          // for (let i = 0; i < childrenCount; i++) {
          //   const at = [...list[1], i]
          //   Transforms.wrapNodes<ListItem>(
          //     editor,
          //     { type: 'list-item', children: [] },
          //     {
          //       at,
          //     },
          //   )
          // }
        }
      }}
    >
      <Icon>format_quote</Icon>
    </Button>
  )
}
