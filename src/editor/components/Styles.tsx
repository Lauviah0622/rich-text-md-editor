import { Editor, Element, Transforms } from 'slate';
import type { NodeMatch } from 'slate';
import { useSlate } from 'slate-react';
import type { Heading, Paragraph, WithoutChildren } from '../types/slate';
import { isSlateHeading, isSlateParagraph } from '../types/slate';
import classes from './style.module.css';

export const Styles = () => {
  const editor = useSlate();

  const match: NodeMatch<Heading | Paragraph> = (n) => {
    if (Editor.isEditor(n) || !Element.isElement(n)) return false;
    return isSlateParagraph(n) || isSlateHeading(n);
  };

  const current = (() => {
    const { selection } = editor;
    if (!selection) return null;

    const unhangeRange = Editor.unhangRange(editor, selection);

    const nodes = Array.from(
      Editor.nodes(editor, {
        at: unhangeRange,
        match,
      })
    );

    if (nodes.length !== 1) return null;

    const node = nodes[0][0];

    if (isSlateHeading(node)) return node.depth;

    if (isSlateParagraph(node)) return 0;

    return null;
  })();

  const OPTIONS = [
    'paragraph',
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'heading5',
    'heading6',
  ];

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const depth = event.target.value;

    if (+depth === 0) {
      const block: WithoutChildren<Paragraph> = { type: 'paragraph' };
      Transforms.setNodes(editor, block, {
        split: true,
      });
    } else if (depth) {
      const headingDepth = +depth as Heading['depth'];
      const block: WithoutChildren<Heading> = {
        type: 'heading',
        depth: headingDepth,
      };

      Transforms.setNodes(editor, block, {
        match,
      });
    }
  };

  return (
    <select
      id="cars"
      name="cars"
      value={`${current}`}
      onChange={onSelectChange}
      className={classes.select}
    >
      {OPTIONS.map((text, index) => {
        return (
          <option key={text} value={index}>
            {text}
          </option>
        );
      })}
    </select>
  );
};
