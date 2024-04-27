// Complete the Index page component here
// Use chakra-ui
import { Box, VStack, Input, Button, List, ListItem, Heading } from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa"; // example - use react-icons/fa for icons
import { getClient } from "lib/supabase";

import { useState, useEffect } from "react";

const Index = () => {
  const client = getClient('testproject');
  const key = 'testkey';

  // state mgmt
  const [objects, setObjects] = useState([]);
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState('');
  const [clicks, setClicks] = useState(0);
  
  // write onClick function
  const handleClick = () => {
    console.log("Button clicked");
    client.set(key, clicks + 1);
    setClicks(clicks + 1);
  };

  // effect
  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      const client = getClient('testproject');
      const { data, error } = await client.from('domains').select('*');
      if (error) {
        console.error("Failed to fetch domains", error);
      } else {
        console.log("Fetched domains", data);
      }
      setDomains(data);
    };  
    fetchData();
  }, []);

  // TODO: Create the website here!
  return (
    <Box p={5}>
    <VStack spacing={4}>
      <Heading as="h1" size="xl">Domain Sales List</Heading>
      <Input
        placeholder="Add new domain"
        value={newDomain}
        onChange={(e) => setNewDomain(e.target.value)}
      />
      <Button onClick={handleAddDomain} colorScheme="blue">Add Domain</Button>
      <List spacing={3}>
        {domains.map((domain, index) => (
          <ListItem key={index}>{domain}</ListItem>
        ))}
      </List>
    </VStack>
  </Box>
  ); // example
};

export default Index;
