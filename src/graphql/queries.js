/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      playerIndex
      oneshotNo
      oneshotAge
      oneshotHon
      oneshotTen
      oneshotTou
      oneshotName
      oneshotRitu1
      oneshotRitu2
      oneshotDajyun
      oneshotPosition
      createdAt
      updatedAt
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        playerIndex
        oneshotNo
        oneshotAge
        oneshotHon
        oneshotTen
        oneshotTou
        oneshotName
        oneshotRitu1
        oneshotRitu2
        oneshotDajyun
        oneshotPosition
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
