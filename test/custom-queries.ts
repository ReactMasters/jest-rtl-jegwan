import {
  queryHelpers,
  buildQueries,
  Matcher,
  MatcherOptions,
} from "@testing-library/react";

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByDataTid = (
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions
) => queryHelpers.queryAllByAttribute("data-tid", container, id, options);

const getMultipleError = (_container: HTMLElement, dataTidValue: any) =>
  `Found multiple elements with the data-tid attribute of: ${dataTidValue}`;
const getMissingError = (_container: HTMLElement, dataTidValue: any) =>
  `Unable to find an element with the data-tid attribute of: ${dataTidValue}`;

const [queryByTid, getAllByTid, getByTid, findAllByTid, findByTid] =
  buildQueries(queryAllByDataTid, getMultipleError, getMissingError);

export {
  queryByTid,
  queryAllByDataTid,
  getByTid,
  getAllByTid,
  findAllByTid,
  findByTid,
};
