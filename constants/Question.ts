

export const MULTIPLE_CHOICE_TYPE_ID = 1
export const WITHOUT_CHOICE_TYPE_ID = 2
export const WORLD_MAP_TYPE_ID = 3
export const BLIND_TEST_TYPE_ID = 4

export const QUESTION_TYPES = [
    {id: MULTIPLE_CHOICE_TYPE_ID, name: 'Choix multiples'},
    {id: WITHOUT_CHOICE_TYPE_ID, name: 'Sans choix'},
    {id: WORLD_MAP_TYPE_ID, name: 'Carte du monde'},
    {id: BLIND_TEST_TYPE_ID, name: 'Blind test'},
]

export const getQuestionType = (id: number) => {
    return QUESTION_TYPES.find(questionType => questionType.id == id)?.name
}


export const QUESTION_DIFFICULTIES = [
    {id: 1, name: 'Facile'},
    {id: 2, name: 'Moyen'},
    {id: 3, name: 'Difficile'},
    {id: 4, name: 'Expert'},
]

export const getQuestionDifficulty = (id: number) => {
    return QUESTION_DIFFICULTIES.find(questionDifficulty => questionDifficulty.id == id)?.name
}

export const QUESTION_THEMES = [
    {id: 1, name: 'Géographie'},
    {id: 2, name: 'Histoire'},
    {id: 3, name: 'Sports'},
    {id: 4, name: 'Jeux video'},
    {id: 5, name: 'Sciences et technologies'},
    {id: 6, name: 'Cinéma'},
    {id: 7, name: 'Médias et TV'},
    {id: 8, name: 'Nature'},
    {id: 8, name: 'Politique'},
]

export const getQuestionTheme = (id: number) => {
    return QUESTION_THEMES.find(questionTheme => questionTheme.id == id)?.name
}
