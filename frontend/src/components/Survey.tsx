import { useEffect, useState } from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import SurveyQuestion, { SurveyQuestionType } from "./SurveyQuestion";

export interface SurveyType {
  id: number;
  title: string;
  description: string;
  questions?: SurveyQuestionType[];
}

export interface SurveyProps {
  survey: SurveyType;
  canAnswer: boolean;
  canEdit: boolean;
  surveyIsOpen: boolean;
  closeOpenSurvey: () => void;
}

const Survey = ({
  survey,
  canAnswer,
  canEdit,
  surveyIsOpen,
  closeOpenSurvey,
}: SurveyProps) => {
  const [questions, setQuestions] = useState<SurveyQuestionType[] | null>([]);

  console.log(survey);

  useEffect(() => {
    const fetchSurveyQuestions = async (id: number) => {
      try {
        const response = await fetch(
          `http://localhost:5000/survey_questions/by_survey/${id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };
    if (survey?.id) {
      fetchSurveyQuestions(survey?.id);
    }
  }, [survey?.id]);

  const onOpenChange = () => {
    //TODO: HANDLE SUBMIT

    closeOpenSurvey();
    setQuestions(null);
  };

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
                  canAnswer={canAnswer}
                  canEdit={canEdit}
                />
              ))}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              {canAnswer && <Button>Submit</Button>}
              {canEdit && <Button>Save Changes</Button>}
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
