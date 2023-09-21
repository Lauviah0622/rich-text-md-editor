import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import type { MdxJsxFlowElement } from '../types/slate';
import type { CustomRenderElement } from './render';

type Attributes = [
  // TODO: slate 的 type 不用這麼麻煩...
  { type: 'mdxJsxAttribute'; name: 'align'; value: 'left' | 'center' | 'right' }
];

export interface Text extends MdxJsxFlowElement {
  element: {
    name: 'Text';
    attributes: Attributes;
    children: [];
  };
}

export const isTextJsxElement = (
  element: MdxJsxFlowElement
): element is Text => {
  return element.element.name === 'Text';
};

type AttributesRecord = Record<
  Attributes[number]['name'] | string,
  Attributes[number]['value']
>;

export const Render = ({
  element,
}: Pick<CustomRenderElement<Text>, 'element'>) => {
  const editor = useSlate();

  const attributesRecord = element.element.attributes.reduce<AttributesRecord>(
    (record, { name, value }) => {
      record[name] = value;

      return record;
    },
    {}
  );

  const update = (name: string, value: any) => {
    const at = editor.selection?.anchor.path[0];
    if (at == null) return;

    const nextAttributes = { ...attributesRecord, [name]: value };

    const attributes = Object.entries(nextAttributes).map(([name, value]) => ({
      type: 'mdxJsxAttribute',
      name,
      value,
    })) as Attributes;

    Transforms.setNodes<Text>(
      editor,
      {
        element: {
          name: 'Text',
          attributes,
          children: [],
        },
      },
      { at: [at] }
    );
  };

  return (
    <div>
      mdxJsxTextElement:
      <br />
      <select
        name="align"
        value={attributesRecord.align}
        onChange={(e) => {
          update('align', e.target.value);
        }}
      >
        <option value="left">LEft</option>
        <option value="center">center</option>
        <option value="right">right</option>
      </select>
    </div>
  );
};

export const empty: Text = {
  type: 'mdxJsxFlowElement',
  element: {
    name: 'Text',
    attributes: [{ type: 'mdxJsxAttribute', name: 'align', value: 'left' }],
    children: [],
  },
  children: [{ text: '' }],
};
