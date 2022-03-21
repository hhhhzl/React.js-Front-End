import {React, useEffect, useState} from "react";
import QnaireIndicatorEdit from "../../Questionnaire/qnaireIndicatorEdit";
import QnaireIndicatorBindingQuestions from "../../Questionnaire/qnaireIndicatorQuestion";


export default function AdminIndicatorEdit(){
    const [page, setpage] = useState(1)

    const pagegonext =() => {
        setpage(page + 1)
    }

    const pagegoback =() => {
        setpage(page - 1)
    }

    useEffect(() => {
        // trigger re-render when props.data change
        
        setpage(page)
        
      }, [page]);

    return (
        <>
        {page == 1? 
        (<QnaireIndicatorEdit pagegonext = {pagegonext} />)
        :
        (<QnaireIndicatorBindingQuestions pagegoback = {pagegoback}/>
        )
        }
        
        </>
    )
}
