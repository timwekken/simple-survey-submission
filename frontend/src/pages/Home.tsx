import { useState, useEffect, FormEvent } from "react";
import {
  Stack,
  Table,
  Button,
  Input,
  HStack,
  Center,
  Spinner,
  NativeSelect,
} from "@chakra-ui/react";
import { FaEye, FaFileUpload, FaTrashAlt, FaSearch } from "react-icons/fa";
import { User } from "@/types/user";
import { SurveyType } from "@/types/survey";
import api from "../utils/api";
import Survey from "../components/Survey";

const Home = () => {
  const [surveys, setSurveys] = useState<SurveyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyType | null>(null);
  const [viewOnly, setViewOnly] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);

  const getSurveys = async (queryText: string) => {
    const surveyResponse = await api.getSurveys(queryText);
    setSurveys(surveyResponse);
  };

  const getUserList = async () => {
    const usersResponse = await api.getUsers();
    setUserList(usersResponse);
  };

  const getInitialData = async () => {
    setLoading(true);
    await getUserList();
    await getSurveys("");
    setLoading(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const submitSearch = async (e: FormEvent) => {
    console.log("Search submitted");
    e.preventDefault();
    setLoading(true);
    getSurveys(searchText);
    setLoading(false);
  };

  const assignSurveyToUser = async (surveyId: number, userId: number) => {
    if (userId === -1) {
      // TODO: Add functionality to unassign user
    }
    api.assignSurveyToUser(surveyId, userId);
  };

  const viewSurvey = (survey: SurveyType) => {
    setViewOnly(true);
    setSelectedSurvey(survey);
  };

  const completeSurvey = (survey: SurveyType) => {
    setViewOnly(false);
    setSelectedSurvey(survey);
  };

  const closeOpenSurvey = () => {
    setSelectedSurvey(null);
  };

  const deleteSurvey = async (surveyId: number) => {
    try {
      await api.deleteSurveyById(surveyId);
      setSurveys((prevSurveys) =>
        prevSurveys.filter((survey) => survey.id !== surveyId)
      );
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  return (
    <>
      <Stack gap="4" p="8">
        <form onSubmit={submitSearch}>
          <HStack justifyContent="space-between" pb="4">
            <Input
              value={searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              type="search"
              placeholder="Search for surveys"
            />
            <Button type="submit" colorPalette="blue">
              <FaSearch />
            </Button>
          </HStack>
        </form>
        {loading ? (
          <Center p="32">
            <Spinner color="teal.500" />
          </Center>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Title</Table.ColumnHeader>
                <Table.ColumnHeader>Description</Table.ColumnHeader>
                <Table.ColumnHeader>Assigned to</Table.ColumnHeader>
                <Table.ColumnHeader>View</Table.ColumnHeader>
                <Table.ColumnHeader>Complete</Table.ColumnHeader>
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
                  <Table.Cell>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        onChange={(e) =>
                          assignSurveyToUser(survey.id, Number(e.target.value))
                        }
                        defaultValue={survey?.survey_assignment?.user?.id ?? -1}
                      >
                        <option key={"null"} value={-1}>
                          No assigned user
                        </option>
                        {userList.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.email}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Table.Cell>
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
                      onClick={() => completeSurvey(survey)}
                    >
                      Complete <FaFileUpload />
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="sm"
                      colorPalette="red"
                      variant="surface"
                      onClick={() => deleteSurvey(survey.id)}
                    >
                      Delete <FaTrashAlt />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Stack>
      {selectedSurvey && (
        <Survey
          survey={selectedSurvey}
          viewOnly={viewOnly}
          surveyIsOpen={!!selectedSurvey}
          closeOpenSurvey={closeOpenSurvey}
        />
      )}
    </>
  );
};

export default Home;
