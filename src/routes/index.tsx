import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/home";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  return (
    <Shell>
      <Home />
    </Shell>
  );
}
