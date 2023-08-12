import { gql } from '@apollo/client'

export const GET_ME = gql`
{
    me {
        _id
        username
        stories {
           title
           shared 
        }
    }
}`

export const GET_COMMUNAL = gql`
    query communityStories {
        stories {
            _id
            title
        }
    }`

export const GET_STORY = gql`
    query story($id: ID!) {
        story(id: $id) {
            _id
            title
            scenes {
                _id
                storyId
                indexOrder
                imagePath
                text
                audio
            }
        }
    }`

export const GET_SCENE = gql`
    query scene($id: ID!) {
        scene(id: $id) {
            _id
            storyId
            indexOrder
            imagePath
            text
            audio
        }
    }`
