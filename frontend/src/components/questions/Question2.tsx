import { Checkbox, FormControlLabel, FormGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

type QuestionProps = {
   values: { [field: string]: any },
   setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const Question2 = ({ values, setFieldValue }: QuestionProps) => {
   
   let {t} = useTranslation('learn')

   function handleChangeManually(e: React.ChangeEvent<any>, toggleOff?: string){
      let field = e.target.value
      setFieldValue(field, values[field] ? '' : field)
      if (toggleOff) setFieldValue(toggleOff,'')
   }

   return (
      <div>
         <h5 className="h5">{t('quiz.questions.question-2.question-1.title')}</h5>
         <FormGroup className="mb-2" onChange={handleChangeManually}> 
            <FormControlLabel control={<Checkbox name='maritalStatus' value='single' />} label={t('quiz.questions.question-2.question-1.option-1')}/>
            <FormControlLabel control={<Checkbox name='maritalStatus' value='marriedOrCommonLaw' />} label={t('quiz.questions.question-2.question-1.option-2')} />
            <FormControlLabel control={<Checkbox name='maritalStatus' value='divorcedOrSeparated' />} label={t('quiz.questions.question-2.question-1.option-3')} />
            <FormControlLabel control={<Checkbox name='maritalStatus' value='widowed' />} label={t('quiz.questions.question-2.question-1.option-4')} />
         </FormGroup>
         <h5 className="h5 mb-2">{t('quiz.questions.question-2.question-2.title')}</h5>
         <ToggleButtonGroup
            color='primary'
            orientation="vertical"
            exclusive
            fullWidth
            className="mb-10"
            >
               <ToggleButton name='children' value="yesChildren" aria-label={t('quiz.questions.question-2.question-2.option-1')} selected={values['yesChildren']} onClick={e=>handleChangeManually(e,'noChildren')}>
                  {t('quiz.questions.question-2.question-2.option-1')}
               </ToggleButton>
               <ToggleButton name='children' value="noChildren" aria-label={t('quiz.questions.question-2.question-2.option-2')} selected={values['noChildren']} onClick={e=>handleChangeManually(e,'yesChildren')}>
                  {t('quiz.questions.question-2.question-2.option-2')}
               </ToggleButton>
            </ToggleButtonGroup>
      </div>
   );
};
  
  export default Question2;
  