import { Editor, Element, Node, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import type { ListItem, UnorderedList } from '../types/slate'
import {
  isSlateListItem,
  isSlateUnorderedList,
} from '../types/slate'
import { Button, Icon } from './components'

export const ListButton = () => {
  const editor = useSlate()
  const { selection } = editor

  const listBlock = (() => {
    if (!selection)
      return
    const unhangeRange = Editor.unhangRange(editor, selection)
    const nodes = Array.from(
      Editor.nodes<UnorderedList>(editor, {
        match: n => isSlateUnorderedList(n),
        at: unhangeRange,
        mode: 'lowest',
      }),
    )

    return nodes?.[0]
  })()

  const onClick = () => {
    if (!selection)
      return
    if (listBlock) {
      Transforms.unwrapNodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'list',
        split: true,
      })

      Transforms.unwrapNodes(editor, {
        match: n =>
          !Editor.isEditor(n) && Element.isElement(n) && isSlateListItem(n),
      })
    }
    else {
      Transforms.wrapNodes<UnorderedList>(
        editor,
        { type: 'list', ordered: false, children: [] },
        {
          match: n =>
            !Editor.isEditor(n) && Element.isElement(n),
        },
      )

      const [target] = [
        ...Editor.nodes(editor, { match: n => isSlateUnorderedList(n) }),
      ]

      const childrenCount = [...Node.children(target[0], [])].length

      for (let i = 0; i < childrenCount; i++) {
        const at = [...target[1], i]

        Transforms.wrapNodes<ListItem>(
          editor,
          { type: 'list-item', children: [] },
          {
            at,
          },
        )
      }
    }
  }

  return (
    <Button active={!!listBlock} onClick={onClick}>
      <Icon>format_list_bulleted</Icon>
    </Button>
  )
}
