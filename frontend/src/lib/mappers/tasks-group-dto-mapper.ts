import { TasksGroupData, TasksGroupDto } from '../../pages/quiz/tasks/[[...filters]]'

export const toDto = (data: TasksGroupData, locale?: string): TasksGroupDto => {
  function getText(en: string, fr: string) {
    return locale === 'fr' ? fr : en
  }

  return {
    displayOrder: data.displayOrder,
    id: data.id,
    subTitle: getText(data.subTitleEn, data.subTitleFr),
    tasks: data.tasks.map((task) => ({
      description: getText(task.descriptionEn, task.descriptionFr),
      id: task.id,
      isTimeSensitive: task.isTimeSensitive,
      links: task.links.map((link) => ({
        link: getText(link.linkEn, link.linkFr),
        text: getText(link.textEn, link.textFr),
      })),
      tags: task.tags.map((tag) => ({
        code: tag.code,
        title: getText(tag.titleEn, tag.titleFr),
      })),
      title: getText(task.titleEn, task.titleFr),
    })),
    title: getText(data.titleEn, data.titleFr),
  }
}
