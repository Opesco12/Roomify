import { Header } from "react-native-elements";

const AppHeader = ({
  backgroundColor,
  leftComponent,
  centerComponent,
  ...props
}) => {
  return (
    <Header
      backgroundColor={backgroundColor}
      leftComponent={leftComponent}
      centerComponent={centerComponent}
      {...props}
    />
  );
};

export default AppHeader;
