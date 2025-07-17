import MainCard from "@/components/main-card";
import PizzaClassic from "@/components/pizza-classic";
import PizzaDelight from "@/components/pizza-delight";
import PizzaDiamond from "@/components/pizza-diamond";
import PizzaPlatinum from "@/components/pizza-platinum";
import PizzaStart from "@/components/pizza-start";

export default function Home(){
  return (
    <div>
         <MainCard/>
         <PizzaStart/>
         <PizzaDelight/>
         <PizzaClassic/>
         <PizzaDiamond/>
         <PizzaPlatinum/>
    </div>
  )
}