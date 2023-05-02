import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import TaskCard from '../../src/components/TaskCard'
import { TaskDto } from '../../src/lib/types'

describe('TaskCard', () => {
  const task: TaskDto = {
    id: 1,
    title: 'task title en',
    description: 'task description en',
    links: [
      {
        link: 'https://example.com/',
        text: 'link title',
      },
    ],
    tags: [
      {
        code: 'code',
        title: 'tag title',
      },
    ],
  }

  it('renders the TaskCard component', () => {
    const { container } = render(<TaskCard linksHeader="link header" task={task} />)

    expect(container.textContent).toContain('link header')
    expect(container.textContent).toContain('task description')
    expect(container.textContent).toContain('link title')
    expect(container.textContent).toContain('tag title')
  })
})
