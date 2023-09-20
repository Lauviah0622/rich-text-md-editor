import serializeSlateAst from './serializeSlateAst'

describe('element: paragraph', () => {
  test('plain paragraph', () => {
    expect(serializeSlateAst({
      type: 'paragraph',
      children: [
        {
          text: 'test-content',
        },
      ],
    })).toBe('test-content')
  })

  describe('paragraph with leaf children', () => {
    test(': bold', () => {
      expect(serializeSlateAst({
        type: 'paragraph',
        children: [
          {
            text: 'test-content',
            bold: true,
          },
        ],
      })).toBe('**test-content**')
    })
  })
})
