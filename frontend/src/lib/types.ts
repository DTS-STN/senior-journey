import tasksData from '../data/tasks.json'

export type AdobeDataLayer = { push?: (object: Record<string, string>) => void }

export type AppWindow = Window & typeof globalThis & { adobeDataLayer?: AdobeDataLayer }

export interface HealthApiResponse {
  appBaseUri: string
  buildDate: string
  environment: string
  status: string
  uptime: string
}

export interface TableOfContentItem {
  hash: string
  text: string
}

export interface TaskLinkDto {
  link: string
  text: string
}

export interface TaskTagDto {
  code: string
  title: string
}

export interface TaskDto {
  id: number
  title: string
  description: string
  links: ReadonlyArray<TaskLinkDto>
  tags: ReadonlyArray<TaskTagDto>
}

export interface TasksGroupDto {
  displayOrder: number
  id: number
  subTitle: string
  tasks: TaskDto[]
  title: string
}

export type TasksGroupData =
  | typeof tasksData.applyingBenefits
  | typeof tasksData.beforeRetiring
  | typeof tasksData.receivingBenefits
