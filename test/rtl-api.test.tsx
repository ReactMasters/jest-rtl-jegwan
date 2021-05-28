import { logRoles, prettyDOM, render, within } from "@app/test/test-utils";
import Button from "@app/components/atoms/Button";

const Greeting = () => {
  return <h1>Hello</h1>;
};
describe("React Testing Library API tests", () => {
  test("multiple render & custom queries", () => {
    const result1 = render(<Button data-tid="button" />);
    const result2 = render(<Button data-tid="button2" />);
    // Render into a container which is appended to document.body
    // body 밑에 매 render 마다 div로 감싸서 append를 하고 있습니다.
    // getByTid는 직접 만든 커스텀 쿼리 위의 test-utils 참조.
    expect(result1.getByTid("button")).toBeInTheDocument();
    expect(result2.getByTid("button2")).toBeInTheDocument();
    // DOM을 문자열로 프린트하고 싶다면, prettyDOM을 쓰자.
    // console.log(prettyDOM(document.body));
    // This method is a shortcut for console.log(prettyDOM(baseElement)).
    result1.debug();
    expect(() => result2.getByTid("button3")).toThrow();
  });

  test("unmount", () => {
    const result1 = render(<Button data-tid="button" />);
    expect(result1.getByTid("button")).toBeInTheDocument();
    result1.debug();

    result1.unmount();
    expect(result1.container.innerHTML).toBeFalsy(); // innerHTML === ""
    result1.debug();
    const result2 = render(<Button data-tid="button2" />);
    result2.debug();
    expect(result2.getByTid("button2")).toBeInTheDocument();
  });

  test("match snaption", () => {
    const { container, getByText } = render(<Greeting />);
    expect(getByText("Hello")).toBeInTheDocument();

    expect(container.firstChild).toMatchInlineSnapshot(`
      <h1>
        Hello
      </h1>
    `);
    // 자동으로 줄바꿈 되거나, styled-components 의 해쉬화된 클래스 네임등, 여러가지에서 snapshot test는 한계가 있는 것 같다.
  });

  test("custom container", () => {
    // 본래 React Testing Library(rtl)은 div로 감싸서 document.body 에 append 하지만
    // 감싸는 wrapper 즉 div를 커스텀하게 바꿀 수도 있다.
    const table = document.createElement("table");
    const { container, debug } = render(<tbody />, {
      container: document.body.appendChild(table),
    });

    expect(container.firstChild).toMatchInlineSnapshot(`<tbody />`);
    // 정말 container가 table로 바뀌었는지 테스트
    expect(container).toEqual(table);
    debug();
  });

  test("log roles", () => {
    const { container, getByRole, getAllByRole } = render(
      <nav>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </nav>
    );
    logRoles(container);
    expect(getByRole("navigation")).toBeInTheDocument();
    expect(getByRole("list")).toBeInTheDocument();
    expect(getAllByRole("listitem").length).toBe(2);
    expect(getAllByRole("listitem")[0]).toBeInTheDocument();
  });

  test("Querying Within Elements", () => {
    const nav = document.createElement("nav");
    nav.innerHTML = `
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>`;
    document.body.appendChild(nav);
    // logRoles(nav);

    // within (an alias to getQueriesForElement) takes a DOM element and binds it to the raw query functions, allowing them to be used without specifying a container
    expect(within(nav).getByRole("list")).toBeInTheDocument();
    // console.log(prettyDOM(nav));
  });
});
