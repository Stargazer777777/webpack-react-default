export default function Profile({ title }: { title: string }) {
  return (
    <>
      <div
        style={{ backgroundColor: 'skyblue', width: '200px', height: '200px' }}
      >
        {title}
      </div>
    </>
  );
}
