import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid grid-cols-2 gap-8 p-4 md:flex md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 ">
              <ShoppingBag />
              <div className="text-sm font-bold ">Free Shipping</div>
            </div>

            <div className="text-sm text-muted-foreground ">
              Free Shipping on orders above Rp2.000.000
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 ">
              <WalletCards />
              <div className="text-sm font-bold ">Flexible Payment</div>
            </div>

            <div className="text-sm text-muted-foreground ">
              Free Shipping on orders above Rp2.000.000
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 ">
              <Headset />
              <div className="text-sm font-bold ">24/7 Support</div>
            </div>

            <div className="text-sm text-muted-foreground ">
              Get support at any time
            </div>
          </div>

          <div className="space-y-2 ">
            <div className="flex items-center gap-2 ">
              <DollarSign />
              <div className="text-sm font-bold">Best Deals</div>
            </div>

            <div className="text-sm text-muted-foreground">
              Find top offers every day
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
