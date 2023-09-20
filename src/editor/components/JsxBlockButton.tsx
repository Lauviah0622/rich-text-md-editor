import { Node, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import * as Text from '../render/Text'

import { Button, Icon } from './components'

export const JsxBlockButton = () => {
  const editor = useSlate()

  const { selection } = editor

  const onClick = () => {
    if (!selection)
      return
    const { anchor } = selection

    console.log('anchor', anchor.path)
    const offset = anchor?.offset

    const node = Node.get(editor, anchor.path)
    console.log('node', node, node?.text?.length, offset)
    const isEnd = offset >= node?.text?.length

    Transforms.splitNodes(editor, { at: anchor, mode: 'highest' })
    // TODO 在中間的時候抓不到
    // Transforms.splitNodes(editor, { at: anchor, mode: 'highest', height: 0, always: true })

    const path = editor.selection?.anchor?.path ?? []

    // const node = Node.get(editor, path)

    // const isEnd = offset < node.length

    const atFirst = path?.[0] + (isEnd ? 1 : 0)

    console.log('atFirst', editor.selection?.anchor, isEnd, [atFirst])

    Transforms.insertNodes(
      editor,
      structuredClone(Text.empty),
      { at: [atFirst] },
    )
  }

  return (
    <Button onClick={onClick}>
      <Icon>widgets</Icon>
    </Button>
  )
}
