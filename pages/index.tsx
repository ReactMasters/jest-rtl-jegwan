import Main from "@app/components/atoms/Main";
import Section from "@app/components/atoms/Section";
import { Container } from "next/app";

interface HomePageProps {}

const HomePage = (_props: HomePageProps) => {
  return (
    <Container>
      <Main>
        <Section>hello 😀</Section>
      </Main>
    </Container>
  );
};

export default HomePage;
