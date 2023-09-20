import stringToMarkdownAst from './stringToMarkdownAst'

import { emptyContext, parse } from './markdownAstToSlate/markdownAstToSlate'

const inCompleteStructuredClone = <T>(object: T): T => {
  return JSON.parse(JSON.stringify(object))
}

describe('parse mdx ESM Element ', () => {
  describe('functional', () => {
    test('named import ', async () => {
      const markdownTest = `
import { TestComp } from 'path.js'
<TestComp attr="test-attr">test-children</TestComp>
      `

      const context = inCompleteStructuredClone(emptyContext)
      const ast = await stringToMarkdownAst(markdownTest)

      const slateAst = await parse({ node: ast, context })

      expect(slateAst).toEqual({
        type: 'root',
        children: [
          {
            type: 'mdxJsxTextElement',
            component: {
              name: 'TestComp',
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'attr',
                  value: 'test-attr',
                },
              ],
              children: [
                {
                  type: 'mdxJsxTextElement',
                  children: [
                    {
                      text: 'test-children',
                    },
                  ],
                },
              ],
            },
            children: [
              {
                text: 'test-children',
              },
            ],
          },
        ],
      })

      expect(context).toEqual({
        'path.js': {
          defaultAlias: null,
          components: ['TestComp'],
        },
      })
    })

    xit(': default import ', async () => {
      // TODO
    })
  })

  describe('error', () => {
    xit(': component not exist', () => {

    })
  })
})
