import { ROUTES } from "@/lib/routesEnum";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(ROUTES.PROJECTS);
}
