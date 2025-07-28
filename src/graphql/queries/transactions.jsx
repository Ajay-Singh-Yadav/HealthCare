// src/graphql/queries/transactions.js
import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      amount
      description
      category
      type
      wallet
      date
    }
  }
`;
