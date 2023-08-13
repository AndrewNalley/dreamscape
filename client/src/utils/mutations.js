import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`

export const CREATE_STORY = gql`
    mutation createStory($title: String!){
        createStory(title: $title) {
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
            shared
        }
    }`

export const CREATE_SCENE = gql`
    mutation createScene($storyId: ID!, $imagePath: String!, $text: String, $audio: String) {
        createScene(storyId: $storyId, imagePath: $imagePath, text: $text, audio: $audio) {
            _id
            storyId
            indexOrder
            imagePath
            text
            audio
        }
    }`

export const REMOVE_STORY = gql`
    mutation removeStory($storyId: ID!) {
        removeStory(storyId: $storyId) {
            _id
            username
            stories {
               title
               shared 
            }  
        }
    }`

export const REMOVE_SCENE = gql`
    mutation removeScene($sceneId: ID!) {
        removeScene(sceneId: $sceneId) {
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
            shared
        }
    }`

