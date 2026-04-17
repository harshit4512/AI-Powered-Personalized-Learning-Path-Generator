// ================================
// STREAK CALCULATOR
// called every time user ticks a topic
// compares today with lastActiveDate
// returns updated streak number
// ================================

const calculateStreak = (lastActiveDate, currentStreak) => {

    // first time ever ticking
    if (!lastActiveDate) return 1

    const today = new Date();
    const last = new Date(lastActiveDate)

    today.setHours(0, 0, 0, 0)
    last.setHours(0, 0, 0, 0)

    const diffDays = Math.floor(
        (today - last) / (1000 * 60 * 60 * 24)
    )

    if (diffDays === 0) {
        // already ticked today
        // dont change streak
        return currentStreak
    }

    if(diffDays===1){
        return currentStreak+1
    }
   
    return 1;
}

export{
    calculateStreak
}