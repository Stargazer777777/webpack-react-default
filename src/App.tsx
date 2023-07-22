import { useState } from 'react';
import React from 'react';

function App() {
  return (
    <div>
      <MyButton
        onPress={function (...args) {
          console.log(args);
        }}
      >
        this is a button
      </MyButton>
    </div>
  );
}

function MyButton({
  children,
  onPress,
}: {
  children?: string;
  onPress?: (
    msg: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  const [index, setIndex] = useState(0);
  return (
    <>
      <button
        onClick={async (e) => {
          setIndex(index + 1);
          console.log(index);

          // onPress && onPress('hello', e);
        }}
      >
        {children}
        {index}
      </button>
    </>
  );
}

export default App;
