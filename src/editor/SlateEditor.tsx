import { useCallback, useEffect, useRef, useState } from 'react';
// import styled from '@emotion/styled';
import type {
  BaseEditor,
  Descendant,
  Path,
  Element as SlateElement,
} from 'slate';
import { Node, Transforms } from 'slate';
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
import { Icon, LinkButton, ListButton, MarkButton, Styles } from './components';
import classnames from './SlateEditor.module.css';
import { BlockquoteButton } from './components/BlockQuoteButton';
import { CodeBlockButton } from './components/CodeBlockButton';
import { JsxBlockButton } from './components/JsxBlockButton';
import { isSlateParagraph } from './types/slate';

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
  const { selection } = editor;
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
  }, [selection]);

  return (
    <div className={classnames.fakeSelection}>
      {show &&
        Array.from(rectList).map((rect, i) => {
          return (
            <span
              key={i}
              className={classnames.rect}
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

const SlateEditor = ({ init }: { init: Descendant[] }) => {
  const [editor] = useState(initEditor);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditorStillFocus, setIsEditorStillFocus] = useState(false);

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
    const isAstChange = editor.operations.some(
      (op) => op.type !== 'set_selection'
    );

    if (isAstChange) {
      // save data
    }
  };

  console.log('editor', editor.children);

  return (
    <div
      ref={containerRef}
      className={classnames.editor}
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
      <ReactSlate
        editor={editor}
        initialValue={TEST_UNWRAP_TO_TEXT}
        onChange={onChange}
      >
        <div>
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
          <ListButton />
          <JsxBlockButton />
          <LinkButton />
        </div>

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className={classnames.editable}
        />
        <FakeSelection show={isEditorStillFocus} />
      </ReactSlate>
    </div>
  );
};

export default function EditorWrapper() {
  const [init] = useState([]);

  return (
    <>
      <SlateEditor init={init} />
    </>
  );
}
