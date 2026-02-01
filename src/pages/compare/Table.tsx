import {
  Box as ChakraBox,
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
  SimpleGrid as ChakraSimpleGrid,
  Text,
  Heading,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '../../components/ui';

const CompareSection = ({
  title,
  chakraVersion,
  newVersion,
}: {
  title: string;
  chakraVersion: React.ReactNode;
  newVersion: React.ReactNode;
}) => (
  <ChakraBox mb={8}>
    <Heading size="md" mb={4}>{title}</Heading>
    <ChakraSimpleGrid columns={2} spacing={4}>
      <ChakraBox>
        <Text fontWeight="bold" mb={2} color="blue.600">Chakra UI</Text>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {chakraVersion}
        </ChakraBox>
      </ChakraBox>
      <ChakraBox>
        <Text fontWeight="bold" mb={2} color="green.600">New (CSS Modules)</Text>
        <ChakraBox border="1px" borderColor="gray.200" p={4} borderRadius="md">
          {newVersion}
        </ChakraBox>
      </ChakraBox>
    </ChakraSimpleGrid>
  </ChakraBox>
);

const sampleData = [
  { id: 1, name: '山田太郎', email: 'yamada@example.com', role: '管理者' },
  { id: 2, name: '鈴木花子', email: 'suzuki@example.com', role: '編集者' },
  { id: 3, name: '田中一郎', email: 'tanaka@example.com', role: '閲覧者' },
];

const numericData = [
  { item: '商品A', quantity: 100, price: 1500, total: 150000 },
  { item: '商品B', quantity: 250, price: 800, total: 200000 },
  { item: '商品C', quantity: 50, price: 3200, total: 160000 },
];

const TableComparePage = () => {
  return (
    <ChakraBox p={8} maxW="1400px" mx="auto">
      <Heading mb={8}>Table Components Comparison</Heading>

      <CompareSection
        title="Table - variant=simple (default)"
        chakraVersion={
          <ChakraTable variant="simple">
            <ChakraThead>
              <ChakraTr>
                <ChakraTh>名前</ChakraTh>
                <ChakraTh>メール</ChakraTh>
                <ChakraTh>役割</ChakraTh>
              </ChakraTr>
            </ChakraThead>
            <ChakraTbody>
              {sampleData.map((row) => (
                <ChakraTr key={row.id}>
                  <ChakraTd>{row.name}</ChakraTd>
                  <ChakraTd>{row.email}</ChakraTd>
                  <ChakraTd>{row.role}</ChakraTd>
                </ChakraTr>
              ))}
            </ChakraTbody>
          </ChakraTable>
        }
        newVersion={
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>名前</Th>
                <Th>メール</Th>
                <Th>役割</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sampleData.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.name}</Td>
                  <Td>{row.email}</Td>
                  <Td>{row.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        }
      />

      <CompareSection
        title="Table - variant=striped"
        chakraVersion={
          <ChakraTable variant="striped">
            <ChakraThead>
              <ChakraTr>
                <ChakraTh>名前</ChakraTh>
                <ChakraTh>メール</ChakraTh>
                <ChakraTh>役割</ChakraTh>
              </ChakraTr>
            </ChakraThead>
            <ChakraTbody>
              {sampleData.map((row) => (
                <ChakraTr key={row.id}>
                  <ChakraTd>{row.name}</ChakraTd>
                  <ChakraTd>{row.email}</ChakraTd>
                  <ChakraTd>{row.role}</ChakraTd>
                </ChakraTr>
              ))}
            </ChakraTbody>
          </ChakraTable>
        }
        newVersion={
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>名前</Th>
                <Th>メール</Th>
                <Th>役割</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sampleData.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.name}</Td>
                  <Td>{row.email}</Td>
                  <Td>{row.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        }
      />

      <CompareSection
        title="Table - size=sm"
        chakraVersion={
          <ChakraTable variant="simple" size="sm">
            <ChakraThead>
              <ChakraTr>
                <ChakraTh>名前</ChakraTh>
                <ChakraTh>メール</ChakraTh>
                <ChakraTh>役割</ChakraTh>
              </ChakraTr>
            </ChakraThead>
            <ChakraTbody>
              {sampleData.map((row) => (
                <ChakraTr key={row.id}>
                  <ChakraTd>{row.name}</ChakraTd>
                  <ChakraTd>{row.email}</ChakraTd>
                  <ChakraTd>{row.role}</ChakraTd>
                </ChakraTr>
              ))}
            </ChakraTbody>
          </ChakraTable>
        }
        newVersion={
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>名前</Th>
                <Th>メール</Th>
                <Th>役割</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sampleData.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.name}</Td>
                  <Td>{row.email}</Td>
                  <Td>{row.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        }
      />

      <CompareSection
        title="Table - size=md (default)"
        chakraVersion={
          <ChakraTable variant="simple" size="md">
            <ChakraThead>
              <ChakraTr>
                <ChakraTh>名前</ChakraTh>
                <ChakraTh>メール</ChakraTh>
                <ChakraTh>役割</ChakraTh>
              </ChakraTr>
            </ChakraThead>
            <ChakraTbody>
              {sampleData.map((row) => (
                <ChakraTr key={row.id}>
                  <ChakraTd>{row.name}</ChakraTd>
                  <ChakraTd>{row.email}</ChakraTd>
                  <ChakraTd>{row.role}</ChakraTd>
                </ChakraTr>
              ))}
            </ChakraTbody>
          </ChakraTable>
        }
        newVersion={
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>名前</Th>
                <Th>メール</Th>
                <Th>役割</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sampleData.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.name}</Td>
                  <Td>{row.email}</Td>
                  <Td>{row.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        }
      />

      <CompareSection
        title="Table - size=lg"
        chakraVersion={
          <ChakraTable variant="simple" size="lg">
            <ChakraThead>
              <ChakraTr>
                <ChakraTh>名前</ChakraTh>
                <ChakraTh>メール</ChakraTh>
                <ChakraTh>役割</ChakraTh>
              </ChakraTr>
            </ChakraThead>
            <ChakraTbody>
              {sampleData.map((row) => (
                <ChakraTr key={row.id}>
                  <ChakraTd>{row.name}</ChakraTd>
                  <ChakraTd>{row.email}</ChakraTd>
                  <ChakraTd>{row.role}</ChakraTd>
                </ChakraTr>
              ))}
            </ChakraTbody>
          </ChakraTable>
        }
        newVersion={
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th>名前</Th>
                <Th>メール</Th>
                <Th>役割</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sampleData.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.name}</Td>
                  <Td>{row.email}</Td>
                  <Td>{row.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        }
      />

      <CompareSection
        title="Table - isNumeric (right-aligned)"
        chakraVersion={
          <ChakraTable variant="simple">
            <ChakraThead>
              <ChakraTr>
                <ChakraTh>商品</ChakraTh>
                <ChakraTh isNumeric>数量</ChakraTh>
                <ChakraTh isNumeric>単価</ChakraTh>
                <ChakraTh isNumeric>合計</ChakraTh>
              </ChakraTr>
            </ChakraThead>
            <ChakraTbody>
              {numericData.map((row) => (
                <ChakraTr key={row.item}>
                  <ChakraTd>{row.item}</ChakraTd>
                  <ChakraTd isNumeric>{row.quantity.toLocaleString()}</ChakraTd>
                  <ChakraTd isNumeric>¥{row.price.toLocaleString()}</ChakraTd>
                  <ChakraTd isNumeric>¥{row.total.toLocaleString()}</ChakraTd>
                </ChakraTr>
              ))}
            </ChakraTbody>
          </ChakraTable>
        }
        newVersion={
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>商品</Th>
                <Th isNumeric>数量</Th>
                <Th isNumeric>単価</Th>
                <Th isNumeric>合計</Th>
              </Tr>
            </Thead>
            <Tbody>
              {numericData.map((row) => (
                <Tr key={row.item}>
                  <Td>{row.item}</Td>
                  <Td isNumeric>{row.quantity.toLocaleString()}</Td>
                  <Td isNumeric>¥{row.price.toLocaleString()}</Td>
                  <Td isNumeric>¥{row.total.toLocaleString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        }
      />

      <CompareSection
        title="Table - striped + size=sm"
        chakraVersion={
          <ChakraTable variant="striped" size="sm">
            <ChakraThead>
              <ChakraTr>
                <ChakraTh>名前</ChakraTh>
                <ChakraTh>メール</ChakraTh>
                <ChakraTh>役割</ChakraTh>
              </ChakraTr>
            </ChakraThead>
            <ChakraTbody>
              {sampleData.map((row) => (
                <ChakraTr key={row.id}>
                  <ChakraTd>{row.name}</ChakraTd>
                  <ChakraTd>{row.email}</ChakraTd>
                  <ChakraTd>{row.role}</ChakraTd>
                </ChakraTr>
              ))}
            </ChakraTbody>
          </ChakraTable>
        }
        newVersion={
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>名前</Th>
                <Th>メール</Th>
                <Th>役割</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sampleData.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.name}</Td>
                  <Td>{row.email}</Td>
                  <Td>{row.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        }
      />
    </ChakraBox>
  );
};

export default TableComparePage;
