import { SurveyQuestionType } from "@/types/survey";
import {
  Field,
  Input,
  HStack,
  Checkbox,
  RadioGroup,
  NativeSelect,
} from "@chakra-ui/react";

// Temporary options to demonstrate the component
const TEMP_OPTIONS = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

interface SurveyQuestionProps {
  question: SurveyQuestionType;
  response: string;
  setResponse: (response: string) => void;
  viewOnly: boolean;
}

const SurveyQuestion = ({
  question,
  response,
  setResponse,
  viewOnly,
}: SurveyQuestionProps) => {
  const { label, info, data_type } = question;

  const renderInput = () => {
    if (data_type === "checkbox") {
      return (
        <Checkbox.Root
          checked={response === "true"}
          onCheckedChange={(e) => setResponse(e.checked as string)}
          disabled={viewOnly}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      );
    }
    if (data_type === "radio") {
      return (
        <RadioGroup.Root
          value={response as string}
          onValueChange={(e) => setResponse(e.value as string)}
          disabled={viewOnly}
        >
          <HStack gap="6">
            {TEMP_OPTIONS.map((option) => (
              <RadioGroup.Item key={option.value} value={option.value}>
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
      );
    }
    if (data_type === "select") {
      return (
        <NativeSelect.Root>
          <NativeSelect.Field
            value={response}
            onChange={(e) => setResponse(e.target.value as string)}
          >
            {TEMP_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={viewOnly}
              >
                {option.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      );
    }
    return (
      <Input
        type={data_type}
        disabled={viewOnly}
        value={response}
        onChange={(e) => setResponse(e.target.value as string)}
      />
    );
  };

  return (
    <Field.Root pt="4" pb="4">
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      {renderInput()}
      <Field.HelperText>{info}</Field.HelperText>
    </Field.Root>
  );
};

export default SurveyQuestion;
