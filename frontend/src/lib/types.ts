import * as yup from 'yup'

import tasksData from '../data/tasks.json'
import { checklistFiltersSchema } from './schemas/checklist-filters-schema'

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

export interface QuizFormState extends Record<string, string> {
  divorcedOrSeparated: string
  financialPreparedness: string
  hasChildren: string
  hasCppDisabilityBenefits: string
  hasExtraIncome: string
  legalStatus: string
  marriedOrCommonLaw: string
  retirementAge: string
  retirementTimeframe: string
  single: string
  widowed: string
  yearsInCanada: string
}

export interface ChecklistFilters extends yup.InferType<typeof checklistFiltersSchema> {}
