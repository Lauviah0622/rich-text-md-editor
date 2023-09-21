import { Node, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import * as Text from '../render/Text';

import { Button, Icon } from './components';

export const JsxBlockButton = () => {
  const editor = useSlate();

  const { selection } = editor;

  const onClick = () => {
    if (!selection) return;
    const { anchor } = selection;
    const offset = anchor?.offset;
    const node = Node.get(editor, anchor.path);
    const isEnd = offset >= node?.text?.length;

    Transforms.splitNodes(editor, { at: anchor, mode: 'highest' });

    const path = editor.selection?.anchor?.path ?? [];
    const atFirst = path?.[0] + (isEnd ? 1 : 0);

    Transforms.insertNodes(editor, structuredClone(Text.empty), {
      at: [atFirst],
    });
  };

  return (
    <Button onClick={onClick}>
      <Icon>widgets</Icon>
    </Button>
  );
};
