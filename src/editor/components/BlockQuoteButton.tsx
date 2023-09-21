import { Editor, Element, Node, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import type { BlockQuote } from '../types/slate';
import { isSlateBlockQuote } from '../types/slate';
import { Button, Icon } from './components';

export const BlockquoteButton = () => {
  const editor = useSlate();

  const { selection } = editor;

  const node = (() => {
    if (!selection) return null;
    const unhangRange = Editor.unhangRange(editor, selection);
    const nodes = Array.from(
      Editor.nodes<BlockQuote>(editor, {
        match: (n: Node) =>
          !Editor.isEditor(n) && Element.isElement(n) && isSlateBlockQuote(n),
        at: unhangRange,
        mode: 'lowest',
      })
    );

    if (nodes.length > 0) return nodes[0];
  })();

  return (
    <Button
      active={!!node}
      onClick={() => {
        if (node) {
          const [_, at] = node;
          Transforms.unwrapNodes(editor, { at });
        } else {
          const blockQuote: BlockQuote = {
            type: 'block-quote',
            children: [],
          };

          Transforms.wrapNodes(editor, blockQuote, {
            split: true,
            mode: 'highest',
            match: (n) => !Editor.isEditor(n) && Element.isElement(n),
          });
        }
      }}
    >
      <Icon>format_quote</Icon>
    </Button>
  );
};
