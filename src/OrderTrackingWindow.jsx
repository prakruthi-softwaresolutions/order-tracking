// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { Card, CardHeader, CardBody, Flex, Heading, List, Text } from "@chakra-ui/react";
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import styled from "styled-components";  

// const Container = styled.div`
//   display: flex;
// `;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   background: isDragging ? "lightgreen" : "grey",
//   ...draggableStyle,
// });

// function OrderCard({ order, index }) {
//   return (
//     <Draggable draggableId={order.id.toString()} index={index}>
//       {(provided, snapshot) => (
//         <div
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//           style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
//         >
//           <Card>
//             <CardHeader>
//               <Heading size="md">{order.text}</Heading>
//             </CardHeader>
//           </Card>
//         </div>
//       )}
//     </Draggable>
//   );
// }

// function OrderCardList({ title, list }) {
//   return (
//     <Card width="100%" height="100%">
//       <CardHeader>
//         <Heading size="md">{title}</Heading>
//       </CardHeader>
//       <CardBody>
//         <Droppable droppableId={title.toLowerCase()} key={title.toLowerCase()}>
//           {(provided, snapshot) => (
//             <div ref={provided.innerRef} {...provided.droppableProps}>
//               <List>
//                 {list.map((order, index) => (
//                   <OrderCard key={order.id} order={order} index={index} />
//                 ))}
//               </List>
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </CardBody>
//     </Card>
//   );
// }

// function OrderTrackingWindow() {
//   const [orders, setOrders] = useState([
//     { id: 1, text: "Sample Order" } 
//   ]);

//   useEffect(() => {
    
//   }, []);

//   const onDragEnd = (result) => {
    
//     console.log(result);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Container>
//           {/* order placed */}
//           <OrderCardList title="Orders Placed" list={orders} />

//           {/* Processing */}
//           <OrderCardList title="Processing" list={[]} />

//           {/* ready to serve */}
//           <OrderCardList title="Ready to Serve" list={[]} />
//         </Container>
//       </DragDropContext>
//     </DndProvider>
//   );
// }

// export default OrderTrackingWindow;



import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  background,
} from "@chakra-ui/react";
import axios from "axios";

const ItemType = "ORDER";

const OrderCard = ({ id, text, index, moveCard }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div style={{background:'gray'}} ref={(node) => ref(drop(node))}>
      <Card>
        <CardHeader>
          <Heading size="md">{text}</Heading>
        </CardHeader>
      </Card>
    </div>
  );
};

function OrderTrackingWindow() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON server
    axios.get("http://localhost:3001/orders").then((response) => {
      setOrderList(response.data);
    });
  }, []);

  const moveCard = (fromIndex, toIndex) => {
    const updatedOrderList = [...orderList];
    const [movedOrder] = updatedOrderList.splice(fromIndex, 1);
    updatedOrderList.splice(toIndex, 0, movedOrder);
    setOrderList(updatedOrderList);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="xl"
          fontWeight="extrabold"
        >
          Orders Tracking
        </Text>
        <Flex justify="space-around" align="center" height="100vh" width="100vw" p="4">
          {/* order placed */}
          <OrderCardList
            title="Orders Placed"
            list={orderList}
            moveCard={moveCard}
          />

          {/* Processing */}
          <OrderCardList title="Processing" list={[]} moveCard={moveCard} />

          {/* ready to serve */}
          <OrderCardList title="Ready to Serve" list={[]} moveCard={moveCard} />
        </Flex>
      </>
    </DndProvider>
  );
}

const OrderCardList = ({ title, list, moveCard }) => (
  <Card width="100%" height="100%" m={1}>
    <CardHeader>
      <Heading size="md">{title}</Heading>
    </CardHeader>

    <CardBody>
      <Stack divider={<StackDivider />} spacing="4">
        {list.map((order, index) => (
          <OrderCard
            key={order.id}
            id={order.id}
            text={order.text}
            index={index}
            moveCard={moveCard}
          />
        ))}
      </Stack>
    </CardBody>
  </Card>
);

export default OrderTrackingWindow;

