import type { Descendant } from 'slate';
import type { CustomElement } from '../types/slate';
import {
  isSlateBlockQuote,
  isSlateCode,
  isSlateHeading,
  isSlateImage,
  isSlateLink,
  isSlateListItem,
  isSlateMdxJsxFlowElement,
  isSlateMdxJsxTextElement,
  isSlateOrderedList,
  isSlateParagraph,
  isSlateText,
  isSlateThematicBreak,
  isSlateUnorderedList,
} from '../types/slate';

const serializeSlateAst = (
  node: Descendant,
  prevNode: Descendant | undefined,
  index: number,
  parent?: CustomElement
): string => {
  if (isSlateText(node)) {
    let text: string = node.text;

    if (parent && isSlateLink(parent)) text = `[${text}](${parent.url})`;

    if (node.bold) text = `**${text}**`;

    if (node.emphasis) text = `_${text}_`;

    if (node.code) text = `\`${text}\``;

    return text;
  }

  const serializeChildren = (children: Descendant[]) =>
    children.map((n, i, children) =>
      serializeSlateAst(n, children?.[i - 1], i, node)
    );

  // skip the process, the Text Element handle
  if (isSlateLink(node)) return serializeChildren(node.children).join('');

  if (isSlateHeading(node)) {
    const prefix = Array.from(new Array(node.depth), () => '#').join('');
    const content = serializeChildren(node.children).join('');
    let text = `${prefix} ${content}\n`;

    if (prevNode) text = `\n${text}`;

    return text;
  }

  if (isSlateCode(node)) {
    const codeContent = serializeChildren(node.children).join('\n');
    return `\`\`\`\n${codeContent}\n\`\`\`\n`;
  }

  if (isSlateParagraph(node)) {
    const content = serializeChildren(node.children).join('');
    let text = `${content}`;

    if (!parent) text = `\n${text}\n`;

    return text;
  }

  if (isSlateImage(node)) {
    const text = `![${node.alt}](${node.url})`;
    return text;
  }

  if (isSlateBlockQuote(node)) {
    let text = serializeChildren(node.children)
      .join('\n')
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n');

    if (isSlateHeading(prevNode)) text = `\n${text}`;

    return text;
  }

  if (isSlateOrderedList(node) || isSlateUnorderedList(node)) {
    let text = serializeChildren(node.children).join('\n');
    if (isSlateListItem(parent)) {
      // add every line indent, the ident must be "tab"
      const indent = '  ';
      text = text
        .split('\n')
        .map((line) => {
          return `${indent}${line}`;
        })
        .join('\n');
    }

    return text;
  }

  if (isSlateThematicBreak(node)) return '---';

  if (isSlateListItem(node)) {
    if (isSlateUnorderedList(parent) || isSlateOrderedList(parent)) {
      const children = node.children
        .map((n, i, siblings) => {
          const text = serializeSlateAst(n, siblings?.[i - 1], i, node);

          if (isSlateOrderedList(n) || isSlateUnorderedList(n)) {
            // if the node is list, don't pad
            return text;
          } else {
            let prefix = '';

            if (isSlateUnorderedList(parent)) {
              const bullet = '- ';
              if (i === 0) {
                // first line of list item
                prefix = bullet;
              } else {
                const pad = ''.padStart(prefix.length);
                prefix = pad;
              }
            }

            if (isSlateOrderedList(parent)) {
              const itemNumber = index + (parent?.start ?? 1);
              if (i === 0) {
                // first line of list item
                prefix = `${itemNumber}. `;
              } else {
                const pad = ''.padStart(prefix.length);
                prefix = pad;
              }
            }
            return `${prefix}${text}`;
          }
        })
        .join('\n');

      return children;
    }
  }

  if (isSlateMdxJsxFlowElement(node)) {
    const { element } = node;
    const { name } = element;
    const children = element.children
      .map((e, i, children) => serializeSlateAst(e, children?.[i - 1], i))
      .join('')
      .split('\n')
      .map((line) => {
        const indent = '  ';
        return `${indent}${line}\n`;
      })
      .join('');

    if (element.children.length > 0)
      return `\n<${name}>${children}</${name}>\n`;
    else return `\n<${name}/>`;
  }

  if (isSlateMdxJsxTextElement(node)) {
    const { element } = node;
    const { name } = element;
    const children = element.children
      .map((e, i, children) => serializeSlateAst(e, children?.[i - 1], i))
      .join('');

    if (children.length > 0) return `<${name}>${children}</${name}>`;
    else return `<${name}/>`;
  }

  return '';
};

export default serializeSlateAst;
