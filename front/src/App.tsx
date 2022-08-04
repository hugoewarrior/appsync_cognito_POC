import { Amplify, graphqlOperation } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Connect } from 'aws-amplify-react';

import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import { MessagesList } from './components/MessageList';
import { SendMessage } from './components/SendMessage';

const stack = require("./stack.json");

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: stack.Region,
    userPoolId: stack.UserPoolId,
    identityPoolId: stack.IdentityPoolId,
    userPoolWebClientId: stack.UserPoolClientId,
  },

  aws_appsync_graphqlEndpoint: stack.GraphQlApiUrl,
  aws_appsync_region: stack.Region,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
});

export default function App() {


  const print_userPrps = (user: any) => {
    console.log(user);
    return ""
  }



  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <main>
            <div style={{
              width: "100%",
              margin: "auto",
              textAlign: "center"
            }}>
              <h1>Hello {(user as any).username}</h1>
              <p>{print_userPrps(user)}</p>
              <p>Email: {user?.attributes?.email}</p>
              <button onClick={signOut}>Sign out</button>
            </div>
          </main>


          <div>
            <Connect
              query={graphqlOperation(queries.getMessages)}
            >
              {({ data: { getMessages }, loading, error }: any): any => {
                if (error) return <h3>Error</h3>;
                if (loading || !getMessages) return <h3>Loading...</h3>;

                return (
                  <MessagesList
                    messages={getMessages}
                    username={(user as any).username}
                  />
                );
              }}
            </Connect>
            <Connect
              mutation={graphqlOperation(mutations.createMessage)}
            >
              {({ mutation }:any) => <SendMessage onCreate={mutation} />}
            </Connect>
          </div>
        </>
      )}
    </Authenticator>
  );
}