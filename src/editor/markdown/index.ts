import type { Descendant } from 'slate';
import serializeSlateAst from './serializeSlateAst';
import markdownAstToSlate from './markdownAstToSlate/markdownAstToSlate';
import stringToMarkdownAst from './stringToMarkdownAst';
import serializeContext from './serializeContext';

import type { MarkdownParseContext } from './markdownAstToSlate/markdownAstToSlate';

export interface Module {
  components: string[];
  defaultAlias: string | undefined;
  path: string;
}

export type Modules = Record<string, Module>;

export type SlateAst = Descendant[];

// string => MarkdownAst => Slate Ast
const markdownToSlate = async (
  markdown: string
): Promise<{
  children: SlateAst;
  context: MarkdownParseContext;
}> => {
  try {
    const markdownAst = await stringToMarkdownAst(markdown);

    if (!markdownAst) throw new Error('MarkdownAst parse error');

    const { context, children = [] } = markdownAstToSlate(markdownAst);
    return {
      children: children ?? [],
      context,
    };
  } catch (err) {
    console.error('err', err);
    return Promise.reject(err);
  }
};

const slateToMarkdown = (
  value: Descendant[],
  context: MarkdownParseContext = {
    modules: {},
    components: {},
  }
): string => {
  const imports = serializeContext(context.modules);

  const content = value
    .reduce<string[]>((mdLiterals, child, i, children) => {
      const mdLiteral = serializeSlateAst(child, children?.[i - 1], i);
      mdLiterals.push(mdLiteral);
      return mdLiterals;
    }, [])
    .join('');

  const importsText = imports.length > 0 ? imports + '\n\n' : '';

  return importsText + content;
};

export { markdownToSlate, slateToMarkdown };
