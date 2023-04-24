import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import React from "react";
import { useTranslation } from "react-i18next";

const Question1 = () => {
   let {t} = useTranslation('learn')
   const [alignment, setAlignment] = React.useState('web');

   const handleAlignment = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };

    return (
     <div>
        <h5 className="text-2xl font-display font-light">{t('quiz.questions.question-1.title')}</h5>
        <ToggleButtonGroup
         orientation="vertical"
         exclusive
         fullWidth={true}
         className="my-4"
         value={alignment}
         onChange={handleAlignment}
         sx={{
            "& .MuiToggleButton-root:not(:first-of-type)": {
              borderTop: '1px solid #e1e4e7',
              borderRadius: "4px"
            },
            ".mui-style-1x9mvjk-MuiButtonBase-root-MuiToggleButton-root.Mui-selected":{
               backgroundColor:"#004f56",
               color:"#f1f1f1",
               "&.Mui-selected:hover": {
                  backgroundColor: "#004f56",
                },
            },
          }}
         >
            <ToggleButton value="before-60" aria-label={t('quiz.questions.question-1.option-1')} className="my-4 font-display font-bold text-base normal-case">
            {t('quiz.questions.question-1.option-1')}
            </ToggleButton>
            <ToggleButton value="between-60-65" aria-label={t('quiz.questions.question-1.option-2')} className="my-4 font-display font-bold text-base normal-case">
            {t('quiz.questions.question-1.option-2')}
            </ToggleButton>
            <ToggleButton value="at-65" aria-label={t('quiz.questions.question-1.option-3')} className="my-4 font-display font-bold text-base normal-case">
            {t('quiz.questions.question-1.option-3')}
            </ToggleButton>
            <ToggleButton value="between-65-70" aria-label={t('quiz.questions.question-1.option-4')} className="my-4 font-display font-bold text-base normal-case">
            {t('quiz.questions.question-1.option-4')}
            </ToggleButton>
            <ToggleButton value="afer-70" aria-label={t('quiz.questions.question-1.option-5')} className="my-4 font-display font-bold text-base normal-case">
            {t('quiz.questions.question-1.option-5')}
            </ToggleButton>
            <ToggleButton value="not-sure" aria-label={t('quiz.questions.question-1.option-6')} className="my-4 font-display font-bold text-base normal-case">
            {t('quiz.questions.question-1.option-6')}
            </ToggleButton>
         </ToggleButtonGroup>
     </div>
    );
  };
  
  export default Question1;