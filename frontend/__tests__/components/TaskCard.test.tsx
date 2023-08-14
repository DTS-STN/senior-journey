import React from 'react'

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import TaskCard from '../../src/components/TaskCard'
import { TaskDto } from '../../src/lib/types'

describe('TaskCard', () => {
  const task: TaskDto = {
    answerKey: 'answer-key',
    id: 1,
    displayOrder: 1,
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
    title: 'task title en',
  }

  it('renders the TaskCard component', () => {
    const { container } = render(<TaskCard linksHeader="link header" task={task} srTag="tag:" />)

    expect(container.textContent).toContain('link header')
    expect(container.textContent).toContain('task description')
    expect(container.textContent).toContain('link title')
    expect(container.textContent).toContain('tag title')
  })
})
