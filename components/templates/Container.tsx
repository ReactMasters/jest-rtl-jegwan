import { FunctionComponent } from "react";
import Head from "next/head";

interface Props {
  title?: string;
}

const Container: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0"
        />
      </Head>
      {children}
    </>
  );
};

export default Container;
