import { motion } from "framer-motion";
import styled from "styled-components";

const Loader = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: ${(props) => props.theme.bgColor.green};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.span`
  font-size: ${(props) => props.theme.fontSize.large}; ;
`;

const Circle = styled(motion.div)`
  height: 50px;
  background-color: ${(props) => props.theme.bgColor.red};
  width: 50px;
  border-radius: 2% 50%;
`;

const Loading = () => {
  return (
    <Loader>
      <>
        <Text>Loading....</Text>
        <br />
        <br />
        <br />
        <Circle
          animate={{
            rotate: 360,
            borderRadius: ["50% 50%", "2% 50%"],
            x: 75,
          }}
          initial={{
            x: -75,
          }}
          transition={{
            flip: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        ></Circle>
      </>
    </Loader>
  );
};

export default Loading;
