import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      title
      amount
      type
      category
      timestamp
    }
  }
`;

export const GET_TRANSACTIONS_BY_CATEGORY = gql`
  query GetTransactionsByCategory($category: String!) {
    transactionsByCategory(category: $category) {
      id
      title
      amount
      type
      category
      timestamp
    }
  }
`;
