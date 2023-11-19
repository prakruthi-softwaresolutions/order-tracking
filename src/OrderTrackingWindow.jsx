import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VStack,
  Heading,
  IconButton,
  StackDivider,
  Stack,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Box,
  Button,
  Image,
  Text,
  CardFooter,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function OrderTrackingWindow() {
  const [orders, setOrders] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        const ordersData = response.data;

        if (Array.isArray(ordersData)) {
          const initialOrders = ordersData.map((order) => ({
            id: order.id,
            text: order.item,
            image: order.image,
            quantity: order.quantity,
          }));
          setOrders(initialOrders);
        } else {
          console.error("Invalid data format:", ordersData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addToProgress = (id) => {
    const item = orders.find((x) => x.id === id);
    setInProgress([item, ...inProgress]);
    const filterArray = orders.filter((x) => x.id !== id);
    setOrders(filterArray);
  };

  const addToCompleted = (id) => {
    const item = inProgress.find((x) => x.id === id);
    setCompleted([item, ...completed]);
    const filterArray = inProgress.filter((x) => x.id !== id);
    setInProgress(filterArray);
  };

  const removeFromCompleted = (id) => {
    const filterArray = completed.filter((x) => x.id !== id);
    setCompleted(filterArray);
  };

  return (
    <VStack align="center" spacing="4">
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={4}
        height="100vh"
        width="100%"
        p="4"
      >
        {/* Orders Placed */}
        <Card bg="blue.100" height="100%" width="100%">
          <CardHeader>
            <Heading size="md">Orders Placed</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing="4">
              {orders.map((item) => (
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  key={item.id}
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={item.image}
                    alt={item.text}
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">{item.text}</Heading>

                      <Text py="2">Quantity: {item.quantity}</Text>
                    </CardBody>

                    <CardFooter>
                      <IconButton
                        icon={<CheckIcon />}
                        onClick={() => addToProgress(item.id)}
                        ml={2}
                        colorScheme="green"
                      />
                    </CardFooter>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </CardBody>
        </Card>

        {/* Processing */}
        <Card bg="yellow.100" height="100%" width="100%">
          <CardHeader>
            <Heading size="md">Processing</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing="4">
              {inProgress.map((item) => (
                <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                key={item.id}
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={item.image}
                  alt={item.text}
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{item.text}</Heading>

                    <Text py="2">Quantity: {item.quantity}</Text>
                  </CardBody>

                    <CardFooter>
                      <IconButton
                        icon={<CheckIcon />}
                        onClick={() => addToCompleted(item.id)}
                        ml={2}
                        colorScheme="green"
                      />
                    </CardFooter>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </CardBody>
        </Card>

        {/* Ready to Serve */}
        <Card bg="green.100" height="100%" width="100%">
          <CardHeader>
            <Heading size="md">Ready to Serve</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing="4">
              {completed.map((item) => (
                <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                key={item.id}
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={item.image}
                  alt={item.text}
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{item.text}</Heading>

                    <Text py="2">Quantity: {item.quantity}</Text>
                  </CardBody>


                    <CardFooter>
                      <Button
                        colorScheme="green"
                        onClick={() => removeFromCompleted(item.id)}
                      >
                        Served
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );
}

export default OrderTrackingWindow;
