import { useEffect, useState } from 'react';
import { Editor, Element, Node, Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import cx from 'classnames';
import { isSlateLink } from '../types/slate';
import type { Link, WithoutChildren } from '../types/slate';
import classes from './style.module.css';
import { Button, Icon } from './components';

export const LinkButton = () => {
  const editor = useSlate();
  const { selection } = editor;

  const [url, setUrl] = useState('');

  const availableNodes = (() => {
    if (!selection) return [];

    const unhangeRange = Editor.unhangRange(editor, selection);

    const isExpanded = Range.isExpanded(unhangeRange);
    if (!isExpanded) return [];

    const nodes = Array.from(
      Editor.nodes(editor, {
        at: unhangeRange,
        match: (n, p) => {
          if (Editor.isEditor(n) || Element.isElement(n)) return false;

          const ancestors = Node.ancestors(editor, p, { reverse: true });
          for (const [node] of ancestors) {
            if (isSlateLink(node)) return false;
          }

          return true;
        },
      })
    );

    return nodes;
  })();

  /**
   * Test case:
   * TODO: 這個要整理一下
   *
   * operation
   * 1. apply
   * 2. remove
   *
   * target
   * 1. [x] only text
   * 2. [x] part of the text
   * 3. [x] multiple text (different test mark)
   * 2. single element which not text
   * 3. part of the element => should truncate
   * 2. multi element
   * 4. single already link
   * 5. multiple link in same element
   * 5. multiple link in different element
   * 6. both text and link or both element and link
   */

  const linkInSelection = (() => {
    if (!selection) return null;

    const unhangeRange = Editor.unhangRange(editor, selection);
    const nodes = Array.from(
      Editor.nodes<Link>(editor, {
        match: (n: Node) =>
          !Editor.isEditor(n) && Element.isElement(n) && isSlateLink(n),
        at: unhangeRange,
        mode: 'lowest',
      })
    );
    return nodes.length === 1 ? nodes[0] : null;
  })();

  useEffect(() => {
    if (availableNodes.length > 0) setUrl('');
  }, [availableNodes.length]);

  useEffect(() => {
    if (!linkInSelection) return;
    const [node] = linkInSelection;
    if (url !== node.url) setUrl(node.url);
  }, [selection, editor]);
  const apply = () => {
    const link: Link = {
      type: 'link',
      url,
      children: [],
    };
    Transforms.wrapNodes(editor, link, { split: true });
  };

  const update = () => {
    if (!linkInSelection) return;
    const [_node, at] = linkInSelection;
    const link: WithoutChildren<Link> = {
      type: 'link',
      url,
    };
    Transforms.setNodes(editor, link, { at });
  };

  const remove = () => {
    if (!linkInSelection) return;
    const [_node, at] = linkInSelection;
    Transforms.unwrapNodes(editor, { at });
  };

  const isInputDisabled = availableNodes.length < 1 && !linkInSelection;

  return (
    <span className={cx(classes.link)}>
      <Icon>link</Icon>
      <input
        disabled={isInputDisabled}
        value={isInputDisabled ? '' : url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      {!linkInSelection && (
        <button
          onClick={apply}
          disabled={
            (availableNodes.length < 1 && !linkInSelection) || url.length < 1
          }
        >
          apply
        </button>
      )}
      {!!linkInSelection && (
        <>
          <button onClick={update}>update</button>
        </>
      )}
      <button onClick={remove} disabled={!linkInSelection}>
        remove
      </button>
    </span>
  );
};
