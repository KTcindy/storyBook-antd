import React from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import md from '../form.md'
import './form.css'
export default function Columns () {
  return (
    <div>
      {/* <Markdown source={md} /> */}
      <ReactMarkdown
        className="markdown-body"
        children={md}
        remarkPlugins={[remarkGfm]}
      >

      </ReactMarkdown>
    </div>
  )
}
