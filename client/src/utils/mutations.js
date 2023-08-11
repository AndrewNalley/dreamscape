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

export const UPDATE_USER = gql`
    mutation updateUser(username: String!, password: String!) {
        updateUser(username: $username, password: $password) {
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

export const UPDATE_STORY = gql`
    mutation updateStory($id: ID!) {
        updateStory(id: $id) {
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

    export const UPDATE_SCENE = gql`
    mutation updateScene($id: ID!, $imagePath: String!, $text: String, $audio: String) {
        updateScene(id: $id, imagePath: $imagePath, text: $text, audio: $audio) {
            _id
            storyId
            indexOrder
            imagePath
            text
            audio
        }
    }`