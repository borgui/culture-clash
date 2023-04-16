export const calculatePlayerScore = (questionAnswer: string | undefined, maxTimeInMs: number | undefined, userChoice: string, userChoiceTimeInMs: number): number => {
    if(questionAnswer != userChoice){
        return 0
    }
    if(userChoiceTimeInMs == 0){
        return 100
    }
    if(maxTimeInMs == undefined){
        return 1000
    }
    const result = userChoiceTimeInMs / maxTimeInMs
    return result * 100
}