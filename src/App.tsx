function App() {
  return (
    <div>
      <MyButton
        onPress={(msg: string) => {
          alert(msg);
        }}
      >
        this is a button
      </MyButton>
    </div>
  );
}

class Cla1 {}

function MyButton({
  children,
  onPress,
}: {
  children?: string;
  onPress?: (msg: string) => void;
}) {
  function handleClick() {
    if (onPress) {
      onPress('haha');
    }
  }
  return (
    <>
      <button onClick={handleClick}>{children}</button>
    </>
  );
}

export default App;
