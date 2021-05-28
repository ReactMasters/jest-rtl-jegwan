import stc from "@app/styles/constants";
import styled from "styled-components";

const Main = styled.main`
  min-height: 100vh;
  & > section {
    /* 모바일 퍼스트 */
    max-width: ${stc.sizes.mobileWidth}px;
    padding: 1.6rem ${stc.sizes.defaultPadding}px 5rem;
    margin: 0 auto;
  }
`;

export default Main;
