import { AptitudeQuestion } from "../types/schema";

export const evaluateScore = (aptitudeQuestions: AptitudeQuestion[]) => {
  let userScore = 0;
  aptitudeQuestions?.forEach((item: any) => {
    if (item.userAnswer === item.answer) {
      userScore = userScore + 1;
    }
  });
  return userScore;
};

export const getUserBadge = (star: any) => {
  if (star > 4 && star <= 5) {
    return "Guru";
  } else if (star > 3 && star <= 4) {
    return "Expert";
  } else if (star > 2 && star <= 3) {
    return "Proficient";
  } else if (star > 1 && star <= 2) {
    return "Competent";
  } else if (star > 0 && star <= 1) {
    return "Novice";
  } else {
    return "Novice";
  }
};
