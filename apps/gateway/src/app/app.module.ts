import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { authContext } from './authContext';
import waitOn from "wait-on"



const services = {
  users: 3001,
  products: 3002,
  orders: 3003,
};

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory:async ()=>{

        await waitOn({
          resources: Object.entries(services).map(([, port]) => `tcp:${port}`),
          timeout: 45000,
          delay: 100,
        });        return {
           server:{
          context:authContext

        },
        gateway: {

          buildService({ url }) {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {

                request.http.headers.set(
                  'user',
                  context.user ? JSON.stringify(context.user) : null,
                );
              },
            });
          },

          supergraphSdl: new IntrospectAndCompose({
            subgraphs: Object.entries(services).map(([service, port]) => ({
              name: service,
              url: `http://localhost:${port}/graphql`,
            })),


          }),}
      }


      },
    }),
  ],
})
export class AppModule {}
