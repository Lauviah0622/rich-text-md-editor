import { useCallback, useEffect, useRef, useState } from 'react';
import type { BaseEditor, Element as SlateElement } from 'slate';
import * as Slate from 'slate';
import type { HistoryEditor } from 'slate-history';
import { withHistory } from 'slate-history';
import {
  Editable,
  ReactEditor,
  Slate as ReactSlate,
  useSlate,
  withReact,
} from 'slate-react';
import { Element, Leaf } from './render/render';
import { TEST_UNWRAP_TO_TEXT } from './fixture';
import type { MarkdownParseContext } from './markdown/markdownAstToSlate/markdownAstToSlate';
import { emptyContext } from './markdown/markdownAstToSlate/markdownAstToSlate';
import { Icon, LinkButton, MarkButton, Styles } from './components';
import { BlockquoteButton } from './components/BlockQuoteButton';
import { CodeBlockButton } from './components/CodeBlockButton';
import { Toolbar } from './components/Toolbar';
import { slateToMarkdown } from './markdown';

import classes from './SlateEditor.module.css';

const isInlinePlugin = (element: SlateElement) => {
  return ['mdxJsxTextElement', 'link', 'image'].includes(element.type);
};

const isVoidPlugin = (element: SlateElement) => {
  return ['mdxJsxFlowElement', 'mdxJsxTextElement', 'image'].includes(
    element.type
  );
};

const FakeSelection = ({ show }: { show: boolean }) => {
  const editor = useSlate();
  const { selection, children } = editor;
  const [rectList, setRectList] = useState<DOMRect[]>([]);

  useEffect(() => {
    if (document.getSelection()?.rangeCount) {
      const DOMRange = document.getSelection()?.getRangeAt(0);
      if (!DOMRange) return;

      const ancestorWidth = DOMRange.commonAncestorContainer?.clientWidth;
      const rects = DOMRange.getClientRects();

      const rectsArray = Array.from(rects)
        .map((rect, i, rects) => {
          const nextRect = rects?.[i + 1];
          const prevRect = rects?.[i - 1];

          const shouldPadHanging =
            prevRect?.width >= ancestorWidth ||
            nextRect?.width >= ancestorWidth ||
            nextRect?.width === 0;

          if (shouldPadHanging) rect.width += rect.height / 5;

          return rect;
        })
        .filter(
          ({ width }) => width > 0 && (!ancestorWidth || width < ancestorWidth)
        );

      setRectList(rectsArray);
    }
  }, [selection, children]);

  return (
    <div className={classes.fakeSelection}>
      {show &&
        Array.from(rectList).map((rect, i) => {
          return (
            <span
              key={i}
              className={classes.rect}
              style={{
                height: rect.height,
                width: rect.width,
                top: rect.top,
                left: rect.left,
              }}
            ></span>
          );
        })}
    </div>
  );
};

type ReactMdxEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & { context: MarkdownParseContext };

const initEditor = () => {
  const editor = withHistory(withReact(Slate.createEditor())) as ReactMdxEditor;
  editor.context = emptyContext;
  return editor;
};

const SlateEditor = () => {
  const [editor] = useState(initEditor);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditorStillFocus, setIsEditorStillFocus] = useState(false);
  const [markdown, setMarkdown] = useState(() =>
    slateToMarkdown(editor.children)
  );

  const renderElement = useCallback(Element, []);

  const renderLeaf = useCallback(Leaf, []);

  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return isInlinePlugin(element) ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return isVoidPlugin(element) ? true : isVoid(element);
  };

  const onChange = () => {
    setMarkdown(slateToMarkdown(editor.children));

    const isAstChange = editor.operations.some(
      (op) => op.type !== 'set_selection'
    );

    if (isAstChange) {
      // save data
    }
  };

  return (
    <div
      ref={containerRef}
      className={classes.editor}
      onFocus={(e) => {
        if (!containerRef.current) return;

        const stillFocus =
          containerRef.current.contains(e.target) &&
          !e.target.dataset?.slateEditor;

        setIsEditorStillFocus(stillFocus);

        // TODO
        /**
         * if is button (non editable element) => still focus on editor and do not lose selection
         * if is editable content，show the fake selection. and after the editing finish, select the original selection
         */
      }}
    >
      <div className={classes.left}>
        <ReactSlate
          editor={editor}
          initialValue={TEST_UNWRAP_TO_TEXT}
          onChange={onChange}
        >
          <Toolbar>
            <MarkButton mark="bold">
              <Icon>format_bold</Icon>
            </MarkButton>
            <MarkButton mark="emphasis">
              <Icon>format_italic</Icon>
            </MarkButton>
            <MarkButton mark="code">
              <Icon>code</Icon>
            </MarkButton>
            <Styles />
            <BlockquoteButton />
            <CodeBlockButton />
            <LinkButton />
          </Toolbar>

          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className={classes.editable}
          />
          <FakeSelection show={isEditorStillFocus} />
        </ReactSlate>
      </div>
      <div className={classes.right}>
        <textarea
          value={markdown}
          ref={() => {
            if (!markdown) {
              setMarkdown(slateToMarkdown(editor.children));
            }
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default function EditorWrapper() {
  return <SlateEditor />;
}
