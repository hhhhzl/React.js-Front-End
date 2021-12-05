import React from "react";
import { Button, Card } from "react-bootstrap";
import QuestionAttachmentEdit from "./question-edit/questionAttachmentEdit";
import QuestionFillInBlankEdit from "./question-edit/questionFillInBlankEdit";
import QuestionMatrixEdit from "./question-edit/questionMatrixEdit";
import QuestionMultipleChoicesEdit from "./question-edit/questionMultipleChoicesEdit";
import QuestionShortAnswerEdit from "./question-edit/questionShortAnswerEdit";
import QuestionTableEdit from "./question-edit/questionTableEdit";

import { useDispatch } from "react-redux";
import {
  updateDraftItemQE,
  deleteDraftItemQE,
  swapDraftItemIndicesQE,
} from "../../state/slices/question-edit";

const mapQuestionTypeEdit = {
  1: QuestionMultipleChoicesEdit,
  2: QuestionFillInBlankEdit,
  3: QuestionMatrixEdit,
  4: QuestionShortAnswerEdit,
  5: QuestionTableEdit,
  6: QuestionAttachmentEdit,
};

export default function QuestionEditCard({
  questionType,
  questionOrder = 0,
  ...props
}) {
  const dispatch = useDispatch();

  // const renderEditUtils = () => {
  //   return (
  //     <div className="qnaire-q-edit-card-utils-container">
  //       <Card>
  //         <Card.Header>
  //           <b>{questionOrder + 1}.</b>
  //         </Card.Header>

  //         <Card.Body>
  //           <Button
  //             variant="outline-danger"
  //             onClick={() => dispatch(deleteDraftItemQE({ id: props.qid }))}
  //           >
  //             删除
  //           </Button>
  //           <Button
  //             variant="outline-primary"
  //             onClick={() =>
  //               dispatch(
  //                 swapDraftItemIndicesQE({
  //                   idx1: questionOrder,
  //                   idx2: questionOrder - 1,
  //                 })
  //               )
  //             }
  //           >
  //             上移
  //           </Button>
  //           <Button
  //             variant="outline-primary"
  //             onClick={() =>
  //               dispatch(
  //                 swapDraftItemIndicesQE({
  //                   idx1: questionOrder,
  //                   idx2: questionOrder + 1,
  //                 })
  //               )
  //             }
  //           >
  //             下移
  //           </Button>
  //         </Card.Body>
  //       </Card>
  //     </div>
  //   );
  // };

  const handleQuestionUpdate = (data) =>
    dispatch(
      updateDraftItemQE({
        id: props.qid,
        data,
      })
    );

  const QuestionComponent = mapQuestionTypeEdit[questionType];
  return (
    <div className="qnaire-q-edit-card-container">
      {/* {renderEditUtils()} */}
      {QuestionComponent && (
        <QuestionComponent {...props} {...{ handleQuestionUpdate }} />
      )}
    </div>
  );
}
