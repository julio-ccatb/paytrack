import CreateProjectForm from "@/app/_components/forms/project/createProject";
import ProjectTable from "@/app/_components/tables/projectsTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/cardenza";
import { api } from "@/trpc/server";
import { CirclePlus } from "lucide-react";
import { withRoles } from "../../_components/auth/withRoles";

const ProjectsPage = async () => {
  const projects = await api.project.list({});
  return (
    <Card>
      <CardHeader className="grid grid-cols-2 flex-col px-7">
        <div className="space-y-2">
          <CardTitle>Projects</CardTitle>
          <CardDescription>All Projects.</CardDescription>
        </div>

        <Credenza>
          <CredenzaTrigger className="flex items-end justify-end" asChild>
            <Button className="w-fit gap-1 justify-self-end text-sm">
              Create
              <CirclePlus />
            </Button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>Projects</CredenzaTitle>
              <CredenzaDescription>Create new Project.</CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody>
              <CreateProjectForm />
            </CredenzaBody>
          </CredenzaContent>
        </Credenza>
      </CardHeader>
      <CardContent>
        <ProjectTable data={projects} />
      </CardContent>
    </Card>
  );
};

export default withRoles(ProjectsPage, ["admin"]);
