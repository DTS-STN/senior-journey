import { FC } from 'react'

export interface DateModifiedProps {
  // text to be displayed
  text?: string

  // id of the element for testing if needed
  id?: string
}

/**
 * Contains build time stamp
 */
const DateModified: FC<DateModifiedProps> = ({ id, text }) => {
  return (
    <dl id={id} className="container mx-auto py-8 px-4">
      <dt className="inline">{text}</dt>
      <dd className="inline">
        <time>{process.env.NEXT_PUBLIC_BUILD_DATE}</time>
      </dd>
    </dl>
  )
}

DateModified.defaultProps = {
  id: 'date-modified',
  text: 'Date Modified: ',
}

export default DateModified
