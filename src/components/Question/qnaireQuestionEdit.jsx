import "./qnaire.css";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Button } from "react-bootstrap";
import {
  fetchAllQuestionsQE,
  createDraftItemQE,
  commitDraftsQE,
  selectDraftsQE,
  selectIsLoadingQE,
} from "../../state/slices/question-edit";
import { mapQuestionType } from "../../constants/maps";
import QuestionEditCard from "./questionEditCard";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

export default function QnaireQuestionEdit() {
  const { qnaire } = useParams();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestionsQE({ qnaire }));
  }, [dispatch, qnaire]);

  const drafts = useSelector(selectDraftsQE);
  const parsedDrafts = useMemo(
    () =>
      drafts.map((q) => {
        console.log(q);
        const pq = {
          id: q.id,
          isRequired: q.is_required,
          maxScore: parseFloat(q.max_score),
          minScore: parseFloat(q.min_score),
          questionType: parseInt(q.question_type),
          rubric: q.rubric,
          title: q.title,
          rubric_detail: q.rubric_detail,
        };
        try {
          return {
            ...pq,
            ...JSON.parse(q.stem),
          };
        } catch (err) {
          console.error(err);
          return pq;
        }
      }),
    [drafts]
  );

  const handleQuestionAdd = (qtype) => {
    dispatch(
      createDraftItemQE({
        data: {
          id: `TEMP-${uuidv4()}`,
          question_type: qtype,
          title: "",
          stem: "{}",
          is_required: true,
          min_score: 0,
          max_score: 10,
          rubric: "E",
          rubric_detail: null,
          qnaire: qnaire,
        },
      })
    );
  };

  const isLoading = useSelector(selectIsLoadingQE);

  return (
    <div className="qnaire-q-main-container">
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <div className="qnaire-q-question-display">
            {parsedDrafts.map((data, idx) => (
              <div key={data.id} id={`qnaire-question-edit-${idx + 1}`}>
                <QuestionEditCard questionOrder={idx} qid={data.id} {...data} />
              </div>
            ))}
          </div>
          <div className="qnaire-q-question-navbar">
            <div className="qnaire-q-question-saveall-container">
              <Button
                variant="outline-success"
                onClick={() => dispatch(commitDraftsQE())}
              >
                保存编辑
              </Button>
            </div>

            <h5>添加问题</h5>
            <div className="qnaire-q-question-add-container">
              {Object.entries(mapQuestionType).map(([qtid, qtname]) => (
                <Button
                  key={qtid}
                  variant="outline-dark"
                  onClick={() => handleQuestionAdd(qtid)}
                >
                  {qtname}题
                </Button>
              ))}
            </div>
            <h5>问题列表</h5>
            <ol>
              {parsedDrafts.map((data, idx) => (
                <li key={data.id}>
                  <a href={`#qnaire-question-edit-${idx + 1}`}>
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
