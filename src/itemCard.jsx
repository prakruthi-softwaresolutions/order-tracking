import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
  Heading,
  Flex,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
function itemCard() {
    return (
<Card
                maxH="200px" // Set the desired maximum height for the entire card here
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  // maxH="150px"
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">Iteam Title</Heading>
                  </CardBody>

                  <CardFooter>
                    <Button variant="solid" colorScheme="blue">
                      Pick Order
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
                );
            }
            
            export default itemCard;