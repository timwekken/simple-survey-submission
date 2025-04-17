import { useState, useEffect, FormEvent } from "react";
import { Stack, Table, Button, Input, HStack } from "@chakra-ui/react";
import {
  FaEye,
  FaFileUpload,
  FaEdit,
  FaTrashAlt,
  FaSearch,
} from "react-icons/fa";
import Survey, { SurveyType } from "../components/Survey";

const Home = () => {
  const [surveys, setSurveys] = useState<SurveyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyType | null>(null);

  useEffect(() => {
    const getSurveys = async () => {
      const surveyResponse = await fetch("http://localhost:5000/surveys")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error fetching surveys:", error);
        });
      setSurveys(surveyResponse);
      setLoading(false);
    };
    getSurveys();
  }, []);

  const submitSearch = async (e: FormEvent) => {
    console.log("Search submitted");
    e.preventDefault();
  };

  const viewSurvey = (survey: SurveyType) => {
    setSelectedSurvey(survey);
  };

  const closeOpenSurvey = () => {
    setSelectedSurvey(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Stack gap="4" p="8">
        <form onSubmit={submitSearch}>
          <HStack justifyContent="space-between" pb="4">
            <Input placeholder="Search for surveys" />
            <Button type="submit" colorPalette="blue">
              Search <FaSearch />
            </Button>
          </HStack>
        </form>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Description</Table.ColumnHeader>
              <Table.ColumnHeader>Assigned to</Table.ColumnHeader>
              <Table.ColumnHeader>View</Table.ColumnHeader>
              <Table.ColumnHeader>Complete</Table.ColumnHeader>
              <Table.ColumnHeader>Edit</Table.ColumnHeader>
              <Table.ColumnHeader>Delete</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {surveys.map((survey) => (
              <Table.Row key={survey.id}>
                <Table.Cell>
                  <b>{survey.title}</b>
                </Table.Cell>
                <Table.Cell>{survey.description}</Table.Cell>
                <Table.Cell>Person</Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    colorPalette="grey"
                    variant="surface"
                    onClick={() => viewSurvey(survey)}
                  >
                    View <FaEye />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    colorPalette="cyan"
                    variant="surface"
                    onClick={() => viewSurvey(survey)}
                  >
                    Complete <FaFileUpload />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    colorPalette="orange"
                    variant="surface"
                    onClick={() => viewSurvey(survey)}
                  >
                    Edit <FaEdit />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    colorPalette="red"
                    variant="surface"
                    onClick={() => viewSurvey(survey)}
                  >
                    Delete <FaTrashAlt />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
      {selectedSurvey && (
        <Survey
          survey={selectedSurvey}
          canAnswer={true}
          canEdit={true}
          surveyIsOpen={!!selectedSurvey}
          closeOpenSurvey={closeOpenSurvey}
        />
      )}
    </>
  );
};

export default Home;
