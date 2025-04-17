import {
  Field,
  Input,
  HStack,
  Checkbox,
  RadioGroup,
  NativeSelect,
} from "@chakra-ui/react";

export interface SurveyQuestionType {
  id: number;
  label: string;
  info: string;
  data_type: string;
}

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

interface SurveyQuestionProps {
  question: SurveyQuestionType;
  canAnswer: boolean;
  canEdit: boolean;
}

const SurveyQuestion = ({
  question,
  canAnswer,
  canEdit,
}: SurveyQuestionProps) => {
  const { label, info, data_type } = question;
  console.log(question);

  const setValue = (value: unknown) => {
    console.log(value);
  };

  const renderInput = () => {
    if (data_type === "checkbox") {
      return (
        <Checkbox.Root disabled={!canAnswer}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      );
    }
    if (data_type === "radio") {
      return (
        <RadioGroup.Root
          value={""}
          onValueChange={(e) => setValue(e.value)}
          disabled={!canAnswer}
        >
          <HStack gap="6">
            {options.map((option) => (
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
        <NativeSelect.Root disabled={!canAnswer}>
          <NativeSelect.Field>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      );
    }
    return <Input type={data_type} disabled={!canAnswer} />;
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
