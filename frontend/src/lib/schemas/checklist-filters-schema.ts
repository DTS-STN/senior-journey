import * as yup from 'yup'

export const checklistFiltersSchema = yup.object({
  answers: yup.array(yup.string().required()).required(),
  tags: yup.array(yup.string().required()).required(),
})
