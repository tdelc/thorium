import React from "react";
import gql from "graphql-tag.macro";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import "./style.scss";

const fragment = gql`
  fragment TemplateData on Template {
    id
  }
`;

export const TEMPLATE_CORE_QUERY = gql`
  query Template($simulatorId: ID!) {
    _template(simulatorId: $simulatorId) {
      ...TemplateData
    }
  }
  ${fragment}
`;
export const TEMPLATE_CORE_SUB = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    _templateUpdate(simulatorId: $simulatorId) {
      ...TemplateData
    }
  }
  ${fragment}
`;

const TemplateCore = props => {
  const {simulator} = props;
  const {loading, data} = useQueryAndSubscription(
    {query: TEMPLATE_CORE_QUERY, variables: {simulatorId: simulator.id}},
    {query: TEMPLATE_CORE_SUB, variables: {simulatorId: simulator.id}},
  );

  if (loading || !data) return null;
  const {template} = data;
  if (!template) return <div>No Template</div>;
  return <div className="core-template">Template Core</div>;
};
export default TemplateCore;
