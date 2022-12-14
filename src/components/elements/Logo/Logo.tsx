import { Text, useColorModeValue} from '@chakra-ui/react';

const Logo = () => {
  const logoColor = useColorModeValue('black', 'white');
  return <Text as='b' fontSize={'3xl'} color={logoColor}> HELIOPOLIS</Text>;
};

export default Logo;
