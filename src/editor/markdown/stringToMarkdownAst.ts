import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'

const stringToMarkdownAst = async (text: string) => {
  return unified().use(remarkParse).use(remarkMdx).parse(text)
}

export default stringToMarkdownAst
