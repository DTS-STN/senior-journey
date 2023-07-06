import { toDto } from '../../../src/lib/mappers/tasks-group-dto-mapper'
import { TasksGroupData, TasksGroupDto } from '../../../src/lib/types'

describe('toDto', () => {
  const mockData: TasksGroupData = {
    displayOrder: 1,
    id: 1,
    subTitleEn: 'English Subtitle',
    subTitleFr: 'French Subtitle',
    tasks: [
      {
        answerKey: 'answer-key',
        descriptionEn: 'English Description',
        descriptionFr: 'French Description',
        displayOrder: 1,
        id: 1,
        links: [
          {
            linkEn: 'English Link',
            linkFr: 'French Link',
            textEn: 'English Text',
            textFr: 'French Text',
          },
        ],
        tags: [
          {
            code: 'tag1',
            titleEn: 'English Tag',
            titleFr: 'French Tag',
          },
        ],
        titleEn: 'English Title',
        titleFr: 'French Title',
      },
    ],
    titleEn: 'English Title',
    titleFr: 'French Title',
  }

  it('returns the correct TasksGroupDto object with default (English) locale', () => {
    // arrange
    const expected: TasksGroupDto = {
      displayOrder: 1,
      id: 1,
      subTitle: 'English Subtitle',
      tasks: [
        {
          answerKey: 'answer-key',
          description: 'English Description',
          displayOrder: 1,
          id: 1,
          links: [
            {
              link: 'English Link',
              text: 'English Text',
            },
          ],
          tags: [
            {
              code: 'tag1',
              title: 'English Tag',
            },
          ],
          title: 'English Title',
        },
      ],
      title: 'English Title',
    }

    // act
    const act = toDto(mockData)

    // assert
    expect(act).toEqual(expected)
  })

  it('returns the correct TasksGroupDto object with French locale', () => {
    // arrange
    const expected: TasksGroupDto = {
      displayOrder: 1,
      id: 1,
      subTitle: 'French Subtitle',
      tasks: [
        {
          answerKey: 'answer-key',
          description: 'French Description',
          displayOrder: 1,
          id: 1,
          links: [
            {
              link: 'French Link',
              text: 'French Text',
            },
          ],
          tags: [
            {
              code: 'tag1',
              title: 'French Tag',
            },
          ],
          title: 'French Title',
        },
      ],
      title: 'French Title',
    }

    // act
    const act = toDto(mockData, 'fr')

    // assert
    expect(act).toEqual(expected)
  })
})
