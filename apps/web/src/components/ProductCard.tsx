import { Card, CardContent, CardFooter } from "./ui/card";

const ProductCard = () => {
  return (
    <>
      <Card className="w-full rounded-sm gap-0 p-0">
        <CardContent className=" bg-purple-900 aspect-square">
          <div className="bg-purple-400 ">Product image</div>
        </CardContent>
        <CardFooter className="flex-col gap-2 justify-between p-2 rounded-none min-h-[84px] ">
          <p className="w-full line-clamp-2">Lorem ipsum, dolo</p>
          <p className="w-full font-semibold">Rp 2.500.000</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
