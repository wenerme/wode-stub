import { graphql } from '@/gql';

const CurrentUserFragment = graphql(`
  fragment CurrentUserFragment on CurrentUser {
    id
    fullName
    displayName
    photoUrl
    loginName
    email
    joinDate
    #    roles: allRoles {
    #      id
    #      title
    #      code
    #    }
  }
`);

const UserLoaderQuery = graphql(`
  query UserLoaderQuery {
    data: currentUser {
      id
      ...CurrentUserFragment
    }
  }
`);
