import { gql } from '@apollo/client'

export const HEALTH_CHECKUP = gql`
    query ExampleQuery {
        health
    }
`