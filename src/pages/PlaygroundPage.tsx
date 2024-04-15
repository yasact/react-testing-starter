import OrderStatusSelector from "../components/OrderStatusSelector";

const PlaygroundPage = () => {
  return (
    <div>
      <OrderStatusSelector onChange={console.log} />
    </div>
  );
};

export default PlaygroundPage;
