import { gql } from '@apollo/client';

export const ADD_TRANSACTION = gql`
  mutation AddTransaction(
    $title: String!
    $amount: Float!
    $type: String!
    $category: String!
  ) {
    addTransaction(
      title: $title
      amount: $amount
      type: $type
      category: $category
    ) {
      id
      title
      amount
      type
      category
      timestamp
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      id
      title
      amount
      type
      category
      timestamp
    }
  }
`;
