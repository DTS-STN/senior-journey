// lookup table for mapping quiz answer IDs to step IDs for checklist page

import { FormValues } from "../../pages/learn"

export interface TableMapping {
   [question: string]: {[answerID: string]: string[]} 
}

export const StepLookupTable: TableMapping = {
    "question-1": {

    },
    "question-2": {
        "base": ["base1","base2"],
        "single": ["single1","single2","single3"],
        "marriedOrCommonLaw": ["marriedOrCommonLaw1"],
        "divorcedOrSeparated": ["divorcedOrSeparated1","divorcedOrSeparated2"],
        "widowed": ["widowed1","widowed2"],
        "yesChildren": ["yesChildren1"],
        "noChildren": ["noChildren1","noChildren2"],
    },
    "question-3": {

    },
    "question-4": {

    },
    "question-5": {

    },
    "question-6": {

    },
    "question-7": {

    },
    "question-8": {

    },
    "question-9": {

    },
}



// example usage 
export function getStepsFromQuizState(state: FormValues): string[] {
    // filter out empty (not selected) answers
    // "base" steps will always be included in the results for each question
    let answerIDs = Object.values(state).flat().filter(Boolean)
    let steps = []
    for (let questionSteps of Object.values(StepLookupTable)){
        for (let [answerID,stepArray] of Object.entries(questionSteps)){
            if (answerID==='base' || answerIDs.includes(answerID)) steps.push(...stepArray)
        }
    }
    return steps
}