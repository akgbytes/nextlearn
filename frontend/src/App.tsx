import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function App() {
  return (
    <>
      <div className="flex items-center justify-center gap-8 max-w-2xl p-6">
        <div>
          {" "}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure
          voluptate, repellat corrupti nihil quia, doloremque aperiam nesciunt
          praesentium in tempora perferendis, dolorem consequuntur optio ad
          quasi deleniti cum fuga. Ipsam, earum. Exercitationem illo possimus
          commodi temporibus, placeat quos voluptas assumenda eligendi dolore in
          doloremque modi, dolor quaerat. Deserunt nobis itaque quam qui
          voluptas repudiandae, optio similique voluptatum consequuntur illo
          nulla modi quod totam aliquid atque ad vitae, alias debitis
          exercitationem at accusamus quasi est. Minus nostrum, alias, sapiente
          et at assumenda labore vero fuga in tempore voluptate quo cupiditate
          sed recusandae officiis quam voluptatibus dolores. Illum eos, corrupti
          quidem consequatur voluptas consectetur hic soluta, iusto nihil
          mollitia sequi dolorum sed, modi inventore explicabo quam quia?
          Repellendus, natus, possimus harum, eligendi voluptatem at minima
          alias veniam reiciendis commodi obcaecati quasi. Explicabo deserunt
          error incidunt nobis voluptatibus. Eligendi possimus exercitationem
          enim voluptas aspernatur accusamus labore nulla. Quo, nostrum ab.
          Fugiat nulla earum, hic ullam provident ab assumenda iure sapiente
          expedita, beatae porro soluta laboriosam quidem ratione aut nisi,
          repudiandae fuga veritatis totam deleniti veniam voluptate. Inventore
          blanditiis aperiam impedit sequi iure consectetur incidunt ratione
          modi? Quas dolor fuga nobis quisquam dolorem? Aspernatur debitis rerum
          perferendis quaerat quam ab doloribus minima in cum.
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={() => toast("Hello there")}>Start Now</Button>
          <Button variant={"destructive"}>Logout</Button>
          <Button variant={"ghost"}>Login</Button>
          <Button variant={"secondary"}>Pay Now</Button>
          <Button variant={"outline"}>Get Started</Button>
          <Button variant={"link"}>Mark as completed</Button>
        </div>

        <div>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}

export default App;
