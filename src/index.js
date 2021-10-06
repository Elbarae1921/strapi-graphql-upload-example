import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
    link: createUploadLink({
        uri: String(process.env.URL)
    }),
    cache: new InMemoryCache()
});

const UPLOAD = gql`
    mutation($file: Upload!) {
        upload(file: $file) {
            name
            url
        }
    }
`;

const input = document.getElementById("file");

input.onchange = () => {
    const file = input.files[0];
    client
        .mutate({
            mutation: UPLOAD,
            variables: {
                file
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
}