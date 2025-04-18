import { useEffect, useState } from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { SurveyType, SurveyQuestionType } from "@/types/survey";
import api from "../utils/api";
import SurveyQuestion from "./SurveyQuestion";

export interface SurveyProps {
  survey: SurveyType;
  viewOnly: boolean;
  surveyIsOpen: boolean;
  closeOpenSurvey: () => void;
}

const Survey = ({
  survey,
  viewOnly,
  surveyIsOpen,
  closeOpenSurvey,
}: SurveyProps) => {
  const [questions, setQuestions] = useState<SurveyQuestionType[] | null>([]);
  const [responses, setResponses] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchSurveyQuestions = async (id: number) => {
      try {
        const surveyQuestions = await api.getSurveyQuestionsById(id);
        setQuestions(surveyQuestions);
        const surveyResponses = await api.getSurveyResponses(id);
        // TODO: Call above functions asynchronously
        if (surveyResponses) {
          setResponses(surveyResponses.response_data);
        }
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };
    if (survey?.id) {
      fetchSurveyQuestions(survey?.id);
    }
  }, [survey?.id]);

  const submitSurvey = () => {
    api.submitSurveyResponse(survey?.id, responses);
    onOpenChange();
  };

  const onOpenChange = () => {
    closeOpenSurvey();
    setResponses({});
    setQuestions(null);
  };

  const updateResponse = (questionId: number, response: string) => {
    const updatedResponses = {
      ...responses,
      [questionId]: response,
    };
    setResponses(updatedResponses);
  };

  console.log("RES", responses);

  return (
    <Dialog.Root
      lazyMount
      open={surveyIsOpen}
      onOpenChange={onOpenChange}
      size="cover"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{survey?.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description pb="8">
                {survey?.description}
              </Dialog.Description>
              {questions?.map((question) => (
                <SurveyQuestion
                  key={question?.id}
                  question={question}
                  response={responses[question.id] || ""}
                  setResponse={(response: string) =>
                    updateResponse(question?.id, response)
                  }
                  viewOnly={viewOnly}
                />
              ))}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              {!viewOnly && <Button onClick={submitSurvey}>Submit</Button>}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Survey;
