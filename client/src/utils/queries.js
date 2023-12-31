import { gql } from '@apollo/client'

export const GET_ME = gql`
{
    me {
        _id
        username
        stories {
            _id
           title
           scenes {
            _id
           }
           shared 
        }
    }
}`

export const GET_COMMUNAL = gql`
    query communityStories {
        communityStories {
            _id
            title
            shared
        }
    }`

export const GET_STORY = gql`
    query story($storyId: ID!) {
        story(storyId: $storyId) {
            _id
            title
            user
            username
            scenes {
                 _id
                storyId
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
            imagePath
            text
            
        }
    }`

    export const QUERY_USER = gql`
    query user($username: String!) {
      user(username: $username) {
        _id
        username
    
      }
    }`

    export const QUERY_USERID = gql`
    query Query($userId: ID!) {
        user(id: $userId) {
          _id
          username
        }
      }`
