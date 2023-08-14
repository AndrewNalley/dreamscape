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
    query story($storyId: ID!) {
        story(storyId: $storyId) {
            _id
            title
            scenes {
                _id
                storyId
                indexOrder
                imagePath
                text
                
            }
        }
    }`

export const GET_SCENE = gql`
    query scene($sceneId: ID!) {
        scene(sceneId:  $sceneId) {
            _id
            storyId
            indexOrder
            imagePath
            text
            
        }
    }`

    export const QUERY_USER = gql`
    query user($username: String!) {
      user(username: $username) {
        _id
        username
        email
     
        
      }
    }`
