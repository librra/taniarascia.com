import React from 'react'
import { Link } from 'gatsby'

export const Post = ({ node, query, prefix }) => {
  const date = new Date(node.date)
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  let isNew = false

  if (date > oneMonthAgo) {
    isNew = true
  }

  let formattedDate
  if (node.date) {
    const dateArr = node.date.split(' ')
    dateArr.pop()
    dateArr[0] = dateArr[0].slice(0, 3)
    formattedDate = dateArr.join(' ').slice(0, -1)
  }

  const getTitle = (title, query) => {
    if (query) {
      const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      const highlightStart = title.search(re)

      if (highlightStart !== -1) {
        const highlightEnd = highlightStart + query.length

        return (
          <h3>
            {title.slice(0, highlightStart)}
            <strong className="highlighted">
              {title.slice(highlightStart, highlightEnd)}
            </strong>
            {title.slice(highlightEnd)}
          </h3>
        )
      }
      return <h3>{title}</h3>
    }
    return <h3>{title}</h3>
  }

  return (
    <Link
      to={prefix ? `/${prefix}${node.slug}` : node.slug}
      key={node.id}
      className={isNew ? 'post new' : 'post'}
    >
      <span>
        <span className="new-badge">{isNew && 'New!'}</span>
        {getTitle(node.title, query)}
      </span>
      <div>{formattedDate && <time>{formattedDate}</time>}</div>
    </Link>
  )
}
