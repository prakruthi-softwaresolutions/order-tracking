import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import CreateTable from './CreateTable';
import TablesList from './TablesList';
import OrderTrackingWindow from './OrderTrackingWindow';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<CreateTable />} />
          <Route path="/tables" element={<TablesList />} />
          <Route path="/tracking" element={<OrderTrackingWindow />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
