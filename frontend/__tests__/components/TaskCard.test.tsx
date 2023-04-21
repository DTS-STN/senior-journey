import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import TaskCard, { Task } from '../../src/components/TaskCard'

describe('TaskCard', () => {
  const task: Task = {
    "id": 1,
    "display-order": 1,
    "answer-key": "pre65",
    "is-time-sensitive": true,
    "title": "task title",
    "description": "task description",
    "link-title": "link title",
    "links": 'https://example.com',
    "tag": "a tag"
  }

  it('renders the TaskCard component', () => {
    const { container } = render(<TaskCard task={task} />)

    expect(container.textContent).toContain('task description')
    expect(container.textContent).toContain('link title')
    expect(container.textContent).toContain('https://example.com')
    expect(container.textContent).toContain('a tag')
  })
})
