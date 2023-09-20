import type { Path } from 'slate'
import { Editor, Element, Node, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import type { Code } from '../types/slate'
import { isSlateCode, isSlateParagraph } from '../types/slate'
import { Button, Icon } from './components'

const makeChildrenToText = (editor: Editor, targetAt: Path) => {
  let index = 0

  const getChild = (i: number) => {
    try {
      const target = Node.get(editor, targetAt)
      return Node.child(target, i)
    }
    catch {
      return null
    }
  }

  let child = getChild(index)
  while (child) {
    if (child && isSlateParagraph(child))
      index++
    else
      Transforms.unwrapNodes(editor, { at: [...targetAt, index] })

    child = getChild(index)
  }
}

export const CodeBlockButton = () => {
  const editor = useSlate()
  const { selection } = editor

  const node = (() => {
    if (!selection)
      return null
    const unhangRange = Editor.unhangRange(editor, selection)
    const nodes = Array.from(
      Editor.nodes<Code>(editor, {
        match: (n: Node) =>
          !Editor.isEditor(n) && Element.isElement(n) && isSlateCode(n),
        at: unhangRange,
        mode: 'all',
      }),
    )

    return nodes[0]
  })()

  const onClick = () => {
    if (node) {
      const [_, at] = node
      Transforms.unwrapNodes(editor, { at })
    }
    else {
      if (!selection)
        return
      const range = Editor.unhangRange(editor, selection)

      Transforms.wrapNodes(
        editor,
        {
          type: 'code',
          children: [],
        },
        {
          split: true,
          at: range,
          match: (n) => {
            return !Editor.isEditor(n) && Element.isElement(n)
          },
          mode: 'lowest',
        },
      )

      Transforms.unwrapNodes(editor, {
        match: n => Editor.isInline(editor, n),
      })
      const [target] = [
        ...Editor.nodes(editor, { match: n => isSlateCode(n) }),
      ]

      const [_, at] = target
      makeChildrenToText(editor, at)
    }
  }

  return (
    <Button active={!!node} onClick={onClick}>
      <Icon>integration_instructions</Icon>
    </Button>
  )
}
