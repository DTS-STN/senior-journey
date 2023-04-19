import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import TaskCard, { Task } from '../../src/components/TaskCard'

describe('TaskCard', () => {
  const task: Task = {
    id: '1',
    description: 'Test Task',
    linkTitle: 'Test Link',
    links: 'https://example.com',
    tags: 'tag1 tag2',
  }

  it('renders the TaskCard component', () => {
    const { container } = render(<TaskCard task={task} />)

    expect(container.textContent).toContain('Test Task')
    expect(container.textContent).toContain('Test Link')
    expect(container.textContent).toContain('https://example.com')
    expect(container.textContent).toContain('tag1')
    expect(container.textContent).toContain('tag2')
  })
})
