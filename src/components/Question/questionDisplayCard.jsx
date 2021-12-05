import React from "react";
import { Card } from "react-bootstrap";

import QuestionAttachmentDisplay from "./question-display/questionAttachmentDisplay";
import QuestionFillInBlankDisplay from "./question-display/questionFillInBlankDisplay";
import QuestionMatrixDisplay from "./question-display/questionMatrixDisplay";
import QuestionMultipleChoicesDisplay from "./question-display/questionMultipleChoicesDisplay";
import QuestionShortAnswerDisplay from "./question-display/questionShortAnswerDisplay";
import QuestionTableDisplay from "./question-display/questionTableDisplay";

const mapQuestionTypeDisplay = {
  1: QuestionMultipleChoicesDisplay,
  2: QuestionFillInBlankDisplay,
  3: QuestionMatrixDisplay,
  4: QuestionShortAnswerDisplay,
  5: QuestionTableDisplay,
  6: QuestionAttachmentDisplay,
};
export default function QuestionDisplayCard({ questionType, ...props }) {
  
  const QuestionComponent = mapQuestionTypeDisplay[questionType];
  return (
    <Card>
      <Card.Body>
        {QuestionComponent && <QuestionComponent {...props} />}
      </Card.Body>
    </Card>
  );
}
