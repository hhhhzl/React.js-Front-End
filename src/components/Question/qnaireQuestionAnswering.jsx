import "./qnaire.css";
import React, { useEffect, useMemo } from "react";
import QuestionDisplayCard from "./questionDisplayCard";
import { Spinner, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllQuestionsQA,
  fetchAllSubmissionsQA,
  createSubmissionQA,
  updateSubmissionQA,
  selectAllQuestionsQA,
  selectAllSubmissionsQA,
  selectIsLoadingQA,
} from "../../state/slices/question-answering";
import { mapQuestionType } from "../../constants/maps";
import { selectAuthUserOrg } from "../../state/slices/auth";
import { useParams } from "react-router-dom";

export default function QnaireQuestionAnswering() {
  const { qnaire } = useParams();

  const dispatch = useDispatch();
  const curUserOrg = useSelector(selectAuthUserOrg);
  useEffect(() => {
    dispatch(fetchAllQuestionsQA({ qnaire }));
    dispatch(
      fetchAllSubmissionsQA({ question__qnaire: qnaire, org: curUserOrg })
    );
  }, [dispatch, qnaire, curUserOrg]);

  const questions = useSelector(selectAllQuestionsQA);
  const submissions = useSelector(selectAllSubmissionsQA);

  const mapQidSubmission = useMemo(
    () => submissions.reduce((map, sm) => ({ ...map, [sm.question]: sm }), {}),
    [submissions]
  );

  const parsedQuestions = useMemo(
    () =>
      questions.map((q) => {
        const pq = {
          id: q.id,
          isRequired: q.is_required,
          maxScore: parseFloat(q.max_score),
          minScore: parseFloat(q.min_score),
          questionType: parseInt(q.question_type),
          rubric: q.rubric,
          title: q.title,
        };
        try {
          const submission = mapQidSubmission[q.id];
          return {
            ...pq,
            answer: submission ? JSON.parse(submission.answer) : null,
            submissionID: submission ? submission.id : null,
            ...JSON.parse(q.stem),
          };
        } catch (err) {
          console.error(err);
          return pq;
        }
      }),
    [questions, mapQidSubmission]
  );

  const onQuestionSubmit = (answer, questionID, submissionID) => {
    if (!submissionID) {
      // without submission ID: create
      dispatch(
        createSubmissionQA({
          data: {
            question: questionID,
            org: curUserOrg,
            answer: JSON.stringify(answer),
          },
        })
      );
    } else {
      // with submission ID: update
      dispatch(
        updateSubmissionQA({
          id: submissionID,
          data: {
            answer: JSON.stringify(answer),
          },
        })
      );
    }
  };

  const isLoading = useSelector(selectIsLoadingQA);

  return (
    <div className="qnaire-q-main-container">
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <div className="qnaire-q-question-display">
            {parsedQuestions.map((data, idx) => (
              <Card key={data.id} id={`qnaire-question-${idx + 1}`}>
                <Card.Body>
                  <QuestionDisplayCard
                    qid={data.id}
                    onQuestionSubmit={onQuestionSubmit}
                    {...data}
                  />
                </Card.Body>
              </Card>
            ))}
          </div>
          <div className="qnaire-q-question-navbar">
            <h5>问题列表</h5>
            <ol>
              {parsedQuestions.map((data, idx) => (
                <li key={data.id}>
                  <a href={`#qnaire-question-${idx + 1}`}>
                    【{mapQuestionType[data.questionType]}题】
                    {data.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
