import type { PropsWithChildren } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import type { Text } from '../types/slate';
import { Button } from './components';

export const MarkButton = ({
  children,
  mark,
}: PropsWithChildren<{
  mark: keyof Omit<Text, 'text'>;
}>) => {
  const editor = useSlate();
  const marks = Editor.marks(editor) ?? {};
  const isMarkActive = !!marks?.[mark];

  const onClick = () => {
    if (isMarkActive) Editor.removeMark(editor, mark);
    else Editor.addMark(editor, mark, true);
  };

  return (
    <Button onClick={onClick} active={isMarkActive}>
      {children}
    </Button>
  );
};
