import { gql } from '@apollo/client';

export const ADD_TRANSACTION = gql`
  mutation AddTransaction(
    $type: String!
    $wallet: String!
    $amount: Float!
    $category: String
    $date: String!
    $description: String
  ) {
    addTransaction(
      type: $type
      wallet: $wallet
      amount: $amount
      category: $category
      date: $date
      description: $description
    ) {
      id
      type
      amount
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;
