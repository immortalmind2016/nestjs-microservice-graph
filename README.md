# AvafiveTask

it's a simple task shows the order flow of the user and the order details

## Perquisites

- Node.js
- Docker
- Enabled docker-compose
- nx [to manage the monorepo]

## Installation

```bash
npm install
```

```bash
npm install --global nx@latest
```

## Running the app

- spin up the postgres database, zookeeper and kafka.

```bash
docker-compose up -d
```

- run all services

```bash
./scripts/run-all.sh
```

## Playground

- you can open http://localhost:3000/graphql to open the graphql playground

## Async Communication flow

We are using kafka in this project to communicate between services, the flow is as follows:

- The order service will produce an event to the kafka topic when the order is created.
- The product service will consume the event and update the product price and quantity.
- The order service will consume the event and update the order status,total price.

![Alt text](https://imageupload.io/ib/5PoSCIPFmZxBpff_1698916931.jpg 'flow')
check it on draw.io: https://drive.google.com/file/d/1uiz4vlbzhkormFkyRXAVqjTPhANQa7sm/view?usp=sharing

## Order Snapshot

- The order will be saved in the database as a snapshot, so we can query the order details without the need to join the order and order items tables,
  To have the price of the product at the time of the order.

## Order Status

- Once the order created the status will be `Pending`
- Once the order items are updated the status will be `Completed` or `quantity not available` if the quantity is not available.
- The client side should poll the order status to get the latest status.

## What Next?

- Testing
- Kubernetes to orchestrate the services.
- Docker image for every service
- CI/CD for every service
- CD: build and deploy the docker image to registry.
- CI: run the tests and linting.
- Lock items in the order when the order is created for a specific time.
